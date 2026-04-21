# Plan: Página /libro — Mente a Bordo

## Context

Jaime quiere publicar su libro "Mente a Bordo" en el blog como una sección propia. La idea es:
- Agregar "libro" al menú de navegación principal
- Crear `/libro` como una página de lectura completa del libro
- Seguir la estructura visual del HTML de referencia (`mente-a-bordo.html`) pero usando el sistema de diseño del blog (que casualmente comparte los mismos tokens de color, tipografía y espaciado)

El HTML de referencia ya usa exactamente los mismos valores del blog (`#edece8`, `#c4632d`, `#1a3846`, Playfair Display, Newsreader, IBM Plex Mono), así que la traducción es directa.

---

## Archivos a modificar / crear

| Archivo | Acción |
|--------|--------|
| `src/components/Header.astro` | Agregar item al array `navItems` |
| `src/pages/libro.astro` | Crear (nuevo) |

---

## Cambio 1: Header.astro — agregar nav item

**Archivo:** `src/components/Header.astro` línea 8–12

```js
const navItems = [
  { label: 'notas', href: '/' },
  { label: 'experimentos', href: '/experimentos' },
  { label: 'sobre mí', href: '/sobre-mi' },
  { label: 'libro', href: '/libro' },   // ← agregar
];
```

---

## Cambio 2: src/pages/libro.astro — nueva página

Estructura de la página (en orden):

### A. Portada / Hero
- Label en mono uppercase: `"Mente a Bordo"` como título grande con Playfair Display + italic
- Subtítulo: `"Infraestructura cognitiva con IA / para individuos y empresas"`
- Tagline mono pequeño: `"Primera edición · Circulación cercana · Abril 2026"`
- Línea decorativa horizontal en `--color-accent`
- Autor + lugar (como en el HTML)

### B. Índice / Tabla de contenidos
- Título "En este libro" o "Contenido" (h2 con estilo del blog)
- Lista de anchor links:
  - [Prólogo](#prologo)
  - [Capítulo 1: Tu IA no tiene memoria…](#cap1)
  - [Capítulo 2: Tu IA genera más de lo que integras…](#cap2)  
  - [Capítulo 3: Tu empresa es más reemplazable…](#cap3)
  - [Epílogo](#epilogo)

### C. Secciones del libro (Prólogo + 3 caps + Epílogo)

Cada sección sigue el patrón del HTML de referencia:
- **Label de sección** en `--color-accent`, font-mono, uppercase (ej: "Apertura", "Capítulo 1")
- **H1 del capítulo** en Playfair Display
- **Subtítulo en italic** (cuando aplica)
- Contenido en clase `.prose` (ya definida en `prose.css`, soporta h2, h3, blockquotes, code, listas)
- `<hr>` separador entre secciones (estilizado con `--color-border`)
- Anclas `id` en cada sección para el ToC

### D. Estilos scoped de la página

Reusar completamente el sistema de tokens existente. Estilos adicionales mínimos para:
- `.libro-portada` — layout del hero
- `.capitulo-label` — etiqueta de sección (accent color, mono, uppercase, small)
- `.libro-toc` — contenedor del índice
- Separadores decorativos entre capítulos (similar al HR del HTML, centrado 40% de ancho)
- `scroll-margin-top` en secciones para compensar header sticky (si aplica)

No inventar nuevos tokens — usar solo variables ya definidas en `global.css`.

---

## Patrón de implementación

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import '../styles/prose.css';
---

<BaseLayout
  title="Mente a Bordo — Jaime Morales"
  description="Infraestructura cognitiva con IA para individuos y empresas. Primera edición."
>
  <main id="main" class="page libro">
    <!-- portada -->
    <section class="libro-portada"> ... </section>

    <!-- índice -->
    <nav class="libro-toc"> ... </nav>

    <hr class="libro-sep" />

    <!-- prólogo -->
    <section id="prologo">
      <span class="capitulo-label">Apertura</span>
      <h1>...</h1>
      <div class="prose"> ... </div>
    </section>

    <hr class="libro-sep" />

    <!-- cap1, cap2, cap3, epílogo siguiendo el mismo patrón -->
  </main>
</BaseLayout>

<style>
  /* tokens del blog — sin inventar nada nuevo */
</style>
```

---

## Contenido

El contenido viene del archivo `/Users/dumbo/Projects/Libro Mente Abordo/mente-a-bordo-libro.md`. 
El ingeniero debe leer ese archivo completo y transcribir/convertir el markdown a HTML dentro de la página Astro, sección por sección, preservando:
- Todos los encabezados (## → h2, ### → h3 dentro de `.prose`)
- Blockquotes
- Listas ul/ol
- Código inline
- Énfasis y negritas
- Links externos

---

## Verificación

1. `npm run dev` (o `bun run dev`) y navegar a `http://localhost:4321`
2. Confirmar que "libro" aparece en el menú de navegación con estilo correcto (activo en `/libro`)
3. Navegar a `/libro` — verificar portada, índice, y que los anchor links del ToC llevan a cada sección
4. Verificar que `.prose` aplica correctamente (tipografía, blockquotes, code, listas)
5. Revisar en mobile (640px) que la portada y el índice no se rompen
6. `npm run build` sin errores de tipo o compilación
