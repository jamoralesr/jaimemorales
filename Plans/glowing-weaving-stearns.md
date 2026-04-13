# Plan — aplicar los 21 hallazgos del informe de diseño

## Context

El informe previo identificó 21 hallazgos en el diseño actual de jaimemorales.cl, agrupados en alta/media/baja severidad. Este plan los aterriza a cambios concretos en archivos específicos. Todos los hallazgos se aplican excepto los que el usuario decidió posponer (ver "Out of scope").

Decisiones tomadas con el usuario:
- **#5 "más entradas"**: dejar como está (no se toca).
- **#6 dark mode**: incluir en este pase.
- **#20 dot del code block**: mantener terracota (no se toca).

El objetivo es cerrar los gaps de a11y, tipografía, OG y responsive sin alterar la identidad editorial cálida — los tokens y la estructura del sitio se respetan.

---

## Bloque A — Tipografía (raíz de varios bugs visuales)

### A1. Importar peso 600 de Newsreader (#3)
- **Archivo**: `src/styles/global.css:6-7`
- **Cambio**: añadir `@import '@fontsource/newsreader/600.css';` junto a los imports existentes.
- **Verificar**: `package.json` ya tiene `@fontsource/newsreader` instalado; no requiere `bun add`.
- **Por qué**: `prose.css:40-43` pide `font-weight: 600` para `strong`; sin el peso real el navegador sintetiza bold borroso.

---

## Bloque B — Accesibilidad (alto impacto, esfuerzo bajo)

### B1. Estilos `:focus-visible` globales (#1)
- **Archivo**: `src/styles/global.css` (añadir bloque después del reset de `a`).
- **Cambio**: regla global `a:focus-visible` con outline visible (2px sólido `--color-accent`, offset 3px, border-radius `--border-radius-sm`). También `button:focus-visible` por si aparecen botones después.
- **Verificar manual**: tabular por home/post/sobre-mí en navegador y confirmar anillo visible.

### B2. `<h1>` semántico en home (#2)
- **Archivo**: `src/pages/index.astro:14`
- **Cambio**: añadir `<h1 class="sr-only">Notas</h1>` antes de la `<section class="bio">`. Definir `.sr-only` en `global.css` (clase utilitaria estándar de visibilidad para lectores de pantalla).
- **Decisión**: oculto visualmente — la home es minimalista por diseño y un h1 visible duplicaría el bio. La accesibilidad y SEO igual lo encuentran.

### B3. Skip-link al contenido (#17)
- **Archivo**: `src/layouts/BaseLayout.astro:30` (primer hijo de `<body>`).
- **Cambio**: `<a href="#main" class="skip-link">Saltar al contenido</a>`. Estilos en `global.css`: posicionado fuera de pantalla por defecto, visible al recibir focus. Añadir `id="main"` en cada `<main>` de las páginas (`index.astro:13`, `experimentos.astro:11`, `sobre-mi.astro:9`, `notas/[...slug].astro:28`).

### B4. Microcopy en post-nav (#16)
- **Archivo**: `src/pages/notas/[...slug].astro:46-57`
- **Cambio**: añadir "anterior" / "siguiente" como label adicional, manteniendo el título del post como subtexto. La estructura visual existente se preserva.

---

## Bloque C — Color y contraste (#13, #10)

### C1. Subir contraste de `--color-muted` para texto corrido (#13)
- **Archivo**: `src/styles/global.css:17`
- **Cambio**: `--color-muted` de `#7d7b7c` (≈3.8:1, falla AA) a un valor cercano a `#6a6766` (≈4.7:1, pasa AA). Verificar en el contexto donde se usa (`bio` en home, `lead` en experimentos/sobre-mí/post).
- **Verificar**: usar el contraste WebAIM contra `#edece8` antes de fijar el valor exacto.

### C2. Diferenciar `--color-quote-bg` de `--color-border` (#10)
- **Archivo**: `src/styles/global.css:25`
- **Cambio**: bajar la luminosidad del quote-bg medio tono (ej. `#dcc1ad` o equivalente) para que el blockquote destaque sin perder calidez.
- **Verificar**: ver renderizado de blockquote en una nota con cita.

---

## Bloque D — Meta tags sociales (#4)

### D1. Open Graph + Twitter Card en BaseLayout
- **Archivo**: `src/layouts/BaseLayout.astro:5-28`
- **Cambio**:
  - Extender `Props` con `image?: string` y `type?: 'website' | 'article'`.
  - Calcular `canonicalURL` desde `Astro.url` y `Astro.site`.
  - Añadir tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:image`, `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`.
  - Imagen default: `public/og-default.svg` (placeholder neutro con tipografía Playfair y la paleta del sitio — generar como SVG estático o decidir luego).
- **Archivo**: `astro.config.mjs` — confirmar que `site:` está definido (`https://jaimemorales.cl`); si no, agregarlo (necesario para `Astro.site`).
- **Archivo**: `src/pages/notas/[...slug].astro:27` — pasar `type="article"` al `BaseLayout`.

---

## Bloque E — Responsive y dark mode (#6, #7, #8)

### E1. Padding fluido (#7, #8)
- **Archivo**: `src/styles/global.css:68-69, 126-136`
- **Cambio**: reemplazar el sistema binario de padding por `clamp()`:
  - `--page-padding-x: clamp(20px, 5vw, 48px);`
  - Eliminar `--page-padding-x-sm` y la media query de `.page` (ya no necesaria).
- **Efecto**: 20px en pantallas pequeñas (#8 resuelto), padding fluido entre 640–1024 (#7 resuelto), 48px en desktop. Header (`Header.astro:37`) usa el mismo token, así que se ajusta solo.

### E2. Dark mode (#6)
- **Archivo**: `src/styles/global.css` — añadir bloque `@media (prefers-color-scheme: dark) { :root { ... } }` después de los tokens base.
- **Tokens dark**: paleta invertida pero conservando la calidez:
  - `--color-background`: `#1a1614` (no negro puro)
  - `--color-body`: `#d4cec5`
  - `--color-heading`: `#f0e8da`
  - `--color-meta`: `#bcb4a8`
  - `--color-muted`: `#928a7e`
  - `--color-border`: `#3a2e26`
  - `--color-accent`: mantener `#c4632d` o subir a `#d97a3f` para contraste
  - `--color-quote-bg`: `#2a221c`
  - `--color-dark`: ajustar para links visibles
- **Verificar**: Code blocks ya tienen su propio tema oscuro (`--color-code-bg`), no requieren cambios.
- **Imagen OG**: con tema fijo (claro) — no se ve en dark mode.
- **Foco**: revisar que `.accent-bar` y `.divider` se vean.

---

## Bloque F — Consistencia y pulido (#9, #11, #12, #15, #18, #19, #21)

### F1. Patrón único de hover (#9)
- **Archivos**: `global.css:107-109`, `Header.astro:50-51, 68-71`, `prose.css:55-58`, `experimentos.astro:73-75`, `notas/[...slug].astro:74-78, 116-119`
- **Patrón a aplicar**:
  - **Nav y links de UI** (header, post-nav, back, footer): sin underline en reposo, color cambia a `--color-accent` en hover, sin underline en hover.
  - **Links en prose**: underline persistente (`text-decoration-color: --color-border`), en hover sube a `--color-accent`.
  - **Default global** (`global.css:103-109`): sin underline en reposo, underline en hover — lo dejamos solo para links sueltos fuera de prose y nav.
- Documentar en un comentario al inicio de `global.css`.

### F2. Distinguir nav item activo (#11)
- **Archivo**: `src/components/Header.astro:65-67`
- **Cambio**: añadir `border-bottom: 1px solid var(--color-accent)` al `.nav-item.is-active` con `padding-bottom: 2px`. El cambio de color sigue, pero el subrayado lo hace inmediatamente legible.

### F3. Monogramas en lugar de círculo vacío en sobre-mí (#12)
- **Archivo**: `src/pages/sobre-mi.astro:13`
- **Cambio**: reemplazar `<div class="photo-placeholder">` por `<div class="photo-monogram">JM</div>` con CSS: mismo círculo de 140px, fondo `--color-border`, "JM" centrado en Playfair 56px color `--color-heading`. Mantener el TODO en comentario para reemplazar por foto real cuando exista.

### F4. Badges de Experimentos sin inline styles (#15)
- **Archivo**: `src/components/ExperimentCard.astro:10-15, 30-33, 70-77`
- **Cambio**: reemplazar el `statusStyles` JS y el `style={...}` por clases (`badge--produccion`, `badge--desarrollo`, `badge--exploracion`, `badge--clientes`). Mover los colores a variables CSS scoped en el bloque `<style>` o a tokens nuevos en `global.css` si se quieren reutilizar.
- **Beneficio**: permite CSP estricta (`style-src 'self'`) y dark mode automático para badges.

### F5. Lazy loading y visited en prose (#18, #19)
- **Archivo**: `src/pages/notas/[...slug].astro` — añadir un `<script>` mínimo en el componente que aplique `loading="lazy"` a `.prose img` post-render, **o** sobreescribir el componente `img` de MDX con un wrapper Astro que ya lleve `loading="lazy"` y `decoding="async"`.
- **Recomendado**: usar `mdx` components mapping en `astro.config.mjs` o en el render — investigar la API actual de Astro 5 al implementar.
- **Archivo**: `src/styles/prose.css:49-58` — añadir `.prose a:visited { color: var(--color-muted); }` o un tono más apagado del link normal.

### F6. CodeBlock vs prose pre — decidir un solo dueño (#11/#14)
- **Archivo**: `src/components/CodeBlock.astro` y `src/styles/prose.css:95-111`
- **Decisión**: dejar `prose.css` como dueño del estilo de los `<pre>` que vienen de markdown crudo (caso por defecto), y `CodeBlock.astro` como wrapper opcional cuando el autor quiere la traffic-light explícitamente. Documentar esto con un comentario en cabecera de ambos archivos. **No se requiere cambio de código** — sólo aclarar la convivencia.

### F7. Letter-spacing del site name (#21)
- **Acción**: **no cambiar** sin verificación visual. Documentar en este plan que está intencionalmente abierto. Validar en navegador durante la verificación; si se ve mal, ajustar a `0.08em`.

---

## Out of scope (por decisión del usuario o ya cubierto)

- **#5** "más entradas": se queda como está.
- **#20** dot terracota del code block: se queda.
- **Print styles**, **apple-touch-icon**, **manifest.webmanifest**: no estaban en los 21 hallazgos del informe; quedan para una pasada futura.

---

## Archivos que se modifican

```
src/styles/global.css            — A1, B1, B2, B3, C1, C2, E1, E2, F1
src/styles/prose.css             — F1, F5, F6
src/layouts/BaseLayout.astro     — B3, D1
src/components/Header.astro      — F1, F2
src/components/ExperimentCard.astro — F4
src/pages/index.astro            — B2, B3
src/pages/experimentos.astro     — B3, F1
src/pages/sobre-mi.astro         — B3, F3
src/pages/notas/[...slug].astro  — B3, B4, D1, F1, F5
astro.config.mjs                 — D1 (verificar site:)
public/og-default.(svg|png)      — D1 (crear si no existe)
```

Total: ~9 archivos editados, 1-2 archivos creados.

---

## Orden de ejecución sugerido

1. **A1** (peso 600) — desbloquea el render correcto del bold; trivial.
2. **C1, C2** (contraste y quote-bg) — un solo archivo, valores numéricos.
3. **B1, B2, B3, B4** (a11y) — bloque cohesivo.
4. **F1, F2** (hover y nav activo) — pulido visual cohesivo con B.
5. **E1** (padding fluido) — un cambio de token, efecto en todo el sitio.
6. **E2** (dark mode) — bloque autocontenido, fácil de verificar al final con DevTools.
7. **D1** (OG tags) — toca BaseLayout y posiblemente astro.config.
8. **F3** (monograma) — cambio aislado en sobre-mí.
9. **F4** (badges) — refactor pequeño en ExperimentCard.
10. **F5** (lazy + visited) — el menos crítico, cierra el pase.
11. **F6, F7** — sólo documentación y verificación visual.

---

## Verificación

**Build estático:**
```bash
bun run build
```
Sin errores TS/Astro. Inspeccionar `dist/index.html` para confirmar que las nuevas meta tags están y que no hay duplicados.

**Dev server:**
```bash
bun run dev
```

**Checklist manual en navegador (`http://localhost:4321`):**
- [ ] Tab desde la home: focus-visible visible en cada link (B1).
- [ ] Skip-link aparece al pulsar Tab desde el inicio del documento (B3).
- [ ] Inspector → ver `<h1>` en la home (B2).
- [ ] DevTools → emular `prefers-color-scheme: dark`: paleta cambia, todos los textos legibles, accent visible (E2).
- [ ] Resize entre 320 → 1280: padding fluido sin saltos (E1).
- [ ] Bold dentro de una nota: `strong` se ve nítido, no sintetizado (A1).
- [ ] Cita (`>` en MDX): blockquote se distingue de los hr (C2).
- [ ] Hover en nav: sin underline; hover en link de prose: cambia color y mantiene underline (F1).
- [ ] Item activo del nav tiene subrayado terracota (F2).
- [ ] `/sobre-mi`: monograma JM, no círculo vacío (F3).
- [ ] `/experimentos`: badges renderean igual que antes pero sin `style=` inline (F4).
- [ ] View source de `/notas/<slug>`: ver tags `og:*` y `twitter:*` (D1).
- [ ] `og:url` apunta a la URL correcta del post (D1).

**Lighthouse (opcional, recomendado):**
- A11y debería subir (focus, h1, skip-link, contraste).
- SEO debería subir (meta description ya existía, ahora OG completo).

**Contraste (manual):**
- Validar `--color-muted` final con [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/) antes de fijar.

---

## Notas

- No tocar archivos en `MEMORY/`, `Plans/`, `dist/`, `node_modules/`.
- No abrir PR ni commit hasta que Jaime apruebe el resultado visual.
- El sitio sigue local sin deploy (memoria del proyecto: no desplegar antes de tener contenido real). Este plan no cambia eso.
