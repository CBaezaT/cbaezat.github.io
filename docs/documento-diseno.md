# Documento de diseño — "Estratigrafía digital"

**Sitio:** crisbaezatorres.cl · **Última actualización:** julio 2026

Este documento describe el sistema de diseño vigente del sitio (implementado en el rediseño de 2026, ver [Redesign.md](../Redesign.md) para el plan original) y propone mejoras para elevarlo a un nivel más profesional **sin cambiar su carácter**. El diseño actual funciona y gusta; lo que sigue es refinamiento, no reemplazo.

---

## 1. Concepto

**"Estratigrafía digital"**: la estética de un cuaderno de campo o publicación científica de antropología biológica, cruzada con la precisión técnica de la ciencia de datos. Cada decisión visual responde a esa metáfora:

- Los tonos **hueso y sedimento** evocan material osteológico y papel de archivo.
- La **serif editorial** (títulos) da el tono científico-humanista; la **monoespaciada** (etiquetas, fechas, estados) evoca datos, medición e instrumento.
- Los **números de catálogo** (`01`, `02`…) tratan proyectos y recursos como piezas de una colección de museo.
- Las **líneas finas horizontales** y la banda de gradiente del footer evocan estratos.
- Los estados entre corchetes (`[ EN CURSO ]`) citan la notación de registro técnico.

Esta coherencia conceptual es la mayor fortaleza del diseño: no parece una plantilla.

## 2. Sistema de diseño actual

### 2.1 Paleta (definida en `tailwind.config.mjs`)

| Token | Valor | Uso |
|-------|-------|-----|
| `bone-50` | `#FDFCFA` | Superficie de cards |
| `bone-100` | `#FAF7F2` | Fondo general del sitio |
| `bone-200` | `#F4EFE7` | Texto claro sobre tinta |
| `bone-300` | `#E7E0D5` | Bordes y separadores (1px) |
| `ink` | `#1C1917` | Texto principal, footer, bandas CTA |
| `ink-light` | `#57534E` | Texto secundario |
| `clay` / `-light` / `-dark` | `#B45309` / `#D97706` / `#92400E` | Acento primario: kickers, números de catálogo, hovers |
| `moss` (+variantes) | `#1E4D45` | Acento secundario: estados de proyecto |

**Regla:** máximo dos acentos (clay y moss) en todo el sitio. Nada de pasteles.

### 2.2 Tipografía

| Rol | Fuente | Uso |
|-----|--------|-----|
| Display / títulos | **Fraunces** (serif variable) | H1-H4, nombre en header, títulos de cards |
| Cuerpo | **Inter** | Párrafos y texto general |
| Técnica | **JetBrains Mono** | Nav, kickers (`§ Sección`), tags, fechas, estados, botones |

Patrón de encabezado de página uniforme: kicker mono uppercase en clay (`§ Catálogo`) → H1 serif 4xl → bajada en `ink-light` → borde inferior `bone-300`.

### 2.3 Componentes y patrones

- **Header**: fondo hueso translúcido con `backdrop-blur`, sticky, borde inferior fino. Nav en mono xs uppercase con tracking amplio.
- **Cards**: planas, fondo `bone-50`, grillas con `gap-px` sobre fondo `bone-300` (simula tabla de espécimen con bordes compartidos). Sin sombras. Hover: cambio de fondo o color de texto, nunca sombra creciente.
- **Tags**: un solo estilo — borde fino `bone-300`, texto mono xs uppercase, sin fondo de color.
- **Botones**: primario tinta sólida (hover `clay-dark`); secundario solo borde (hover clay). Texto mono xs uppercase. Rectos, sin `rounded-full`.
- **Bandas CTA**: fondo tinta, línea superior de 3px con gradiente clay→moss (el "estrato"), texto hueso.
- **Timelines** (formación, docencia): línea vertical de 1px con puntos; el ítem activo lleva punto clay, los históricos `bone-300`.
- **Footer**: tinta sólida con la misma línea de estrato arriba.
- **Menú móvil**: panel a pantalla completa fondo hueso, links grandes en serif, área táctil ≥44px.

### 2.4 Reglas transversales

- Un solo estilo de transición: `transition-colors duration-200`.
- Esquinas rectas o `rounded-md` como máximo; un solo radio en todo el sitio.
- Ancho de lectura: `max-w-6xl` en el layout; `max-w-4xl`/`max-w-2xl` en páginas de texto.
- Íconos: SVG de línea fina (`stroke-width: 1.5`), nunca emojis.

---

## 3. Sugerencias de mejora (hacia un sitio más profesional)

Ordenadas por impacto. Las marcadas ✅ ya se aplicaron en esta revisión.

### 3.1 Correcciones de credibilidad inmediata

1. ✅ **Favicon**: el sitio no tenía (404). Se creó un monograma "CB" en SVG con tinta sobre hueso y acento clay — la pestaña del navegador es lo primero que se ve.
2. ✅ **Metadatos para compartir**: sin Open Graph, un enlace compartido en LinkedIn/WhatsApp aparecía sin título ni descripción. Se agregaron OG + Twitter Card + URL canónica al layout. *Pendiente: diseñar una imagen OG de 1200×630 con la estética del sitio.*
3. ✅ **Idioma consistente**: la página "About me" tenía título en inglés en un sitio 100% en español; ahora es "Sobre mí" (coincide con el nav). Mezclar idiomas sin sistema resta profesionalismo; si se quiere versión en inglés, debe ser un sitio i18n completo.
4. ✅ **Año dinámico en footer**: `© 2025` fijo delataba abandono en 2026+.
5. **Un solo email público** en todas las páginas (hoy hay tres distintos — ver revisión de desarrollo §2.5).

### 3.2 Navegación y orientación

6. ✅ **Estado activo en el nav**: no había indicación de en qué página estás. Se agregó: el enlace de la sección actual se muestra en clay con `aria-current="page"`. Es una convención básica de sitios profesionales.
7. **Breadcrumb en páginas de detalle**: las páginas de proyecto ya tienen "← Volver a Proyectos"; mantener ese patrón en cualquier detalle futuro (posts, publicaciones).
8. **Blog**: decidir si entra al nav (cuando tenga ≥2 posts reales) o se retira la página. Una sección anunciada y vacía es peor que su ausencia.

### 3.3 Jerarquía y ritmo visual

9. **Home — más jerarquía en el hero**: el H1 compite con la columna de proyectos. Sugerencia: subir el H1 a `text-5xl lg:text-6xl` y dar a la bio una línea de apertura más memorable (una frase-tesis en serif italic, estilo epígrafe: *"Medir lo humano: del hueso al dato"*), seguida de los párrafos actuales.
10. **Ritmo vertical consistente**: unificar el espaciado entre secciones en una escala fija (p. ej. `space-y-12` interior, `space-y-16` entre bloques mayores). Hoy conviven `space-y-10/12/14` sin criterio claro.
11. **Docencia — aligerar cajas**: las tres secciones envueltas en `bg-bone-50 border p-8` seguidas se sienten pesadas; la de "Cursos" podría ir sin caja (timeline directo sobre el fondo, como en Sobre mí) para variar el ritmo.
12. **Repositorios — placa "CB"**: el cuadrado con iniciales dentro de la card de GitHub es un placeholder evidente; usar la foto real en b/n o un ícono de GitHub grande.

### 3.4 Detalle tipográfico y microdetalles

13. **Rango de medida**: limitar párrafos largos a `max-w-prose` (~65 caracteres) dentro de las secciones anchas — en pantallas grandes algunas líneas de texto corren demasiado.
14. **Cifras destacadas**: en páginas de proyecto, los resultados clave (14.48%, ~89% accuracy) merecen tratamiento de "dato de laboratorio": cifra grande en mono con label pequeño, en una fila de 2-3 stats. Refuerza el concepto y comunica resultados de un vistazo.
15. **Separador temático**: diseñar un `<hr>` custom (regla de medición o micro-estratos SVG al 5-8% de opacidad) para usar con moderación entre secciones largas — está sugerido en el plan original y nunca se implementó.
16. ✅ **Foco visible**: se agregó `focus-visible` con anillo clay para navegación por teclado (accesibilidad = profesionalismo).

### 3.5 Contenido visual

17. **Imágenes de proyecto**: las cards y páginas de detalle son 100% texto. Una figura por proyecto (gráfico del modelo, mapa, boxplot) con pie de figura en mono (`fig. 01 — WMAE por modelo`) elevaría muchísimo el carácter de publicación científica. Mantener las figuras en escala de grises/sepia para no romper la paleta.
18. **Foto de perfil**: consistente con el estilo ficha de museo (rectangular, borde fino) — bien. Considerar una versión de mayor calidad y recorte más deliberado; la actual se ve comprimida.
19. **Imagen OG**: (ver punto 2) fondo hueso, nombre en Fraunces, línea de estrato clay→moss, monograma.

### 3.6 Fase 2 (opcional, mismo lenguaje)

- **Dark mode "excavación nocturna"**: fondo `#141210`, texto hueso, acentos intactos. La paleta actual invierte con dignidad.
- **Micro-interacciones sobrias**: aparición sutil de secciones con `@media (prefers-reduced-motion: no-preference)` — nada de parallax ni animaciones largas.
- **Página 404 temática**: "Pieza no catalogada" con el estilo de ficha — convierte un error en un momento de marca.

---

## 4. Qué NO hacer (guardarraíles)

Para mantener la identidad al hacer cualquier cambio futuro:

- No introducir colores fuera de la paleta (nada de azules genéricos ni badges pastel).
- No usar sombras (`shadow-*`) ni `rounded-full`; el sitio es plano y recto.
- No usar emojis como íconos.
- No agregar una tercera fuente ni pesos extra sin decisión deliberada.
- No animar por animar: la sobriedad es parte del concepto.
- Todo texto técnico-auxiliar (fechas, estados, tags, labels) va en mono; todo título en serif. No mezclar.
