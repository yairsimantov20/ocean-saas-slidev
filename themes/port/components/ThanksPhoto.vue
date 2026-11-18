<script setup>
import { computed } from 'vue'
import { useSlideIn } from '../composables/useSlideIn'
const { on, live } = useSlideIn()

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
})

const base = import.meta.env.BASE_URL || '/'
const resolvedSrc = computed(() =>
  props.src.startsWith('/') ? `${base}${props.src.slice(1)}` : props.src,
)
</script>

<template>
  <figure class="thanks" :class="{ on, live }">
    <div class="frame">
      <img :src="resolvedSrc" :alt="alt" />
    </div>
  </figure>
</template>

<style scoped>
.thanks {
  margin: 0;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.frame {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  width: auto;
  aspect-ratio: 3 / 4.25;
  max-width: min(26rem, 54%);
  background: #fff;
  border-radius: 18px;
  padding: 0.55rem 0.55rem 1.45rem;
  box-shadow:
    0 1px 2px rgba(17, 24, 39, 0.06),
    0 18px 40px rgba(17, 24, 39, 0.12);
  transform: rotate(-2.4deg);
  transform-origin: 50% 60%;
}
.frame img {
  display: block;
  flex: 1;
  min-height: 0;
  width: 100%;
  object-fit: cover;
  object-position: 50% 22%;
  border-radius: 10px;
}
.live:not(.on) .frame {
  opacity: 0;
  transform: rotate(-6deg) translateY(18px);
}
.live.on .frame {
  opacity: 1;
  transform: rotate(-2.4deg);
  transition: opacity 0.7s cubic-bezier(.2,.8,.2,1) 0.12s,
              transform 0.8s cubic-bezier(.2,.8,.2,1) 0.12s;
}
@media (prefers-reduced-motion: reduce) {
  .frame { opacity: 1 !important; transform: rotate(-2.4deg) !important; transition: none !important; }
}
</style>