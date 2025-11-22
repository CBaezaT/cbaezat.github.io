# Dockerizar Jekyll Site

Este proyecto ahora incluye configuración de Docker para desarrollo local.

## Requisitos

- Docker Desktop instalado
- Docker Compose

## Configuración Inicial

### 1. Cambiar el remoto de Git (para apuntar a un nuevo repositorio)

```bash
# Ver remotos actuales
git remote -v

# Eliminar el remoto actual
git remote remove origin

# Agregar el nuevo repositorio privado (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/TU_NUEVO_REPO.git

# Verificar
git remote -v
```

### 2. Crear el nuevo repositorio en GitHub

1. Ve a GitHub y crea un nuevo repositorio **privado**
2. NO inicialices con README, .gitignore o licencia
3. Copia la URL del repositorio

### 3. Hacer push al nuevo repositorio

```bash
git push -u origin master
```

## Uso con Docker para Jekyll

### Construir y ejecutar el contenedor

```bash
# Primera vez: construir la imagen
docker-compose build

# Levantar el servicio
docker-compose up
```

El sitio estará disponible en: `http://localhost:4000`

### Comandos útiles

```bash
# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener el servicio
docker-compose down

# Reconstruir si cambias dependencias en Gemfile
docker-compose up --build
```

### Desarrollo

- Los cambios en archivos se reflejan automáticamente (LiveReload)
- El puerto 4000 es para el sitio Jekyll
- El puerto 35729 es para LiveReload

## Estructura de archivos Docker

- **`Dockerfile`**: Define la imagen de Ruby 3.1 con Jekyll y dependencias
- **`docker-compose.yml`**: Orquesta el servicio, puertos y volúmenes
- **`.dockerignore`**: Excluye archivos innecesarios del contexto de build

## Notas importantes

- El volumen `bundle_cache` mantiene las gemas instaladas entre builds (ahorra tiempo)
- Los archivos se montan como volumen para desarrollo en tiempo real
- El flag `--force_polling` asegura que los cambios se detecten en todos los sistemas operativos
- Este setup es solo para desarrollo, **NO** para producción

## Flujo de trabajo recomendado

1. **Desarrollo local**: Usa Docker para probar cambios
2. **Verifica que todo funciona** en `localhost:4000`
3. **Commit y push** al nuevo repositorio privado
4. Cuando estés listo para deploy, configura GitHub Pages o deploy manual

## Troubleshooting

### Error de permisos

```bash
sudo chown -R $USER:$USER .
```

### Limpiar caché de Docker

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Ver qué está corriendo

```bash
docker ps
docker-compose logs
```
