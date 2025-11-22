FROM ruby:3.1-slim

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Configurar directorio de trabajo
WORKDIR /site

# Copiar Gemfile para instalar dependencias
COPY Gemfile* ./

# Instalar bundler y dependencias de Jekyll
RUN gem install bundler && \
    bundle install

# Copiar el resto del sitio
COPY . .

# Puerto para Jekyll
EXPOSE 4000

# Comando por defecto
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
