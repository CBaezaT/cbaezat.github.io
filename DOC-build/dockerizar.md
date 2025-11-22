¡Sí, absolutamente! GitHub Pages **NO** requiere Jekyll obligatoriamente. Puedes usar cualquier tecnología que genere archivos HTML, CSS y JavaScript estáticos.

## Tecnologías populares para GitHub Pages:

### 1. **React** (con Vite, Create React App, Next.js estático)
```dockerfile name=Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Servidor para desarrollo local
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```json name=package.json
{
  "homepage": "https://CBaezaT.github.io/nombre-repo",
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 2. **Vue.js** (con Vite o Vue CLI)
```dockerfile name=Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```javascript name=vite.config.js
export default {
  base: '/nombre-repo/', // Importante para GitHub Pages
  build: {
    outDir: 'dist'
  }
}
```

### 3. **Angular**
```dockerfile name=Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production --base-href /nombre-repo/

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. **Svelte/SvelteKit**
```dockerfile name=Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 5. **HTML/CSS/JS Vanilla** (sin frameworks)
```dockerfile name=Dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```yaml name=docker-compose.yml
version: '3'
services:
  web:
    image: nginx:alpine
    volumes:
      - .:/usr/share/nginx/html
    ports:
      - "8080:80"
```

### 6. **Astro** (recomendado para sitios estáticos)
```dockerfile name=Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```javascript name=astro.config.mjs
export default {
  site: 'https://CBaezaT.github.io',
  base: '/nombre-repo'
}
```

## Workflow de GitHub Actions para deploy automático:

```yaml name=.github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist  # o ./build según tu framework
```

## Pasos para publicar:

### **Método 1: Con GitHub Actions** (automático)
1. Crea el workflow arriba
2. En tu repo: **Settings → Pages → Source** → selecciona "GitHub Actions"
3. Push a `main` y se despliega automáticamente

### **Método 2: Con gh-pages (manual)**
```bash
npm install --save-dev gh-pages

# En package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Luego ejecuta
npm run deploy
```

### **Método 3: Branch gh-pages manual**
```bash
npm run build
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy"
git push origin gh-pages --force
git checkout main
```

## **Importante**: Desactivar Jekyll

Para que GitHub Pages **NO** use Jekyll, crea este archivo:

```text name=.nojekyll
```

O en tu build:
```bash
touch dist/.nojekyll
```

## Ejemplo completo con Vite + React:

```dockerfile name=Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Imagen de desarrollo
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx name=nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```yaml name=docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:80"
    volumes:
      - .:/app
      - /app/node_modules
```

## Probar localmente antes del deploy:

```bash
# Construir
docker-compose build

# Ejecutar
docker-compose up

# Abrir http://localhost:3000
```

¿Qué tecnología prefieres usar? Puedo ayudarte a configurar un proyecto específico con Docker y el deploy a GitHub Pages.