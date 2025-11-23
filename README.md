# Cristian Baeza Torres - Sitio Personal

Sitio personal migrado de Jekyll a Astro con Docker para desarrollo local.

## 👨‍🔬 Sobre mí

Antropólogo Físico, estudiante de postgrado de Ciencia de Datos.  
Presidente de la Sociedad Chilena de Antropología Biologica (SOCHIAB) 2025-2026.  
Colaborador recurrente de la Carrera de Antropología de la Universidad de Concepción.  
Founder en ARIACH (Academia de Robotica e Inteligencia Artificial).  
De Concepción, Chile.

### Stack Tecnológico
- Python
- R 
- SQL (PostgreSQL)
- JASP
- JavaScript/TypeScript
- Astro + Tailwind CSS

## 🚀 Desarrollo Local

### Requisitos
- Docker Desktop
- Docker Compose
- Node.js 20+ (opcional, si no usas Docker)

### Inicio Rápido

```bash
# Con Docker (recomendado)
docker-compose up

# Sin Docker
npm install
npm run dev
```

El sitio estará disponible en: `http://localhost:4321`

## 📦 Comandos

| Comando | Acción |
|---------|--------|
| `npm install` | Instala dependencias |
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Vista previa del build |
| `docker-compose up` | Servidor con Docker |

## 🏗️ Estructura del Proyecto

```
/
├── public/          # Assets estáticos
├── src/
│   ├── components/  # Componentes reutilizables
│   ├── content/     # Contenido en Markdown
│   ├── layouts/     # Layouts de página
│   └── pages/       # Rutas del sitio
├── astro.config.mjs
├── Dockerfile
└── docker-compose.yml
```

## 🌐 Deploy a GitHub Pages

El sitio se despliega automáticamente con GitHub Actions en cada push a `master`.

## 📧 Contacto Profesional

- **Email**: crisbaezatorres@gmail.com
- **Email Institucional**: cbaeza2016@udec.cl
- **LinkedIn**: [Cristian Baeza Torres](https://www.linkedin.com/in/cristian-baeza-torres/)

### SOCHIAB

- **Web**: [sochiab.cl](https://sochiab.cl/)
- **Email**: presidencia@sochiab.cl
- **LinkedIn**: [SOCHIAB](https://www.linkedin.com/company/sochiab/)
- **Instagram**: [@sochiab](https://www.instagram.com/sochiab/)

## 🛠️ Tecnologías

- [Astro](https://astro.build) - Framework web
- [Tailwind CSS](https://tailwindcss.com) - Estilos
- [MDX](https://mdxjs.com) - Markdown con componentes
- Docker + Nginx - Containerización y deploy

## 📝 Migración desde Jekyll

Este proyecto fue migrado desde Jekyll (Minimal Mistakes theme).

## 📄 Licencia

MIT
