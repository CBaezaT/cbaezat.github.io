# Guía: publicar un post en el blog

El blog usa **Content Collections** de Astro: cada post es un archivo Markdown en `src/content/blog/`. El índice (`/blog`) y la página de cada post se generan automáticamente — no hay que tocar ningún `.astro`.

- Esquema de frontmatter: `src/content/config.ts` (colección `blog`).
- Índice: `src/pages/blog.astro` (ordena por fecha, más reciente primero).
- Página de detalle: `src/pages/blog/[...slug].astro` (estilos de Markdown incluidos).

> **Estado actual:** el blog **no está en el menú de navegación**. Cuando haya al menos un post con contenido real, agrega `{ href: 'blog', label: 'Blog' }` a `navLinks` en `src/layouts/Layout.astro`.

## Paso 1 — Crear el archivo Markdown

Crea `src/content/blog/mi-slug.md` (el nombre define la URL: `/blog/mi-slug`). Slug en minúsculas, con guiones, sin tildes.

```markdown
---
title: Título del Post
date: 2026-07-05
description: Resumen en una oración (aparece en el índice, buscadores y al compartir).
---

Párrafo de apertura…

## Subtítulo de sección

Texto normal con [enlaces](https://ejemplo.com) y `código inline`.

> Cita o idea destacada (se estiliza con borde clay automáticamente).

- Listas
- con viñetas

```python
# bloques de código con highlighting (tema github-dark)
import pandas as pd
```

![Descripción de la figura](/images/blog/mi-slug-fig01.png)
```

Reglas del frontmatter (validado en build — un error de formato rompe el build con mensaje claro):

| Campo | Tipo | Notas |
|-------|------|-------|
| `title` | texto | obligatorio |
| `date` | `AAAA-MM-DD` | obligatorio; ordena el índice |
| `description` | texto | obligatorio; 1-2 oraciones |
| `draft` | `true`/`false` | opcional; `true` lo oculta del sitio |

## Comportamiento clave: posts sin cuerpo

Si el archivo solo tiene frontmatter (sin cuerpo), el post aparece en el índice **como texto sin enlace** y no se genera página de detalle. Así se puede anunciar un título sin crear links rotos. Al escribirle cuerpo, el enlace y la página aparecen solos.

## Imágenes

Van en `public/images/blog/` (crear la carpeta la primera vez), nombradas `<slug>-fig01.png`. En el Markdown se referencian como `/images/blog/<slug>-fig01.png`.

## Convenciones editoriales

- **Temas**: cruces entre antropología y datos, métodos, docencia, reflexiones de investigación — tono personal pero riguroso ("bitácora de campo").
- **Extensión**: 600-1500 palabras; más largo → serie.
- **Estilo**: sin emojis; figuras en escala de grises/sepia si es posible (ver [documento-diseno.md](../documento-diseno.md)).
- Para un borrador en progreso, usa `draft: true` en vez de dejar el archivo fuera del repo.

## Paso 2 — Verificar

```bash
npm run dev
```

Revisa `/blog` (entrada nueva arriba, con enlace) y `/blog/mi-slug` (títulos serif, código con highlighting, imágenes cargando) en desktop y móvil.
