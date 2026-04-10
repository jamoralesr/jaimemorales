# jaimemorales.cl — Especificaciones de Desarrollo

**Versión:** 1.0  
**Fecha:** 2026-04-10  
**Autor:** Dumbo (Jaime Morales) + Sancho (Claude)  
**Estado:** Listo para desarrollo

---

## 1. Visión del proyecto

Blog personal de Jaime Morales. Destino editorial para reflexión, filosofía y opinión sobre el impacto de la IA en la dimensión humana. No tiene modelo de negocio — es el lugar donde Dumbo piensa en voz alta.

**Referente conceptual:** Daniel Miessler — publicación sin barreras, voz directa, sin agenda comercial.

**Relación con Scriptorium:** jaimemorales.cl es la salida editorial filosófica del pipeline Scriptorium. El contenido llega a través de la Fase 4 (Cocina con Sancho), se produce en markdown, y se publica vía commit al repositorio. El commit es el checkpoint editorial humano intencional — no hay publicación automática.

**Relación con conjuros.dev:** Las mismas temáticas pueden bifurcarse en ambos destinos. jaimemorales.cl recibe la dimensión filosófica/humana; conjuros.dev recibe la dimensión técnica/artesanal. Son voces distintas, no duplicados.

---

## 2. Stack tecnológico

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | **Astro 6.x** (6.1 actual) | Pensado para contenido, cero JS por defecto, MDX nativo, colecciones tipadas |
| Contenido | **MDX** | Markdown con componentes para bloques especiales (quote, code, callout) |
| Estilos | **CSS vanilla + custom properties** | Sin framework CSS — el diseño es simple y deliberado |
| Deploy | **Netlify** | CI/CD automático desde GitHub, preview deployments, free tier suficiente |
| Repo | **GitHub** | Trigger de deploy vía push — el commit es el acto de publicar |
| Tipografías | **Google Fonts** (self-hosted via `@astrojs/fonts` o descarga manual) | Playfair Display, Newsreader, IBM Plex Mono |
| RSS | **@astrojs/rss** | Feed nativo, integración directa con Scriptorium |

**No incluye:** base de datos, autenticación, CMS, framework CSS, JavaScript de UI.

---

## 3. Estructura de páginas

### 3.1 Mapa de rutas

```
/                    → Homepage — listado de posts recientes
/notas/[slug]        → Detalle de post individual
/experimentos        → Listado de experimentos con narrativa propia
/sobre-mi            → Página sobre Jaime
/rss.xml             → Feed RSS para lectores y Scriptorium
```

### 3.2 Navegación global

```
Jaime Morales [acento terracota]    notas · experimentos · sobre mí
```

- "Jaime Morales" siempre en IBM Plex Mono, color acento, linkea a `/`
- Nav items en Newsreader itálica, color `dark`
- El item activo usa color `heading` (navy)
- Separador terracota de 2px debajo del header en todas las páginas

---

## 4. Design Tokens

### 4.1 Paleta de colores

```css
:root {
  --color-background:  #edece8;  /* Fondo crema cálido */
  --color-border:      #e3cdbe;  /* Separadores, borders */
  --color-muted:       #7d7b7c;  /* Texto muy secundario */
  --color-body:        #5E5954;  /* Texto de cuerpo, excerpts */
  --color-meta:        #4a4540;  /* Fechas, tags, labels mono */
  --color-dark:        #284c5f;  /* Nav links, links secundarios */
  --color-heading:     #1a3846;  /* Títulos, nav activo */
  --color-accent:      #c4632d;  /* Nombre del sitio, línea decorativa, único color vivo */

  /* Superficies internas */
  --color-quote-bg:    #e3cdbe;  /* Fondo blockquote */
  --color-code-bg:     #1a2e3a;  /* Fondo bloques de código */
  --color-code-bar:    #152530;  /* Barra superior del código */
  --color-code-text:   #e4ddd0;  /* Texto primario en código */
  --color-code-dim:    #8ab5c4;  /* Strings, valores en código */
  --color-code-comment:#4a7a8a;  /* Comentarios en código */
}
```

### 4.2 Tipografía

```css
:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Newsreader', Georgia, serif;
  --font-mono:    'IBM Plex Mono', 'Courier New', monospace;
}
```

#### Escala tipográfica

| Token | Familia | Tamaño | Peso | Uso |
|---|---|---|---|---|
| `--text-h1` | Playfair Display | 48px | 400 | Título de post en detalle |
| `--text-h2` | Playfair Display | 36px | 400 | Título de post en detalle (alternativo) |
| `--text-h3` | Playfair Display | 24px | 400 | Subtítulo dentro de post |
| `--text-lead` | Newsreader | 18px | 400 | Bajada/lead, italic |
| `--text-body` | Newsreader | 16px | 400 | Cuerpo del post |
| `--text-excerpt` | Newsreader | 15px | 400 | Excerpt en listado |
| `--text-bio` | Newsreader | 17px | 400 | Texto bio, italic |
| `--text-list-title` | Playfair Display | 22px | 400 | Título en listado |
| `--text-code` | IBM Plex Mono | 12px | 400 | Bloques de código |
| `--text-meta` | IBM Plex Mono | 11px | 400 | Fechas, reading time, labels |
| `--text-caption` | IBM Plex Mono | 10px | 400 | Captions, letter-spacing: 0.1em |
| `--text-nav` | IBM Plex Mono | 13px | 400 | Nombre del sitio, letter-spacing: 0.15em |

#### Line heights recomendados

```css
--leading-tight:   1.25;  /* Títulos grandes */
--leading-snug:    1.4;   /* Títulos medianos */
--leading-normal:  1.7;   /* Excerpts, listas */
--leading-relaxed: 1.85;  /* Cuerpo de post */
```

### 4.3 Espaciado

```css
--space-xs:   8px;
--space-sm:   16px;
--space-md:   24px;
--space-lg:   32px;
--space-xl:   48px;
--space-2xl:  64px;
--space-3xl:  96px;
```

### 4.4 Layout

```css
--content-width:     704px;  /* Ancho máximo del contenido */
--page-padding-x:    48px;   /* Padding horizontal en desktop */
--page-padding-x-sm: 24px;   /* Padding horizontal en mobile */
--border-radius-sm:  2px;    /* Blockquote */
--border-radius-md:  4px;    /* Badges */
--border-radius-lg:  6px;    /* Bloques de código */
```

---

## 5. Componentes

### 5.1 Layout base (`BaseLayout.astro`)

```
<html>
  <head> → meta, fonts, CSS global
  <body style="background: var(--color-background)">
    <Header />        → nombre + nav
    <div class="accent-bar" />  → línea terracota 2px
    <slot />          → contenido de la página
    <Footer />        → minimal, sin contenido
  </body>
</html>
```

### 5.2 Header (`Header.astro`)

- Layout: flex, space-between, align-items center
- Padding: `var(--space-lg) var(--space-xl)`
- Left: `<a href="/">Jaime Morales</a>` — IBM Plex Mono, 13px, letter-spacing 0.15em, color accent
- Right: nav con links — Newsreader italic, 14px, color dark
- Nav item activo: color heading

### 5.3 PostCard (`PostCard.astro`)

Usado en homepage. Props: `title`, `slug`, `date`, `readingTime`, `excerpt`

```
[fecha] · [readingTime]   ← IBM Plex Mono 11px, meta
[título]                  ← Playfair Display 22px, heading
[excerpt]                 ← Newsreader 15px, body
```

- Padding: `var(--space-lg) var(--space-xl)`
- Separado por `<hr class="divider">` (1px, color border)
- Sin cards, sin sombras — solo tipografía y espacio

### 5.4 PostBody (`PostBody.astro` o estilos globales en `prose.css`)

Estilos para el contenido markdown del post. Aplicar a `.prose`:

```css
.prose h2       → Playfair Display, 24px, heading, margin-top 2.5rem
.prose p        → Newsreader, 16px, body, line-height 1.85, margin-bottom 1.5rem
.prose blockquote → fondo quote-bg, padding 1.25rem 1.5rem, border-radius 2px, Playfair italic 18px
.prose pre      → ver CodeBlock
.prose strong   → color heading
.prose a        → color dark, underline on hover
```

### 5.5 CodeBlock

Componente MDX para bloques de código.

```
┌─────────────────────────────────────────┐ ← bg: code-bar, border-radius top
│ ● ● ●                        typescript │ ← dots terracota/ámbar/verde + label mono
├─────────────────────────────────────────┤
│ interface PromptContract {              │ ← bg: code-bg, font mono 12px
│   voz: 'reflexiva' | 'directa'         │    line-height 1.6
│ }                                       │
└─────────────────────────────────────────┘ ← border-radius bottom
```

Props: `lang` (string, default: "text")

### 5.6 PostMeta (`PostMeta.astro`)

Fecha + tiempo de lectura. Usado en listado y en detalle.

```
09 ABR 2026  ·  4 min
```

- IBM Plex Mono, 11px, letter-spacing 0.05em, color meta
- Fecha formateada: `DD MMM YYYY` en español

### 5.7 ExperimentCard (`ExperimentCard.astro`)

Props: `name`, `status`, `description`, `tags[]`

Status badges:
- `en producción` → bg `#d4ede0`, text `#2a6645`
- `en desarrollo` → bg `#faebd7`, text `#8b4a0f`
- `en exploración` → bg `#e8e4f0`, text `#4a3a7a`
- `con clientes` → bg `#d4ede0`, text `#2a6645`

Tags en IBM Plex Mono 10px, color muted, separados por ` · `

### 5.8 Divider

```html
<hr class="divider" />
```
```css
.divider { border: none; border-top: 1px solid var(--color-border); margin: 0; }
.divider--accent { border-top: 2px solid var(--color-accent); }
```

---

## 6. Páginas en detalle

### 6.1 Homepage `/`

```
<BaseLayout>
  <section class="bio">
    [párrafo de presentación — itálica, muted]
  </section>
  <hr class="divider">
  <main>
    {posts.map(post => <PostCard {...post} />)}
  </main>
  <footer class="page-footer">
    — más entradas —          RSS
  </footer>
</BaseLayout>
```

Paginación: en primera versión, mostrar los últimos 20 posts. Agregar paginación cuando el volumen lo justifique.

### 6.2 Detalle de post `/notas/[slug]`

```
<BaseLayout>
  <article>
    <nav class="back">← todas las entradas</nav>
    <PostMeta date={} readingTime={} />
    <h1>[título]</h1>
    <p class="lead">[lead/bajada]</p>
    <hr class="divider">
    <div class="prose">
      <Content />  ← MDX compilado
    </div>
  </article>
  <nav class="post-nav">
    ← entrada anterior     siguiente entrada →
  </nav>
</BaseLayout>
```

### 6.3 Experimentos `/experimentos`

```
<BaseLayout>
  <header>
    <h1>Experimentos</h1>
    <p class="lead">[bajada descriptiva]</p>
  </header>
  <hr class="divider">
  {experiments.map(exp => <ExperimentCard {...exp} />)}
  <footer class="page-footer">
    ← notas        sobre mí →
  </footer>
</BaseLayout>
```

Los experimentos se definen en un archivo de datos estáticos `/src/data/experiments.ts`, no en markdown.

```typescript
export const experiments = [
  {
    name: 'Scriptorium',
    status: 'en producción',
    description: 'Un sistema que lee el mundo por mí mientras duermo...',
    tags: ['TypeScript', 'Claude API', 'RSS'],
    url: null,  // interno, sin enlace externo aún
  },
  {
    name: 'WorkspaceLM',
    status: 'en desarrollo',
    description: 'Búsqueda semántica sobre el corpus de conocimiento de una organización...',
    tags: ['Laravel', 'pgvector', 'RAG'],
    url: null,
  },
  {
    name: 'MagicDesk',
    status: 'en exploración',
    description: 'Un escritorio que entiende en qué estás trabajando...',
    tags: ['Claude Code', 'MCP'],
    url: null,
  },
  {
    name: 'Mente a Bordo',
    status: 'con clientes',
    description: 'Una IA que vive adentro de la organización, no afuera...',
    tags: ['Laravel', 'Claude API', 'centripetal AI'],
    url: null,
  },
  {
    name: 'DinoAI',
    status: 'en producción',
    description: '19 agentes Ollama desplegados para RENFE...',
    tags: ['Ollama', 'multi-agent', 'Laravel'],
    url: null,
  },
]
```

### 6.4 Sobre mí `/sobre-mi`

Página estática en `sobre-mi.astro`. Sin frontmatter — contenido hardcodeado en el componente.

Secciones:
1. Hero: foto + nombre + rol + frase corta
2. Bio larga (2 párrafos)
3. "Fuera del código": Fotografía / Motorsport / Jazz y sci-fi
4. Contacto: email · conjuros.dev · GitHub

---

## 7. Modelo de contenido (posts)

### Frontmatter

```yaml
---
title: 'El prompt como contrato'
date: 2026-04-09
readingTime: 4          # minutos, calculado manualmente o con plugin
excerpt: 'Descripción de una o dos oraciones para el listado.'
tags: ['IA', 'prompts', 'TypeScript']
draft: false
---
```

### Colección Astro (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content'

const notas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    readingTime: z.number().optional(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { notas }
```

### Directorio de contenido

```
src/
  content/
    notas/
      2026-04-09-el-prompt-como-contrato.mdx
      2026-04-07-la-transicion-no-es-un-evento.mdx
      ...
```

Convención de nombre de archivo: `YYYY-MM-DD-slug-del-post.mdx`

---

## 8. Pipeline Scriptorium → Blog

El flujo editorial completo:

```
Scriptorium genera output/YYYY-MM-DD.md (informe diario)
        ↓
Dumbo selecciona un ángulo, lo trae a Sancho (claude.ai)
        ↓
Sancho redacta el artículo en markdown con frontmatter
        ↓
Dumbo revisa, ajusta voz si es necesario
        ↓
Crea src/content/notas/YYYY-MM-DD-slug.mdx en el repo
        ↓
git push → Netlify build automático → publicado
        ↓
Artefacto publicado entra a mempalace
```

**Regla:** No hay publicación automática. El push al repo es el acto editorial consciente.

---

## 9. Estructura del proyecto Astro

```
jaimemorales.cl/
├── public/
│   ├── fonts/              ← Playfair Display, Newsreader, IBM Plex Mono (self-hosted)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── PostCard.astro
│   │   ├── PostMeta.astro
│   │   ├── ExperimentCard.astro
│   │   └── CodeBlock.astro
│   ├── content/
│   │   ├── config.ts
│   │   └── notas/
│   │       └── *.mdx
│   ├── data/
│   │   └── experiments.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── notas/
│   │   │   └── [slug].astro
│   │   ├── experimentos.astro
│   │   ├── sobre-mi.astro
│   │   └── rss.xml.ts
│   └── styles/
│       ├── global.css      ← tokens, reset, body
│       └── prose.css       ← estilos del cuerpo del post
├── astro.config.mjs
├── package.json
└── netlify.toml
```

---

## 10. Configuración Astro (`astro.config.mjs`)

```javascript
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import rss from '@astrojs/rss'

export default defineConfig({
  site: 'https://jaimemorales.cl',
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: 'prism',  // o 'shiki' con tema custom
  },
})
```

---

## 11. Netlify

### `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[[redirects]]
  from = "/feed"
  to = "/rss.xml"
  status = 301
```

### Netlify CLI — flujo de trabajo

Netlify tiene CLI oficial. Instalación global:

```bash
npm install -g netlify-cli
```

**Comandos relevantes para este proyecto:**

| Comando | Cuándo usarlo |
|---|---|
| `netlify login` | Primera vez — abre browser para autenticar |
| `netlify init` | Conectar el repo GitHub al sitio Netlify (configura CD automático) |
| `netlify link` | Si el repo ya existe y se quiere vincular a un sitio existente |
| `netlify dev` | Dev server local con entorno Netlify (lee variables, funciones edge, etc.) |
| `netlify build` | Simular el build de producción localmente antes de hacer push |
| `netlify build --dry` | Ver qué haría el build sin ejecutarlo |
| `netlify deploy` | Deploy manual a URL draft (sin afectar producción) |
| `netlify deploy --prod` | Deploy manual directo a producción |
| `netlify env:set KEY value` | Setear variable de entorno en Netlify |
| `netlify env:list` | Ver todas las variables del sitio |

**Flujo recomendado para primera puesta en producción:**

```bash
# 1. Instalar CLI y autenticar
npm install -g netlify-cli
netlify login

# 2. Dentro del proyecto, conectar con GitHub para CD automático
netlify init

# 3. Verificar build local antes del primer deploy
netlify build

# 4. Deploy a draft para verificar
netlify deploy

# 5. Si todo está bien, promover a producción
netlify deploy --prod
```

A partir de `netlify init`, cada `git push` a `main` triggerará un deploy automático — el flujo normal de trabajo. El CLI solo se necesita para setup inicial, builds locales y deploys manuales de emergencia.

---

## 12. RSS Feed (`src/pages/rss.xml.ts`)

```typescript
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const notas = await getCollection('notas', ({ data }) => !data.draft)
  return rss({
    title: 'Jaime Morales',
    description: 'Notas sobre IA, tecnología y humanidad.',
    site: context.site,
    items: notas
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map(post => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.excerpt,
        link: `/notas/${post.slug}/`,
      })),
  })
}
```

---

## 13. Decisiones de diseño importantes

1. **Sin framework CSS** — los tokens son suficientes. Añadir Tailwind sería sobredimensionado para un blog sin componentes interactivos.

2. **Sin JavaScript de UI** — Astro genera HTML estático. No hay React, Vue ni Svelte. El único JS posible sería para analytics (si se decide usar).

3. **Tipografías self-hosted** — evitar dependencia de Google Fonts en runtime. Descargar los archivos `.woff2` y servirlos desde `/public/fonts/`.

4. **MDX sobre MD** — permite incorporar `<CodeBlock>` con la barra de dots y resaltado de sintaxis como componente, no como bloque markdown genérico.

5. **Paginación diferida** — no implementar en v1. Con 5-7 posts semanales, en 3 meses habrá ~80 posts. Implementar paginación cuando supere 30-40.

6. **Sin comentarios** — no en v1. Si en el futuro se decide, evaluar giscus (GitHub Discussions) como única opción compatible con la filosofía del proyecto.

7. **Sin analytics en v1** — o bien Fathom/Plausible con script mínimo. No Google Analytics.

---

## 14. Plan de desarrollo sugerido para Claude Code

### Fase 1 — Scaffolding y tokens (sesión 1)
- `npm create astro@latest` (instala Astro 6.x automáticamente con `astro@latest`)
- Configurar integraciones (mdx, sitemap)
- Crear `global.css` con todos los tokens del diseño
- Crear `prose.css` para el cuerpo del post
- Crear `BaseLayout.astro` con Header y línea acento
- Self-host tipografías

### Fase 2 — Homepage (sesión 1-2)
- Crear colección `notas` con schema
- Crear 2-3 posts de prueba en MDX
- Implementar `PostCard.astro` y `PostMeta.astro`
- Implementar `index.astro` con listado

### Fase 3 — Detalle del post (sesión 2)
- Implementar `[slug].astro`
- Implementar `prose.css` completo
- Implementar `CodeBlock.astro`
- Navegación anterior/siguiente

### Fase 4 — Páginas secundarias (sesión 3)
- `experimentos.astro` + `ExperimentCard.astro`
- `sobre-mi.astro` con contenido real
- RSS feed

### Fase 5 — Deploy (sesión 3)
- Crear repo en GitHub y hacer push
- `netlify login` + `netlify init` para conectar repo y configurar CD
- `netlify build` para verificar el build localmente
- `netlify deploy` para draft, `netlify deploy --prod` para producción
- Configurar dominio jaimemorales.cl desde Netlify UI
- Verificar RSS feed en `/rss.xml`

---

---

## 15. Referencia visual — Pencil

Los mockups viven en el archivo activo de Pencil (`/docs/jaimemorales.pen`), accesible via MCP. Claude Code puede inspeccionarlos directamente con `pencil:get_screenshot` o `pencil:batch_get`.

| Frame | Descripción |  |
|---|---|---|
| Homepage | Listado de posts |  |
| Post detail | Artículo individual con code block |  |
| Experimentos | Listado de proyectos con badges |  |
| Sobre mí | Bio + intereses + contacto |  |
| Design System | Colores + tipografía + componentes + escala |  |
| Paleta | Swatches con hex y rol |  |
