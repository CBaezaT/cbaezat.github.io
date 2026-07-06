# Cristian Baeza Torres — Sitio Personal

Sitio personal publicado en **[crisbaezatorres.cl](https://crisbaezatorres.cl)**. Construido con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com), desplegado automáticamente en GitHub Pages. Migrado desde Jekyll (Minimal Mistakes) en 2025-2026.

## Sobre mí

Antropólogo Físico, estudiante del Magíster en Ciencia de Datos para la Innovación (Universidad de Concepción).
Presidente de la Sociedad Chilena de Antropología Biológica (SOCHIAB) 2025-2026.
Colaborador recurrente de la Carrera de Antropología de la Universidad de Concepción.
Founder en ARIACH (Academia de Robótica e Inteligencia Artificial).
De Concepción, Chile.

## Desarrollo local

Requiere Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Vista previa del build |

## Estructura

```
src/
├── layouts/Layout.astro    # Layout único (head, nav, footer)
├── data/proyectos.ts       # Datos de proyectos
└── pages/                  # Una página por sección + detalles de proyecto
public/                     # Assets estáticos (foto, favicon, CNAME, robots.txt)
docs/                       # Documentación del proyecto
```

## Documentación

- [Documento de diseño](docs/documento-diseno.md) — sistema visual "estratigrafía digital" y sus reglas.
- [Revisión y sugerencias de desarrollo](docs/revision-sugerencias-desarrollo.md) — estado del repo y roadmap.
- [Guías de contenido](docs/guias-contenido/) — cómo agregar proyectos, publicaciones, posts, repositorios y cursos.

## Deploy

Push a `master` → GitHub Actions ([deploy.yml](.github/workflows/deploy.yml)) construye y publica en GitHub Pages con el dominio `crisbaezatorres.cl`.

## Contacto

- **Email**: crisbaezatorres@gmail.com
- **LinkedIn**: [Cristian Baeza Torres](https://www.linkedin.com/in/cristian-baeza-torres/)
- **GitHub**: [@CBaezaT](https://github.com/CBaezaT)

### SOCHIAB

- **Web**: [sochiab.cl](https://sochiab.cl/) · **Email**: presidencia@sochiab.cl
- [LinkedIn](https://www.linkedin.com/company/sochiab/) · [Instagram](https://www.instagram.com/sochiab/)

## Licencia

MIT
