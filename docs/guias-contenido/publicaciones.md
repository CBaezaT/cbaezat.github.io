# Guía: agregar una publicación

Las publicaciones usan **Content Collections**: cada publicación es un archivo Markdown en `src/content/publications/`. La página `/publications` se genera sola, ordenada por año descendente — no hay que tocar ningún `.astro`.

- Esquema de frontmatter: `src/content/config.ts` (colección `publications`).
- Página: `src/pages/publications.astro`.

## Paso 1 — Crear el archivo

Crea `src/content/publications/mi-slug.md` (slug en minúsculas, con guiones, sin tildes; solo identifica el archivo, no genera URL propia):

```markdown
---
title: Título del artículo
year: 2026
description: Resumen breve en 1-2 oraciones — pregunta de investigación y hallazgo principal.
cita: "Baeza-Torres, C., & Coautor, A. (2026). Título del artículo. Revista, 12(3), 45–67."
url: https://doi.org/10.xxxx/xxxxx
urlLabel: DOI
---
```

Campos (validados en build):

| Campo | Tipo | Notas |
|-------|------|-------|
| `title` | texto | obligatorio |
| `year` | número | obligatorio; ordena la lista y se muestra al margen en clay |
| `description` | texto | obligatorio |
| `cita` | texto | opcional pero recomendado: cita APA completa, se muestra en mono. Entre comillas si contiene `:` |
| `url` | URL | opcional — **solo si el enlace existe de verdad**; si no hay DOI/PDF aún, omítelo (no se renderiza botón) |
| `urlLabel` | texto | opcional, default `DOI`; alternativas: `PDF`, `Preprint`, `Ver en revista` |

El cuerpo del Markdown se ignora por ahora (la página solo usa el frontmatter); déjalo vacío.

## Convenciones

- **Cita académica completa** en formato APA: para un perfil académico es más creíble que solo el título.
- **Nunca enlaces vacíos**: el campo `url` opcional reemplaza al viejo "Leer más" con `href="#"`. Agrégalo cuando el recurso exista.
- **Tipos de publicación**: si se acumulan artículos, ponencias y capítulos, se puede agregar un campo `tipo` al esquema en `config.ts` y agrupar en la página — proponlo cuando haya volumen.

## Paso 2 — Verificar

```bash
npm run dev
```

Revisa `/publications`: orden por año descendente, cita legible en móvil, y el botón de enlace solo si definiste `url` (debe abrir en pestaña nueva).
