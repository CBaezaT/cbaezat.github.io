---
layout: single
classes: wide
permalink: /
title: "Sobre mí"
excerpt: "Antropólogo Físico especializado en Ciencia de Datos para la Innovación"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Soy **Antropólogo Físico**, estudiante del **Magíster en Ciencia de Datos para la Innovación**.  
 Mi experiencia abarca la colaboración en proyectos de investigación, metodologías cuantitativas y mixtas, utilizando herramientas de ciencia de datos en diferentes contextos y problemáticas.  
  **Me interesa la intersección entre la antropología y la tecnología, sobre todo en trabajos interdisciplinarios que aborden problemáticas complejas y contemporáneas.**   

## 🔬 Investigación Actual

Mi investigación se centra en el estudio de **sindemias**, particularmente en el análisis de las interacciones complejas entre COVID-19, enfermedades crónicas no transmisibles y factores socioeconómicos en Chile.

## 🎓 Formación Académica

- **Magíster en Ciencia de Datos para la Innovación** - Universidad de Concepción (En curso)
- **Antropólogo Físico** - Universidad de Concepción

## 💼 Roles Actuales

- **Presidente** - Sociedad Chilena de Antropología Biológica (SOCHIAB) 2025-2026
- **Colaborador** - Carrera de Antropología, Universidad de Concepción  
- **Founder** - ARIACH (Academia de Robótica e Inteligencia Artificial)

---

## 📚 Publicaciones Recientes

{% assign recent_publications = site.publications | reverse | slice: 0, 3 %}
{% if recent_publications.size > 0 %}
  {% for post in recent_publications %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  <p><em>Las publicaciones aparecerán aquí próximamente.</em></p>
{% endif %}

<div class="text-center">
  <a href="/publications/" class="btn btn--primary">Ver todas las publicaciones</a>
</div>

---

## 📝 Entradas de Blog Recientes

{% assign recent_posts = site.posts | slice: 0, 2 %}
{% if recent_posts.size > 0 %}
  {% for post in recent_posts %}
    {% include archive-single.html %}
  {% endfor %}
  
  <div class="text-center">
    <a href="/year-archive/" class="btn btn--inverse">Ver todas las entradas</a>
  </div>
{% else %}
  <p><em>Las entradas de blog aparecerán aquí próximamente.</em></p>
{% endif %}
