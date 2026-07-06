# Revisión del repositorio y sugerencias de desarrollo

**Sitio:** crisbaezatorres.cl (GitHub Pages) · **Stack:** Astro 4 + Tailwind CSS 3 · **Fecha de revisión:** julio 2026

Este documento resume el estado actual del repositorio tras una revisión completa y propone mejoras de desarrollo priorizadas. No cubre diseño visual (ver [documento-diseno.md](documento-diseno.md)).

---

## 1. Estado general

El sitio está bien encaminado: la migración de Jekyll a Astro fue exitosa, el rediseño "estratigrafía digital" le dio identidad propia, el deploy con GitHub Actions funciona y el código es legible y consistente. Los problemas encontrados son de higiene del repositorio, contenido incompleto y arquitectura de contenido, no bugs graves.

### Arquitectura actual

```
src/
├── layouts/Layout.astro        # Layout único: head, nav, footer, menú móvil
├── data/proyectos.ts           # Proyectos como datos TypeScript
├── content/                    # Colecciones vacías (blog/, publications/) sin config.ts
└── pages/
    ├── index.astro             # Home: bio + 3 proyectos recientes
    ├── about, proyectos, publications, repositorios, docencia, contacto, blog
    └── proyectos/*.astro       # Páginas de detalle de proyecto
```

- **Proyectos**: datos centralizados en `src/data/proyectos.ts` (bien) + páginas de detalle manuales.
- **Publicaciones, blog, repositorios, docencia**: contenido *hardcodeado* dentro de cada `.astro`.
- **Deploy**: push a `master` → GitHub Actions construye y publica `dist/` en Pages.

---

## 2. Problemas encontrados (priorizados)

### Prioridad alta

| # | Problema | Detalle | Solución |
|---|----------|---------|----------|
| 1 | **`dist/` está versionado en git** | GitHub Actions construye el sitio en CI; el `dist/` local solo genera ruido en cada commit (17+ archivos que cambian con cada build) y riesgo de conflictos. | ✅ *Corregido: `dist/` y `.astro/` fuera del índice y en `.gitignore`.* |
| 2 | **Dominio inconsistente** | `public/CNAME` dice `crisbaezatorres.cl`, pero `astro.config.mjs` declara `site: 'https://cbaezat.github.io'`. El sitemap y las URLs canónicas apuntan al dominio equivocado (malo para SEO). | Cambiar `site` a `https://crisbaezatorres.cl`. ✅ *Corregido en esta revisión.* |
| 3 | **Links rotos** | `blog.astro` enlazaba a `blog/transcripcion-automatica` y `blog/tesis-post`, páginas que no existen (404). `publications.astro` tenía un "Leer más" con `href="#"`. | ✅ *Corregido: enlaces retirados hasta que exista el contenido (ver guías de contenido para recrearlos).* |
| 4 | **Favicon inexistente** | El layout referencia `/favicon.svg` pero el archivo no está en `public/` → 404 en cada visita y pestaña sin ícono. | ✅ *Corregido: se creó `public/favicon.svg` con monograma acorde al diseño.* |
| 5 | **Emails inconsistentes** | `contacto.astro` usaba `cbaeza@udec.cl`, `about.astro` usaba `cbaeza2016@udec.cl`, el README lista varios. | ✅ *Corregido: email público unificado a `crisbaezatorres@gmail.com` en todo el sitio.* |

### Prioridad media

| # | Problema | Detalle | Solución |
|---|----------|---------|----------|
| 6 | **`package-lock.json` ignorado en git** | El `.gitignore` (heredado de Jekyll) excluía el lockfile. CI hacía `npm install` sin lockfile → builds no reproducibles. | ✅ *Corregido: lockfile versionado y workflow usando `npm ci`.* |
| 7 | **Assets legacy de Jekyll** | `assets/` contenía jQuery, lunr.js, plugins jQuery, `main.scss` y `main.min.js` del theme Minimal Mistakes (~1 MB sin uso). | ✅ *Corregido: `assets/js/` y `assets/css/` eliminados; se conserva `assets/images/` (imágenes personales).* |
| 8 | **Colecciones de contenido vacías y sin esquema** | `src/content/blog/` y `src/content/publications/` existen pero están vacías y no hay `src/content/config.ts`. El blog y las publicaciones se editan a mano en `.astro`. | Migrar a Content Collections de Astro (ver §3.1). Es el cambio de mayor retorno a mediano plazo. |
| 9 | **README desactualizado** | Mencionaba Docker, `docker-compose.yml`, `Dockerfile` y `src/components/` — ninguno existía en el repo. | ✅ *Corregido: README reescrito con el flujo real y enlaces a la documentación en `docs/`.* |
| 10 | **Campos muertos en `proyectos.ts`** | `color` y `emoji` quedaron del diseño anterior y no se usaban en ninguna página. | ✅ *Corregido: campos eliminados de la interfaz, los datos y la guía de contenido.* |

### Prioridad baja

| # | Problema | Detalle |
|---|----------|---------|
| 11 | **Blog huérfano** | `blog.astro` existe pero no está en la navegación. Decidir: agregarlo al nav cuando tenga contenido real, o eliminar la página mientras tanto. |
| 12 | **Imágenes duplicadas y pesadas** | `bio-photo.jpg` y `perfil.JPG` aparecen en `public/`, `assets/images/` y `dist/`. `perfil.JPG` (extensión en mayúscula, típica de cámara) no se usa en ninguna página. Elegir una fuente única en `public/` y considerar convertir a WebP. |
| 13 | **Texto duplicado en docencia** | La frase "Esta asignatura introdujo a los estudiantes a métodos estadísticos avanzados…" aparece idéntica en dos cursos distintos (`docencia.astro`). Parece copy-paste. |
| 14 | **`© 2025` fijo en el footer** | ✅ *Corregido: ahora usa el año actual dinámicamente.* |
| 15 | **Sin `robots.txt`** | ✅ *Corregido: `public/robots.txt` creado apuntando al sitemap.* |

---

## 3. Sugerencias de desarrollo (roadmap)

### 3.1 Migrar contenido a Content Collections (la mejora más importante)

Hoy, publicar una publicación o un post implica editar HTML dentro de un `.astro`. Con Content Collections, cada pieza de contenido es un archivo Markdown con frontmatter validado:

```
src/content/
├── config.ts          # esquemas zod: blog, publicaciones, proyectos
├── blog/mi-post.md
├── publicaciones/sindemia-chile.md
└── proyectos/prediccion-ventas.md
```

Beneficios: escribir en Markdown (más rápido y menos propenso a errores), validación de frontmatter en build, páginas de detalle generadas automáticamente con `getStaticPaths`, y orden/filtrado programático. Las guías de contenido en `docs/guias-contenido/` documentan el flujo actual y quedarán aún más simples tras esta migración.

### 3.2 Extraer componentes reutilizables

Hay patrones repetidos 4-6 veces que deberían ser componentes en `src/components/`:

- **`PageHeader.astro`** — kicker mono (`§ Sección`) + título serif + bajada (aparece en las 8 páginas).
- **`CTABand.astro`** — banda tinta con línea de gradiente superior y botones (aparece en proyectos, repositorios, docencia ×2, about).
- **`Tag.astro`** — etiqueta mono con borde fino.
- **`ProjectCard.astro`** — celda de la grilla de proyectos/repos.

Esto garantiza consistencia visual automática y reduce ~30% del markup duplicado.

### 3.3 SEO y metadatos

- ✅ *Aplicado: Open Graph + Twitter Card + URL canónica en `Layout.astro`.*
- Pasar `description` específica por página (el prop ya existe, casi ninguna página lo usa).
- Agregar datos estructurados JSON-LD tipo `Person` en el home (nombre, afiliación, ORCID si tienes) — relevante para un perfil académico.
- Crear una imagen OG (1200×630) con el estilo del sitio para compartir en redes.

### 3.4 Calidad y automatización

- **CI de verificación**: paso previo al deploy con `astro check` (detecta errores de TypeScript/props) y un chequeo de links rotos (p. ej. `lychee` o `astro-broken-links-checker`).
- **Prettier + prettier-plugin-astro** para formateo consistente.
- **Lighthouse CI** opcional para vigilar rendimiento/accesibilidad en cada push.

### 3.5 Contenido pendiente (deuda visible para visitantes)

1. Publicaciones: solo hay una entrada y su enlace no lleva a ninguna parte — es la sección más débil para un perfil académico. Agregar cita completa, DOI/PDF.
2. Página "Scripts de Análisis" en repositorios apunta al perfil genérico de GitHub, no a un repo.
3. Blog: dos entradas anunciadas sin página de destino.
4. Sección de tesis del magíster: cuando exista, será un proyecto ancla ideal para el home.

### 3.6 Mejoras futuras (opcionales)

- **Dark mode** con la misma paleta invertida (tinta → fondo, hueso → texto); Tailwind lo facilita con `darkMode: 'class'`.
- **RSS** (`@astrojs/rss`) cuando el blog tenga contenido — estándar en sitios académicos.
- **Búsqueda** con Pagefind si el contenido crece.
- **Versión en inglés** (`/en/`) si apuntas a audiencia internacional (PhD Holanda): Astro soporta i18n nativo.
- **Analytics** respetuoso (Plausible/GoatCounter) para saber qué secciones se visitan.

---

## 4. Orden sugerido de ejecución

1. Higiene git: sacar `dist/` del repo, commitear lockfile, borrar assets Jekyll (30 min).
2. Unificar email público y arreglar/quitar links rotos (30 min).
3. Actualizar README (15 min).
4. Extraer componentes `PageHeader` y `CTABand` (1-2 h).
5. Migrar publicaciones y blog a Content Collections (2-4 h).
6. CI con `astro check` + link checker (1 h).
7. Contenido: completar publicaciones y primer post real del blog.
