# Plan de Rediseño — cbaezat.github.io

**Alcance:** solo diseño (CSS/Tailwind/markup). Se mantiene Astro + Tailwind, la estructura de páginas y el contenido.

**Concepto:** *"Estratigrafía digital"* — la estética de un cuaderno de campo / publicación científica (antropología biológica) con precisión técnica (data science). Tonos hueso y sedimento, tipografía editorial, y detalles monoespaciados que evocan datos y medición.

---

## Diagnóstico (por qué se ve "Claude-coded")

1. Header y footer con `bg-gradient-to-r` negro→azul→gris: el gradiente genérico es la firma más reconocible.
2. Arcoíris de badges pastel (`bg-blue-100`, `bg-purple-100`, `bg-green-100`, `bg-red-100`, teal, cyan, indigo…): +15 combinaciones de color sin sistema.
3. Emojis como íconos (🎯📊🦴) en proyectos, docencia y repositorios.
4. Cards blancas con `shadow-md` + `border-l-4` de color aleatorio: patrón Tailwind por defecto.
5. Tipografía del sistema sin personalidad (no hay fuente definida en `tailwind.config.mjs`).
6. Botones azul genérico (`bg-blue-600`) y pills `rounded-full` por todas partes.
7. Carrusel vertical con flechas ↑↓ y auto-avance: interacción anticuada y frágil en móvil.
8. Cajas de "expertise" cada una con un fondo pastel distinto (green-50, blue-50, purple-50, red-50).

---

## Recomendaciones

### 1. Paleta de color (definir en `tailwind.config.mjs`)
- **Fondo:** blanco hueso `#FAF7F2` (no `gray-50`). Superficie de cards `#FFFFFF` o `#F4EFE7`.
- **Tinta:** casi-negro cálido `#1C1917` para texto; `#57534E` para secundario.
- **Acento primario (tierra):** ocre/terracota `#B45309` — enlaces, botones, hover.
- **Acento secundario (tech):** verde profundo tipo pátina `#1E4D45` o azul petróleo `#164E63` — solo uno, para tags y detalles.
- **Regla:** máximo 2 acentos en todo el sitio. Eliminar todos los `*-100`/`*-50` pastel actuales.

### 2. Tipografía (via `@fontsource` o Google Fonts, definir en config)
- **Display/títulos:** serif editorial — *Fraunces* o *Source Serif 4*. Da el tono científico-humanista.
- **Cuerpo:** sans limpia — *Inter* o *Public Sans*.
- **Mono (el detalle tech):** *IBM Plex Mono* o *JetBrains Mono* para tags, fechas, estados de proyecto y labels tipo `[ EN CURSO ]`, `fig. 01`, `§ 02`. Este contraste serif+mono es lo que une antropología y datos.
- Reducir el H1 del home de `text-6xl` a algo con más carácter tipográfico y menos tamaño bruto.

### 3. Header y footer
- Eliminar los gradientes. Header claro (fondo hueso) con borde inferior fino `1px`, o tinta sólida `#1C1917`.
- Nombre en serif; links de nav en mono uppercase pequeño con `tracking-wide`.
- Footer sólido tinta, con una línea fina de acento arriba (evoca un estrato).

### 4. Sistema de cards y badges
- Cards planas: fondo blanco/hueso, borde `1px` color `#E7E0D5`, `rounded-md` (no `-lg`/`-xl`), sin `shadow-md`. Hover: borde en acento + leve translate, no sombra creciente.
- Eliminar `border-l-4` de colores. Si se quiere jerarquía, usar un número de catálogo en mono: `01`, `02`, `03` (como piezas de colección osteológica).
- **Tags: un solo estilo.** Mono, minúscula, borde fino, sin fondo de color: `border border-stone-300 text-stone-600`. El color deja de codificar categorías (nadie recuerda el código de todos modos).

### 5. Íconos y motivos gráficos
- Reemplazar todos los emojis por íconos SVG de línea fina (Lucide/Heroicons outline, `stroke-width: 1.5`).
- Motivo de fondo sutil (una sola pieza, no recargar): líneas de contorno topográfico o estratos horizontales en SVG con opacidad ~5% en el hero, o una regla de medición/caliper como separador de secciones (`<hr>` custom).
- Foto de perfil: pasar de círculo a rectángulo con esquinas mínimas y borde fino — más editorial/ficha de museo.

### 6. Home (index.astro)
- **Eliminar el carrusel.** Reemplazar por lista estática de los 3 proyectos recientes: filas con número de catálogo, título en serif, estado en mono, y flecha →. Menos JS, mejor en móvil, más sobrio.
- Hero: nombre grande en serif, bajada en una línea ("Antropólogo físico · Ciencia de datos"), y las 3 áreas como texto mono separado por `/` en vez de pills de colores.
- CTAs: un botón primario sólido (tinta u ocre) y uno secundario solo con borde. Sin `shadow-md hover:shadow-lg`.

### 7. Páginas interiores (about, proyectos, publicaciones, docencia, repos)
- Encabezado de página uniforme: kicker en mono (`§ Proyectos`), título serif, línea fina debajo.
- About: quitar los 4 fondos pastel de expertise → grid con bordes finos compartidos (estilo tabla de espécimen). Formación académica como timeline vertical con línea y puntos (estratos).
- Publicaciones: formato de cita académica real (sangría francesa, año en mono al margen) en vez de cards.
- CTA de colaboración: quitar la caja `bg-blue-50 border-l-4` → banda a lo ancho con fondo tinta y texto hueso.

### 8. Móvil
- Menú hamburguesa: panel a pantalla completa con fondo hueso y links grandes en serif (no lista comprimida bajo el header).
- Aumentar `py` de links de nav móvil a mínimo 44px de área táctil.
- Hero móvil: foto y texto apilados con más aire; proyectos recientes como lista (ya sin carrusel, funciona igual).
- Revisar `max-w-[1600px]` del main → bajar a `max-w-6xl` para líneas de lectura más cómodas.

### 9. Microdetalles de consistencia
- Un solo radio de borde en todo el sitio (`rounded-md`).
- Un solo estilo de transición (`transition-colors duration-200`), eliminar `will-change`.
- Espaciado vertical consistente entre secciones (escala 8/12/20).
- Estados de proyecto normalizados en mono: `[ EN CURSO ]`, `[ FINALIZADO ]`.

---

## Orden sugerido de implementación

1. `tailwind.config.mjs`: paleta + fuentes (base de todo lo demás).
2. `Layout.astro`: header, footer, nav móvil, ancho del main.
3. Sistema de cards/tags/botones (componentes compartidos o clases consistentes).
4. `index.astro`: hero + reemplazo del carrusel.
5. Páginas interiores una a una.
6. Pasada final móvil + dark mode (opcional, fase 2).
