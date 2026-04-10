# Plan de desarrollo — jaimemorales.cl

## Contexto

El directorio `/Users/dumbo/Sites/jaimemorales/` contiene únicamente `docs/SPECS.md` (v1.0, 2026-04-10) y `docs/jaimemorales.pen` (mockups Pencil). No hay proyecto Astro, ni repo git, ni `package.json`. SPECS.md es el blueprint autoritativo: define stack (Astro 6.x + MDX + CSS vanilla + Netlify), design tokens completos, componentes, estructura de rutas y plan de fases en §14.

Este plan traduce §14 de SPECS.md a una ruta ejecutable con **git inicializado desde el primer paso** y **un commit atómico al cierre de cada fase**, de modo que cada hito quede como checkpoint revertible y el historial cuente la construcción del sitio en pasos legibles. El repo se conecta a GitHub antes de la fase de deploy para habilitar el CD de Netlify (SPECS §11).

**Fuente de verdad:** `docs/SPECS.md` — cada fase referencia sus secciones relevantes en lugar de duplicar contenido.

---

## Fase 0 — Inicialización de git y scaffolding base

**Objetivo:** dejar el directorio como repo git válido con Astro instalado y primer commit hecho, antes de tocar diseño.

1. `git init` en `/Users/dumbo/Sites/jaimemorales/` — branch inicial `main`.
2. Mover `docs/` fuera del scaffolding de Astro (se conservará en la raíz — Astro no toca `docs/`).
3. `npm create astro@latest .` — template "Empty", TypeScript strict, sin integraciones iniciales.
   - Responder "Yes" a continuar sobre directorio no vacío (docs/ existe).
4. Instalar integraciones: `npx astro add mdx sitemap`.
5. Verificar `.gitignore` generado por Astro (debe incluir `node_modules`, `dist`, `.astro`, `.env*`).
6. `npm run build` en seco para validar el scaffolding.

**Commit de cierre:**
```
chore: scaffold Astro 6 project with mdx and sitemap

- npm create astro@latest (empty template, strict TS)
- @astrojs/mdx + @astrojs/sitemap
- preserves docs/ (SPECS.md + pencil mockups)
```

**Criterio de éxito:** `git log --oneline` muestra 1 commit, `npm run dev` levanta la plantilla Astro por defecto.

---

## Fase 1 — Design tokens y layout base

**Referencia SPECS:** §4 (tokens), §5.1 (BaseLayout), §5.2 (Header), §5.8 (Divider), §9 (estructura), §13.3 (fonts self-hosted).

1. Crear estructura `src/styles/`:
   - `global.css` con **todos** los tokens de SPECS §4.1–§4.4 (colores, fuentes, escala, espaciado, layout, radius) + reset minimal + estilos `body`.
   - `prose.css` vacío por ahora (se llena en Fase 3).
2. Self-host de tipografías en `public/fonts/`: Playfair Display, Newsreader, IBM Plex Mono (subsets latin, formato woff2). Declarar `@font-face` en `global.css`.
3. `src/layouts/BaseLayout.astro` — props `title`, `description`; incluye `<head>` con meta, link a `global.css`, slot para contenido, `<Header/>`, barra acento 2px, `<Footer/>` minimal.
4. `src/components/Header.astro` — nombre "Jaime Morales" (IBM Plex Mono, color accent) + nav (`notas · experimentos · sobre mí`) con item activo en color heading. Usar `Astro.url.pathname` para detectar activo.
5. `src/pages/index.astro` placeholder que usa `BaseLayout` y muestra "Hola" — solo para verificar que tokens y layout renderizan.
6. `npm run dev` → inspeccionar visualmente fondo crema, barra terracota, header con tipografías correctas.

**Commit de cierre:**
```
feat(design): add design tokens, fonts and BaseLayout

- global.css with full token system (colors, type scale, spacing)
- self-hosted Playfair Display, Newsreader, IBM Plex Mono
- BaseLayout + Header + accent bar per SPECS §4–§5
```

**Criterio de éxito:** homepage renderiza con paleta correcta de SPECS §4.1 y tipografías locales cargan sin llamadas externas.

---

## Fase 2 — Colección de notas + Homepage

**Referencia SPECS:** §5.3 (PostCard), §5.6 (PostMeta), §6.1 (Homepage), §7 (modelo contenido).

1. `src/content/config.ts` — definir colección `notas` con schema zod de SPECS §7 (title, date, readingTime opcional, excerpt, tags opcional, draft default false).
2. Crear 3 posts de prueba en `src/content/notas/` respetando convención `YYYY-MM-DD-slug.mdx`:
   - `2026-04-09-el-prompt-como-contrato.mdx`
   - `2026-04-07-la-transicion-no-es-un-evento.mdx`
   - un tercero breve para validar listado.
   Contenido placeholder de 2–3 párrafos por post con frontmatter completo.
3. `src/components/PostMeta.astro` — formato `DD MMM YYYY · N min` en español, IBM Plex Mono 11px, color meta.
4. `src/components/PostCard.astro` — recibe `title`, `slug`, `date`, `readingTime`, `excerpt`; layout de SPECS §5.3.
5. Reescribir `src/pages/index.astro` con:
   - `<section class="bio">` (párrafo italic muted — placeholder, el texto real lo define Dumbo después).
   - `.divider`
   - Loop sobre `getCollection('notas', ({data}) => !data.draft)` ordenado por fecha desc, limitado a 20, renderizando `<PostCard>`.
   - Footer `— más entradas —` / `RSS` (link a `/rss.xml` aunque aún no exista).
6. Verificar orden por fecha, tipografía, separadores.

**Commit de cierre:**
```
feat(home): add notas collection and homepage listing

- content collection schema for notas (title, date, excerpt, tags, draft)
- 3 placeholder posts in src/content/notas/
- PostCard + PostMeta per SPECS §5.3, §5.6
- homepage with bio section and post listing per SPECS §6.1
```

**Criterio de éxito:** `/` lista los 3 posts ordenados por fecha, con meta formateada en español.

---

## Fase 3 — Detalle de post (`/notas/[slug]`) y prose.css

**Referencia SPECS:** §5.4 (PostBody/prose), §5.5 (CodeBlock), §6.2 (Detalle), §13.4 (MDX sobre MD).

1. Completar `src/styles/prose.css` con estilos de SPECS §5.4 para `.prose h2/h3/p/blockquote/pre/strong/a` — importar desde BaseLayout o desde la página de detalle.
2. `src/components/CodeBlock.astro` — barra superior con dots terracota/ámbar/verde + label de lenguaje (prop `lang`), cuerpo con bg code-bg, mono 12px. Estilos de SPECS §5.5.
3. Configurar `astro.config.mjs` con `markdown.shikiConfig` — tema custom derivado de la paleta code-* de SPECS §4.1 (background `#1a2e3a`, foreground `#e4ddd0`, strings/values `#8ab5c4`, comments `#4a7a8a`). Esto cambia deliberadamente SPECS §10 (que menciona prism) — decisión confirmada con Dumbo. Asegurar que los `<pre>` del MDX reciben el estilo visual de `CodeBlock` (o wrappear con `<CodeBlock>` explícitamente en los MDX).
4. `src/pages/notas/[...slug].astro`:
   - `getStaticPaths` desde `getCollection('notas', filtro no-draft)`.
   - Renderizar: back link, `<PostMeta>`, `<h1>`, `<p class="lead">` (excerpt), divider, `<Content/>` dentro de `<div class="prose">`.
   - Navegación anterior/siguiente — ordenar colección por fecha y calcular índice actual.
5. Agregar un bloque de código real en uno de los posts de prueba para validar `CodeBlock`.

**Commit de cierre:**
```
feat(post): add post detail route, prose styles and CodeBlock

- [...slug].astro with prev/next navigation
- prose.css for markdown body per SPECS §5.4
- CodeBlock.astro with terminal-style header per SPECS §5.5
- shiki syntax highlighting configured
```

**Criterio de éxito:** cada post abre en `/notas/<slug>`, tipografía prose correcta, blockquote con fondo cuero, bloques de código con barra superior, navegación prev/next funcional.

---

## Fase 4 — Páginas secundarias y RSS

**Referencia SPECS:** §5.7 (ExperimentCard), §6.3 (Experimentos), §6.4 (Sobre mí), §12 (RSS).

1. `src/data/experiments.ts` — copiar tal cual el array de SPECS §6.3 (5 experimentos).
2. `src/components/ExperimentCard.astro` — props `name`, `status`, `description`, `tags[]`, `url`. Status badges con los 4 colores de SPECS §5.7, tags en mono 10px separados por ` · `.
3. `src/pages/experimentos.astro` — header con `<h1>` + lead, divider, loop de `<ExperimentCard>`, footer con prev/next a `notas` / `sobre mí`.
4. `src/pages/sobre-mi.astro` — estructura de SPECS §6.4 (hero, bio, "Fuera del código", contacto). Dejar los textos como placeholders claramente marcados (`{/* TODO: texto real */}`) para que Dumbo los rellene.
5. `src/pages/rss.xml.ts` — implementación de SPECS §12 tal cual, filtrando drafts, ordenando por fecha desc.
6. Verificar que `/rss.xml` devuelve XML válido.

**Commit de cierre:**
```
feat(pages): add experimentos, sobre-mi and RSS feed

- experiments data + ExperimentCard per SPECS §5.7, §6.3
- sobre-mi static page per SPECS §6.4 (bio placeholders)
- /rss.xml.ts feed per SPECS §12
```

**Criterio de éxito:** las 4 rutas del mapa de SPECS §3.1 funcionan (`/`, `/notas/[slug]`, `/experimentos`, `/sobre-mi`, `/rss.xml`).

---

## Fase 5 — GitHub, Netlify y producción

**Referencia SPECS:** §11 (Netlify), §13 (decisiones).

1. Crear `netlify.toml` exactamente como SPECS §11 (build command, publish dir, NODE_VERSION 22, redirect `/feed` → `/rss.xml`).
2. `npm run build` local — validar que no hay errores y el `dist/` se genera completo.
3. Crear repo en GitHub: `gh repo create jaimemorales.cl --public --source=. --remote=origin --description "Blog personal de Jaime Morales"`.
4. `git push -u origin main`.
5. `netlify login` (interactivo, una sola vez).
6. `netlify init` — vincular el repo GitHub, seleccionar "Create & configure a new site", aceptar comandos detectados.
7. `netlify build` local para simular el build de producción antes del deploy.
8. `netlify deploy` → verificar draft URL.
9. Si todo OK, `netlify deploy --prod`.
10. Configurar dominio `jaimemorales.cl` desde la UI de Netlify (DNS fuera del alcance de este plan — Dumbo lo gestiona aparte).
11. Verificar `/rss.xml` en producción y que el feed valida contra un lector (p. ej. NetNewsWire).

**Commit de cierre (antes del push inicial):**
```
chore: add netlify.toml for deploy

- build config, NODE_VERSION 22
- /feed → /rss.xml redirect
```

**Criterio de éxito:** `https://<site>.netlify.app/` sirve la homepage, los posts renderizan, el feed RSS es válido, y futuros `git push origin main` disparan deploys automáticos.

---

## Archivos críticos a crear/modificar

| Path | Fase | Propósito |
|---|---|---|
| `astro.config.mjs` | 0, 3 | Integraciones + shiki |
| `src/styles/global.css` | 1 | Tokens de diseño |
| `src/styles/prose.css` | 3 | Estilos del cuerpo del post |
| `public/fonts/*.woff2` | 1 | Tipografías self-hosted |
| `src/layouts/BaseLayout.astro` | 1 | Layout raíz |
| `src/components/Header.astro` | 1 | Nav global |
| `src/components/PostCard.astro` | 2 | Item del listado |
| `src/components/PostMeta.astro` | 2 | Fecha + reading time |
| `src/components/CodeBlock.astro` | 3 | Bloque de código con barra |
| `src/components/ExperimentCard.astro` | 4 | Card de experimento con status |
| `src/content/config.ts` | 2 | Schema de la colección |
| `src/content/notas/*.mdx` | 2 | Posts |
| `src/data/experiments.ts` | 4 | Datos estáticos |
| `src/pages/index.astro` | 1, 2 | Homepage |
| `src/pages/notas/[...slug].astro` | 3 | Detalle de post |
| `src/pages/experimentos.astro` | 4 | Listado de experimentos |
| `src/pages/sobre-mi.astro` | 4 | Bio |
| `src/pages/rss.xml.ts` | 4 | Feed RSS |
| `netlify.toml` | 5 | Config de deploy |

---

## Verificación end-to-end

Al final de Fase 5, validar en orden:

1. **Local build limpio:** `rm -rf dist && npm run build` completa sin warnings de contenido.
2. **Rutas:** visitar `/`, cada `/notas/<slug>`, `/experimentos`, `/sobre-mi`, `/rss.xml` en el preview de Netlify.
3. **Mockups vs. renderizado:** abrir `docs/jaimemorales.pen` vía MCP (`pencil:get_screenshot`) y comparar homepage/detalle/experimentos/sobre-mi lado a lado con las páginas renderizadas — cualquier desvío de color, tipografía o espaciado se corrige antes del `--prod`.
4. **RSS:** `curl https://<site>.netlify.app/rss.xml | xmllint --noout -` debe pasar sin errores.
5. **CD:** hacer un cambio trivial (typo en un post), `git push`, y confirmar que Netlify dispara un build nuevo automáticamente.
6. **Git log:** `git log --oneline` debe mostrar exactamente 6 commits (uno por fase), cada uno buildeable en isolation — `git checkout <sha> && npm install && npm run build` funciona en cualquier punto.

---

## Decisiones confirmadas

| Decisión | Valor |
|---|---|
| Repo GitHub | `jaimemorales.cl` (público) |
| Syntax highlighter | Shiki con tema custom derivado de la paleta code-* de SPECS §4.1 — anula SPECS §10 |
| Commits | Conventional commits (`feat:`, `chore:`, `docs:`) |
| Branch principal | `main` |
