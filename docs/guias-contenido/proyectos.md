# Guía: agregar un proyecto

Los proyectos viven en dos lugares:

1. **`src/data/proyectos.ts`** — la lista central. Alimenta la grilla de `/proyectos` y los "Proyectos recientes" del home.
2. **`src/pages/proyectos/<slug>.astro`** — página de detalle (opcional pero recomendada).

## Paso 1 — Agregar la entrada en `proyectos.ts`

Agrega el objeto **al inicio del array** `proyectos` (el home muestra los 3 primeros como "recientes"):

```ts
{
  id: 4, // siguiente id disponible
  titulo: "Título del proyecto",
  descripcion: "Descripción completa (2-3 oraciones). Incluye el resultado principal con cifras si existen: mejora %, accuracy, N del dataset.",
  descripcionCorta: "Una sola oración para la card del home (máx ~100 caracteres)",
  tags: ["Data Science", "Machine Learning"], // 2-3 tags, reutiliza los existentes
  estado: "En curso - 2026", // o "Completado - 2026"
  año: "2026",
  link: "proyectos/mi-proyecto/" // omitir si aún no hay página de detalle
},
```

Convenciones:
- **Tags**: reutiliza tags existentes antes de inventar nuevos (`Data Science`, `Machine Learning`, `Antropología Forense`, `Liderazgo`…). Máximo 3.
- **Estado**: formato `Completado - AAAA` o `En curso`/rango de años. Se renderiza como `[ ESTADO ]` en mono.
- **descripcionCorta ≠ descripcion truncada**: escríbela aparte para que cierre bien.

## Paso 2 — Crear la página de detalle

Crea `src/pages/proyectos/mi-proyecto.astro` (el nombre del archivo define la URL). Usa esta estructura, que es la de las páginas existentes (`prediccion-ventas.astro` es el mejor modelo):

```astro
---
import Layout from '../../layouts/Layout.astro';
const base = import.meta.env.BASE_URL;
---

<Layout title="Título del Proyecto - Cristian Baeza Torres">
  <div class="max-w-4xl mx-auto space-y-10">
    <!-- Header -->
    <div class="space-y-5 border-b border-bone-300 pb-6">
      <a href={`${base}proyectos`} class="font-mono text-xs uppercase tracking-widest text-ink-light hover:text-clay inline-flex items-center gap-2 transition-colors duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        Volver a Proyectos
      </a>
      <h1 class="font-serif text-4xl lg:text-5xl font-semibold text-ink leading-tight">Título del Proyecto</h1>
      <div class="flex flex-wrap gap-2">
        <span class="border border-bone-300 text-ink-light px-3 py-1 font-mono text-xs uppercase tracking-wide">Tag 1</span>
        <span class="border border-bone-300 text-ink-light px-3 py-1 font-mono text-xs uppercase tracking-wide">Tag 2</span>
      </div>
      <p class="font-mono text-xs text-moss uppercase tracking-wide">[ Completado · 2026 ]</p>
    </div>

    <!-- Secciones de contenido -->
    <div class="space-y-8">
      <section class="bg-bone-50 border border-bone-300 p-8 space-y-6">
        <h2 class="font-serif text-2xl font-semibold text-ink">Resumen Ejecutivo</h2>
        <p class="text-ink-light leading-relaxed">…</p>

        <!-- Caja de resultado destacado -->
        <div class="border-l-2 border-clay bg-bone-100 p-6">
          <h3 class="font-serif text-lg font-semibold text-ink mb-2">Resultado Principal</h3>
          <p class="text-ink-light">…con <strong class="text-ink">cifra clave</strong>…</p>
        </div>
      </section>

      <!-- Repetir <section> para: Contexto, Metodología, Resultados, Conclusiones -->
    </div>
  </div>
</Layout>
```

Estructura de secciones recomendada (adaptar según el proyecto):
1. **Resumen Ejecutivo** — qué, para quién, resultado principal en caja destacada.
2. **Contexto / Problema** — por qué existió el proyecto.
3. **Datos y Metodología** — dataset (N, período, fuente), modelos/técnicas.
4. **Resultados** — cifras concretas; usar grillas `grid gap-px bg-bone-300 border border-bone-300` con celdas `bg-bone-50` para comparar.
5. **Conclusiones / Aprendizajes**.

## Paso 3 — Verificar

```bash
npm run dev
```

Revisa: la card en `/proyectos`, el orden en el home, el link de detalle y la vista móvil (menú y grilla en 1 columna).

## Reglas de estilo (resumen)

- Nada de emojis, sombras ni colores fuera de la paleta (ver [documento-diseno.md](../documento-diseno.md) §4).
- Estados siempre `[ … ]` en mono; números de catálogo los pone la grilla automáticamente.
- Si incluyes figuras, en escala de grises/sepia con pie en mono: `fig. 01 — descripción`.
