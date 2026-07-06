# CLAUDE.md

Sitio personal de Cristian Baeza Torres — antropólogo físico y científico de datos. Publicado en **crisbaezatorres.cl** vía GitHub Pages. Todo el contenido está en **español**.

## Comandos

```bash
npm install        # dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # build de producción en ./dist/
npm run preview    # previsualizar el build
```

No hay tests ni linter configurados. El deploy es automático: push a `master` → GitHub Actions (`.github/workflows/deploy.yml`) construye y publica en Pages. `dist/` y `.astro/` son artefactos de build ignorados por git.

## Arquitectura

Astro 4 + Tailwind CSS 3, sitio estático multipágina sin framework de UI.

- `src/layouts/Layout.astro` — layout único: `<head>` (SEO/OG), nav desktop + menú móvil, footer. Los links de navegación se definen en el array `navLinks` de este archivo.
- `src/pages/*.astro` — una página por sección (index, about, proyectos, publications, repositorios, docencia, contacto, blog). Blog no está en el nav (contenido pendiente).
- `src/pages/proyectos/<slug>.astro` — páginas de detalle de proyectos.
- `src/data/proyectos.ts` — única fuente de datos estructurados: alimenta la grilla de `/proyectos` y los "recientes" del home. Los campos `color` y `emoji` son legacy y no se usan.
- `src/content/` — colecciones vacías reservadas para futura migración a Content Collections; hoy el contenido de blog/publicaciones está hardcodeado en las páginas.
- `public/` — assets estáticos (foto, CNAME, favicon). `assets/` en la raíz es legacy de Jekyll y no se usa.
- Usar `const base = import.meta.env.BASE_URL` para links internos: `href={`${base}proyectos`}`.

## Sistema de diseño — "estratigrafía digital"

**Leer `docs/documento-diseno.md` antes de tocar UI.** Reglas no negociables:

- **Paleta** (tokens en `tailwind.config.mjs`): fondos `bone-*`, texto `ink`/`ink-light`, acentos **solo** `clay` (primario) y `moss` (estados). Nada de colores Tailwind genéricos ni pasteles.
- **Tipografía**: títulos en serif (`font-serif`, Fraunces); cuerpo en `font-sans` (Inter); todo lo técnico-auxiliar (nav, tags, fechas, estados, botones, kickers) en `font-mono` (JetBrains Mono) xs uppercase con tracking.
- **Prohibido**: emojis como íconos, sombras (`shadow-*`), `rounded-full`, gradientes (excepto la línea de "estrato" de 3px `from-clay via-clay-light to-moss` sobre fondos tinta).
- **Patrones recurrentes**: encabezado de página = kicker `§ Sección` + H1 serif + bajada + borde inferior; grillas tipo tabla con `gap-px bg-bone-300 border border-bone-300` y celdas `bg-bone-50`; estados como `[ EN CURSO ]`; números de catálogo `01`, `02`; transición única `transition-colors duration-200`.

## Contenido

Para agregar contenido, seguir las guías paso a paso (incluyen plantillas de código):

- Proyectos → `docs/guias-contenido/proyectos.md`
- Publicaciones → `docs/guias-contenido/publicaciones.md`
- Blog → `docs/guias-contenido/blog.md`
- Repositorios → `docs/guias-contenido/repositorios.md`
- Docencia → `docs/guias-contenido/docencia.md`

Pendientes y roadmap de desarrollo: `docs/revision-sugerencias-desarrollo.md`.

## Precauciones

- `astro.config.mjs` → `site` debe coincidir con el dominio real del CNAME (`https://crisbaezatorres.cl`); afecta sitemap y canónicas.
- Los enlaces externos llevan `target="_blank" rel="noopener noreferrer"`.
- No introducir enlaces a páginas que aún no existen (el blog tuvo ese problema); enlace real o ningún enlace.
- Email público único en todo el sitio: `crisbaezatorres@gmail.com` (decisión de julio 2026; no reintroducir los institucionales en páginas).
