# Guía: agregar una publicación

Las publicaciones se listan en **`src/pages/publications.astro`** (URL `/publications`). Hoy el contenido está directamente en esa página; no hay páginas de detalle por publicación.

> **Nota:** existe `src/content/publications/` (vacío) pensado para migrar a Content Collections. Mientras esa migración no ocurra, el flujo es el descrito aquí.

## Paso 1 — Agregar el `<article>` a la lista

Dentro del `<div class="divide-y divide-bone-300 border-t border-bone-300">`, agrega un bloque por publicación. **Orden: más reciente primero.**

```astro
<article class="py-8 flex gap-6">
  <span class="font-mono text-sm text-clay shrink-0 pt-1">2026</span>
  <div class="space-y-2">
    <h2 class="font-serif text-xl font-semibold text-ink">Título del artículo</h2>
    <!-- Cita completa: autores, revista, volumen, páginas -->
    <p class="text-sm text-ink-light font-mono">
      Baeza-Torres, C., & Coautor, A. (2026). <em>Revista</em>, 12(3), 45–67.
    </p>
    <p class="text-ink-light leading-relaxed">
      Resumen breve en 1-2 oraciones: pregunta de investigación y hallazgo principal.
    </p>
    <a href="https://doi.org/10.xxxx/xxxxx" target="_blank" rel="noopener noreferrer"
       class="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink hover:text-clay transition-colors duration-200 pt-1">
      DOI
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
      </svg>
    </a>
  </div>
</article>
```

## Convenciones

- **Año al margen** en mono clay: es el eje visual de la lista (estilo bibliografía con año destacado).
- **Cita académica completa** en formato APA: para un perfil académico, la cita formal es más creíble que solo el título.
- **Enlace real o ningún enlace**: nunca `href="#"`. Si no hay DOI/PDF público aún, omite el enlace; agrégalo cuando exista. Etiqueta según destino: `DOI`, `PDF`, `Ver en revista`, `Preprint`.
- **Tipos de publicación**: si mezclas artículos, capítulos, ponencias y pósters, agrega una etiqueta mono junto al año (`[ ARTÍCULO ]`, `[ PONENCIA ]`) o sepáralos con subtítulos `<h2 class="font-serif text-2xl …">` por categoría cuando haya volumen suficiente.

## Paso 2 — Verificar

```bash
npm run dev
```

Revisa `/publications`: orden cronológico inverso, enlaces funcionando (deben abrir en pestaña nueva con `rel="noopener noreferrer"`), y que la cita no se desborde en móvil.
