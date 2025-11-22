---
layout: single
classes: wide
permalink: /
title: "Cristian Baeza Torres"
excerpt: "Antropología Física + Ciencia de Datos"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<div class="hero-modern">
  <div class="hero-content">
    <h1 class="hero-title">Antropología Física <span class="highlight">+</span> Ciencia de Datos</h1>
    <p class="hero-subtitle">Investigación interdisciplinaria en la intersección de la antropología biológica, tecnología y análisis de datos complejos</p>
  </div>
</div>

<div class="grid-container">
  <div class="grid-item">
    <div class="grid-header">Investigación</div>
    <div class="grid-content">
      <p>Estudio de <strong>sindemias</strong> mediante análisis de datos: interacciones entre COVID-19, enfermedades crónicas y factores socioeconómicos en Chile</p>
    </div>
  </div>
  
  <div class="grid-item">
    <div class="grid-header">Formación</div>
    <div class="grid-content">
      <p><strong>Magíster en Ciencia de Datos para la Innovación</strong><br>Universidad de Concepción (En curso)</p>
      <p><strong>Antropólogo Físico</strong><br>Universidad de Concepción</p>
    </div>
  </div>
  
  <div class="grid-item">
    <div class="grid-header">Liderazgo</div>
    <div class="grid-content">
      <p><strong>Presidente</strong> — SOCHIAB 2025-2026</p>
      <p><strong>Colaborador</strong> — Universidad de Concepción</p>
      <p><strong>Founder</strong> — ARIACH</p>
    </div>
  </div>
</div>

<div class="expertise-section">
  <h2 class="section-title">Áreas de Expertise</h2>
  <div class="tags-modern">
    <span class="tag">Antropología Biológica</span>
    <span class="tag">Ciencia de Datos</span>
    <span class="tag">Análisis Sindémico</span>
    <span class="tag">Salud Pública</span>
    <span class="tag">Machine Learning</span>
    <span class="tag">Metodologías Mixtas</span>
    <span class="tag">Investigación Interdisciplinaria</span>
  </div>
</div>

---

## Publicaciones Destacadas

{% assign recent_publications = site.publications | reverse | slice: 0, 3 %}
{% if recent_publications.size > 0 %}
<div class="publications-modern">
  {% for post in recent_publications %}
    <div class="publication-card">
      <h3 class="publication-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      {% if post.venue %}
        <p class="publication-venue">{{ post.venue }} — {{ post.date | date: "%Y" }}</p>
      {% endif %}
      <p class="publication-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
    </div>
  {% endfor %}
</div>
{% else %}
  <p class="empty-state">Las publicaciones aparecerán aquí próximamente</p>
{% endif %}

<div class="cta-center">
  <a href="/publications/" class="btn-modern btn-modern--primary">Ver Todas las Publicaciones →</a>
</div>

---

## Blog & Actualizaciones

{% assign recent_posts = site.posts | slice: 0, 2 %}
{% if recent_posts.size > 0 %}
<div class="blog-modern">
  {% for post in recent_posts %}
    <div class="blog-card">
      <h3 class="blog-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="blog-date">{{ post.date | date: "%d %B %Y" }}</p>
      <p class="blog-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
    </div>
  {% endfor %}
</div>
  
<div class="cta-center">
  <a href="/year-archive/" class="btn-modern btn-modern--secondary">Ver Todas las Entradas →</a>
</div>
{% else %}
  <p class="empty-state">Las entradas de blog aparecerán aquí próximamente</p>
{% endif %}
