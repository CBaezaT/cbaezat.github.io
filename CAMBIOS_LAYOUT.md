# Cambios Realizados en el Layout y Navegación

## Resumen
Se ha rediseñado completamente el sitio web con un nuevo menú de navegación y una página de inicio con layout de 2 columnas.

## Cambios Principales

### 1. **Menú de Navegación** (`src/layouts/Layout.astro`)
**Antes:**
- Inicio
- Sobre mí
- Blog
- Publicaciones

**Ahora:**
- About me
- Proyectos
- Docencia
- Contacto

### 2. **Página de Inicio** (`src/pages/index.astro`)
**Rediseño:** Layout de 2 columnas responsivo

**Columna Izquierda:**
- Información personal (nombre, título, institución)
- Sección "Sobre mí" con descripción breve
- Áreas de Expertise (tags con colores)
- Botones de CTA (Ver Proyectos, Contáctame)

**Columna Derecha:**
- Carrusel/Slide automático de "Proyectos Recientes"
- 3 slides rotatorios:
  1. Análisis de Sindemias
  2. Transcripción Automática
  3. SOCHIAB 2025-2026
- Controles: botones prev/next + indicadores de punto
- Auto-advance cada 7 segundos

### 3. **Nueva Página: Proyectos** (`src/pages/proyectos.astro`)
- Grid de 4 proyectos destacados
- Cada proyecto tiene:
  - Título y descripción
  - Tags de categoría
  - Fecha/estado del proyecto
- Sección CTA para colaboración

### 4. **Nueva Página: Docencia** (`src/pages/docencia.astro`)
- Sección de Cursos y Seminarios
- Sección de Tutoría y Mentoría
- Recursos Educativos
- Filosofía Educativa
- CTA para estudiantes interesados

### 5. **Nueva Página: Contacto** (`src/pages/contacto.astro`)
- Información de contacto (email, institución, redes sociales)
- Formulario de contacto (integrable con Formspree)
- Lista de razones para contactar
- Información sobre tiempo de respuesta

### 6. **Página About me Actualizada** (`src/pages/about.astro`)
- Diseño modernizado y expandido
- Secciones: Introducción, Formación, Expertise, Experiencia, Intereses, Valores
- Grid de expertise areas
- Timeline de experiencia profesional
- Sección de valores con iconos

## Características Técnicas

### Carrusel de Proyectos
- Transiciones suaves con CSS (opacity)
- Navegación manual (botones prev/next)
- Navegación por indicadores (dots)
- Auto-advance automático cada 7 segundos
- JavaScript vanilla (sin dependencias)

### Diseño Responsive
- Grid de 1 columna en mobile
- Grid de 2 columnas en desktop (lg breakpoint)
- Todas las páginas son totalmente responsive

### Estilización
- Tailwind CSS para todos los estilos
- Paleta de colores consistente
- Cards con bordes izquierdos coloreados para jerarquía visual
- Gradientes sutiles para énfasis

## Archivo de Navegación Anterior

El archivo `_data/navigation.yml` (Jekyll) sigue existiendo pero ya no es usado por Astro.
El sitio actual utiliza el menu hardcodeado en `src/layouts/Layout.astro`.

## Próximos Pasos Recomendados

1. Configurar el formulario de contacto con Formspree (reemplazar YOUR_FORM_ID en contacto.astro)
2. Agregar más contenido a las secciones de proyectos y docencia si lo deseas
3. Crear artículos en `src/content/blog/` para expandir el contenido
4. Considerar agregar un componente de newsletter
5. Agregar imágenes a los proyectos para hacerlos más visualmente atractivos

## Testing Local

Para ver los cambios:
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000` (o el puerto que Astro asigne)
