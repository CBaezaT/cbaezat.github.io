# Guía: agregar un repositorio

Los repositorios destacados se definen en el array `repos` al inicio de **`src/pages/repositorios.astro`** (URL `/repositorios`). No hay páginas de detalle: cada card enlaza directo a GitHub.

## Paso 1 — Agregar la entrada al array

```ts
const repos = [
  {
    title: 'Nombre legible del proyecto',       // no el nombre técnico del repo
    lang: 'Python',                              // lenguaje principal (una palabra)
    year: '2026',                                // año del trabajo
    desc: 'Qué hace y qué lo distingue, en 1-2 oraciones. Menciona técnica o resultado si aplica.',
    href: 'https://github.com/CBaezaT/nombre-del-repo',
  },
  // …
];
```

Convenciones:
- **Orden**: los más relevantes primero (no es estrictamente cronológico — es una vitrina).
- **`href` siempre a un repo específico**, nunca al perfil genérico `github.com/CBaezaT` (para eso ya está la card de perfil arriba).
- **`title` legible**: "Predicción de Ventas - Series de Tiempo", no "TimeSeries_Sales_Prediction_T2".
- **`desc` con sustancia**: qué problema resuelve + qué técnica usa + resultado si lo hay ("Entrega ganadora con el menor WMAE de la competencia").
- Antes de listar un repo, verifica que tenga **README decente y sea público** — la card es una invitación a entrar.

## Paso 2 — Tecnologías (opcional)

Si el repo introduce una tecnología nueva a tu stack, agrégala al array `tecnologias` en el mismo archivo. Mantén la lista honesta: solo tecnologías que realmente usas.

## Paso 3 — Cuándo dar de baja

La sección es "destacados", no un historial: mantén entre 4 y 8 cards. Si agregas uno nuevo y la grilla crece demasiado, retira el menos representativo (el repo sigue visible en tu perfil de GitHub).

## Paso 4 — Verificar

```bash
npm run dev
```

Revisa `/repositorios`: la grilla (2 columnas en desktop, 1 en móvil), que el enlace abra el repo correcto en pestaña nueva, y que la card no quede desbalanceada por una descripción muy larga.

## Relación con Proyectos

Repositorio ≠ proyecto: si el trabajo tiene narrativa (contexto, metodología, resultados), además de listar el repo aquí crea el proyecto con su página de detalle siguiendo [proyectos.md](proyectos.md), y enlaza el repo desde esa página.
