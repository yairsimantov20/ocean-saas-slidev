# Ocean SaaS operator: R&D bi-weekly talk (Slidev)

Ten minutes: a title slide, seven talk slides, a questions slide, and a thanks slide. Built on Port's Slidev theme
(`themes/port`, from `port-labs/port-slidev-presentation-skill`) with a few deck-specific components.

## Run it

```bash
npm install
npm run dev        # opens http://localhost:3030 (presenter view: /presenter, notes included)
```

Other commands:

```bash
npm run build      # static site in dist/
npm run export     # one PNG per slide in preview-export/ (needs: npx playwright install chromium); settled state
npm run export:pdf # PDF
```

No multi-click slides: one click (or arrow key) per slide. Each slide's content animates in on its own
when you land on it (staggered fade-ins, growing bars, numbers counting up, the hop diagram drawing in) and
replays every time you come back. `prefers-reduced-motion` turns the motion off. The logic lives in
`themes/port/composables/useSlideIn.ts` and the `stage` layout.

Everything works offline: DM Sans and Fira Code are bundled through `@fontsource`, and the charts and
the architecture diagram are plain Vue/SVG (no CDN, no Mermaid).

## Files

| Path | What |
|------|------|
| `slides.md` | The deck. Speaker notes are the `<!-- -->` block under each slide |
| `global-top.vue` | Static frame: kicker header and slide counter, outside the slide transition. Add `footer: false` to a slide to hide the counter |
| `themes/port/` | Port theme, plus the deck components (see `themes/port/README.md`) |
| `public/memes/` | Meme and GIF drop zone |
| `preview/` | Exported PNG per slide and `contact-sheet.png` |
| `scripts/contact-sheet.py` | Rebuilds the contact sheet: `python3 scripts/contact-sheet.py preview-export preview/contact-sheet.png` |

## Memes and GIFs

Each meme spot is a `<MemeSlot name="slide-N" caption="..." />`. Drop a file at
`public/memes/slide-N.gif` (or `.webp`, `.png`, `.jpg`) and it replaces the dashed placeholder.
No file = placeholder with the meme idea and the exact path. See `public/memes/README.md` for the list.

## Change the colors

All deck colors are CSS variables at the bottom of `themes/port/styles/index.css`:

```css
:root {
  --argo: #f97316;  /* "before" (Argo CD) */
  --op:   #10b981;  /* "after" (operator), also the accent */
  --warn: #ef4444;  /* incident */
}
```

Each has `-soft` (backgrounds) and `-ink` (text on soft backgrounds) variants next to it. Change them
and every chart, card, chip and the diagram follows.
