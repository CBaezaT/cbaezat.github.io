# Guía: actualizar la sección Docencia

La página **`src/pages/docencia.astro`** (URL `/docencia`) tiene cuatro bloques: **Cursos y Seminarios** (timeline), **Tutoría y Mentoría** (grilla de áreas), **Recursos Educativos** (lista numerada) y **Mi Enfoque Educativo** (banda tinta). Lo que más se actualiza es el timeline de cursos.

## Agregar un curso al timeline

Los cursos van dentro del `<div class="relative pl-6 space-y-6 before:…">` de la sección "Cursos y Seminarios", **ordenados del más reciente al más antiguo**.

```astro
<div class="relative">
  <!-- Punto clay = curso vigente; bone-300 = curso pasado -->
  <span class="absolute -left-6 top-1.5 w-1.5 h-1.5 rounded-full bg-clay"></span>
  <h3 class="font-serif text-lg font-semibold text-ink">Nombre del Curso</h3>
  <p class="font-mono text-xs text-moss uppercase tracking-wide mt-1">[ S1-2026 ]</p>
  <p class="text-ink-light text-sm mt-1">Carrera de Antropología · Universidad de Concepción</p>
  <p class="text-ink-light mt-2 leading-relaxed">
    Qué cubre el curso y a quién va dirigido (1-2 oraciones).
  </p>
  <p class="text-ink-light mt-2 leading-relaxed">
    Tu rol o aporte distintivo: qué actualizaste, qué enfoque le diste (opcional).
  </p>
</div>
```

Reglas del timeline:
- **Solo un curso "vigente"** con punto `bg-clay` y período en `text-moss` (el que dictas actualmente). Al agregar uno nuevo vigente, cambia el anterior a `bg-bone-300` y su período a `text-ink-light`.
- **Período** en formato semestre-año: `[ S1-2026 ]`, `[ S2-2025 ]`, o rango: `[ S1-2024 a la fecha ]`.
- **Descripción propia por curso**: no reutilices párrafos entre cursos (ya ocurrió — dos cursos comparten hoy la misma frase final; ver revisión de desarrollo §2.13).

## Actualizar Tutoría y Recursos

- **Áreas de tutoría**: grilla de celdas `bg-bone-50 p-5` con título serif + descripción corta. Mantener en número par (2 o 4) para que la grilla de 2 columnas cierre.
- **Recursos Educativos**: lista con número de catálogo (`01`, `02`…) en mono clay. Si agregas un recurso, continúa la numeración. Cuando un recurso tenga URL pública (notebook, repositorio de guías), convierte el título en enlace con el patrón estándar `hover:text-clay`.

## Mi Enfoque Educativo

Texto en primera persona dentro de la banda tinta. Revisarlo una vez al año basta; si lo editas, mantén 3-4 párrafos y el tono reflexivo.

## Verificar

```bash
npm run dev
```

Revisa `/docencia`: orden cronológico del timeline, un solo punto clay, y la vista móvil (el timeline debe conservar la línea vertical alineada con los puntos).
