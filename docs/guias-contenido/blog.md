# Guía: publicar un post en el blog

El blog tiene dos partes:

1. **`src/pages/blog.astro`** — el índice (URL `/blog`). Lista manual de posts.
2. **`src/pages/blog/<slug>.astro`** — la página del post (hay que crearla; hoy los enlaces del índice apuntan a páginas que no existen — ver revisión de desarrollo).

> **Estado actual:** el blog **no está en el menú de navegación** y sus dos entradas no tienen página de destino. Antes de promocionarlo, publica al menos un post completo con este flujo y luego agrega `{ href: 'blog', label: 'Blog' }` a `navLinks` en `src/layouts/Layout.astro`.

> **Nota:** existe `src/content/blog/` (vacío) para una futura migración a Content Collections, que permitirá escribir posts en Markdown puro. Mientras tanto, el flujo es el descrito aquí.

## Paso 1 — Crear la página del post

Crea `src/pages/blog/mi-slug.astro` (el nombre define la URL: `/blog/mi-slug`). Slug en minúsculas, con guiones, sin tildes.

```astro
---
import Layout from '../../layouts/Layout.astro';
const base = import.meta.env.BASE_URL;
---

<Layout
  title="Título del Post - Cristian Baeza Torres"
  description="Resumen del post en una oración (se usa en buscadores y al compartir)."
>
  <article class="max-w-3xl mx-auto space-y-8">
    <!-- Header del post -->
    <div class="space-y-3 border-b border-bone-300 pb-6">
      <a href={`${base}blog`} class="font-mono text-xs uppercase tracking-widest text-ink-light hover:text-clay inline-flex items-center gap-2 transition-colors duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        Volver al blog
      </a>
      <p class="font-mono text-xs uppercase tracking-widest text-clay">§ Bitácora</p>
      <h1 class="font-serif text-4xl font-semibold text-ink leading-tight">Título del Post</h1>
      <p class="font-mono text-xs text-ink-light uppercase tracking-wide">5 de Julio, 2026 · 6 min de lectura</p>
    </div>

    <!-- Cuerpo -->
    <div class="space-y-5 text-ink-light leading-relaxed">
      <p>Párrafo de apertura…</p>

      <h2 class="font-serif text-2xl font-semibold text-ink pt-4">Subtítulo de sección</h2>
      <p>…</p>

      <!-- Cita / destacado -->
      <blockquote class="border-l-2 border-clay bg-bone-100 p-6 text-ink">
        Idea clave o cita destacada.
      </blockquote>

      <!-- Código -->
      <pre class="bg-ink text-bone-200 p-6 overflow-x-auto font-mono text-sm"><code>import pandas as pd</code></pre>

      <!-- Figura -->
      <figure class="space-y-2">
        <img src="/images/blog/mi-slug-fig01.png" alt="Descripción de la figura" class="border border-bone-300 w-full" />
        <figcaption class="font-mono text-xs text-ink-light">fig. 01 — Descripción breve</figcaption>
      </figure>
    </div>
  </article>
</Layout>
```

Las imágenes del post van en `public/images/blog/` (crear la carpeta si no existe), nombradas `<slug>-fig01.png`.

## Paso 2 — Agregar la entrada al índice

En `src/pages/blog.astro`, dentro del `<div class="divide-y …">`, agrega **al inicio** (más reciente primero):

```astro
<article class="py-8 flex gap-6">
  <span class="font-mono text-sm text-clay shrink-0 pt-1">2026</span>
  <div class="space-y-2">
    <h2 class="font-serif text-xl font-semibold text-ink">
      <a href={`${base}blog/mi-slug`} class="hover:text-clay transition-colors duration-200">
        Título del Post
      </a>
    </h2>
    <p class="font-mono text-xs text-ink-light uppercase tracking-wide">5 de Julio, 2026</p>
    <p class="text-ink-light leading-relaxed">
      Resumen de 1-2 oraciones que invite a leer.
    </p>
  </div>
</article>
```

## Convenciones editoriales

- **Temas**: cruces entre antropología y datos, métodos, docencia, reflexiones sobre investigación — el blog es "bitácora de campo", tono personal pero riguroso.
- **Título**: concreto y específico; evita clickbait.
- **Extensión**: 600-1500 palabras. Más largo → considera dividir en serie.
- **Fechas**: formato `D de Mes, AAAA` consistente con el resto del sitio.
- **Estilo**: sin emojis, código en bloques `pre`, figuras con pie en mono (ver [documento-diseno.md](../documento-diseno.md)).

## Paso 3 — Verificar

```bash
npm run dev
```

Revisa `/blog` (entrada nueva arriba, enlace funciona), la página del post en desktop y móvil, y que las imágenes carguen.
