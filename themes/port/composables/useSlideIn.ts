import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'

/**
 * Entrance state for a slide's content.
 * `on` flips false → true every time the slide becomes the active slide (so animations replay on
 * every visit) and back to false when you leave. In export/print, overview thumbnails and with
 * prefers-reduced-motion, `on` is true from the start and `live` is false (render the settled state).
 */
/** Pause (ms) after a slide becomes active before its entrance animations start. */
export const ENTER_DELAY_MS = 850
/** How long content keeps its settled state after leaving, so the page can fade it out instead of snapping. */
export const LEAVE_HOLD_MS = 900

export function useSlideIn(): { on: Ref<boolean>, live: Ref<boolean> } {
  const active = useIsSlideActive()
  const { $renderContext } = useSlideContext()
  const { isPrintMode } = useNav()
  const on = ref(false)
  const live = ref(true)
  let raf = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  const reduced = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const isStatic = () => isPrintMode.value || reduced() || !['slide', 'presenter'].includes($renderContext?.value as string)

  function sync(isActive: boolean) {
    cancelAnimationFrame(raf)
    clearTimeout(timer)
    if (isStatic()) {
      live.value = false
      on.value = true
      return
    }
    live.value = true
    if (isActive) {
      on.value = false
      // two frames so the "off" state is painted before we switch on (restarts transitions)
      timer = setTimeout(() => {
        raf = requestAnimationFrame(() => { raf = requestAnimationFrame(() => { on.value = true }) })
      }, ENTER_DELAY_MS)
    }
    else {
      // keep the settled state while the leaving page fades its content out
      timer = setTimeout(() => { on.value = false }, LEAVE_HOLD_MS)
    }
  }

  if (isStatic()) {
    live.value = false
    on.value = true
  }
  onMounted(() => sync(active.value))
  watch(active, sync)
  onBeforeUnmount(() => { cancelAnimationFrame(raf); clearTimeout(timer) })
  return { on, live }
}

/** Count every number inside `text` up from 0 while `on` turns true. Keeps separators and decimals. */
export function useCountUp(text: () => string, on: Ref<boolean>, live: Ref<boolean>, delay = 0.25, duration = 1.0) {
  const re = /\d[\d,]*(?:\.\d+)?/g
  const zero = (t: string) => t.replace(re, m => fmt(0, m))
  const display = ref(live.value ? zero(text()) : text())
  let raf = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  function fmt(v: number, src: string) {
    const dec = (src.split('.')[1] || '').length
    const s = v.toFixed(dec)
    if (!src.includes(',')) return s
    const [i, d] = s.split('.')
    return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (d ? `.${d}` : '')
  }

  function run() {
    const t = text()
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      const e = 1 - (1 - p) ** 3
      display.value = t.replace(re, m => fmt(Number(m.replace(/,/g, '')) * e, m))
      if (p < 1) raf = requestAnimationFrame(step)
      else display.value = t
    }
    raf = requestAnimationFrame(step)
  }

  watch([on, live], ([isOn, isLive]) => {
    cancelAnimationFrame(raf)
    clearTimeout(timer)
    if (!isLive) { display.value = text(); return }
    if (!isOn) { display.value = zero(text()); return }
    timer = setTimeout(run, delay * 1000)
  }, { immediate: true })
  onBeforeUnmount(() => { cancelAnimationFrame(raf); clearTimeout(timer) })
  return display
}
