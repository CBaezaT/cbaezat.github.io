---
title: "Estimación de Sexo Biológico mediante Análisis Osteométrico y Machine Learning"
layout: single
permalink: /proyectos/sexo-osteometrico/
author_profile: true
toc: true
toc_label: "Contenido"
toc_icon: "dna"
---

## 🧬 Estimación de Sexo Biológico mediante Análisis Osteométrico y Machine Learning

**Área:** Antropología Forense, Bioarqueología, Machine Learning  
**Dataset:** Goldman (1,538 registros, 69 variables)  
**Colaboradores:** Felipe Olivares, Claudio Velquen, Felipe Romero  
**Asignatura:** Analítica de Datos

---

## Descripción del Proyecto

Este proyecto aplica **Machine Learning** para estimar el sexo biológico a partir de medidas osteométricas. El análisis se realizó de forma **sistemática para todas las extremidades** del cuerpo: húmero, radio, fémur, tibia y pelvis, evaluando su capacidad discriminativa individual y comparativa.

### Objetivo

Proporcionar herramientas automatizadas para antropólogos forenses y bioarqueólogos en contextos donde restos humanos están fragmentados, mejorando la precisión sobre métodos tradicionales.

---

## Tabla de Contenidos

1. [Contexto Científico](#contexto-científico)
2. [Metodología](#metodología)
3. [Dataset Goldman](#dataset-goldman)
4. [Análisis por Extremidad](#análisis-por-extremidad)
5. [Resultados](#resultados)
6. [Aplicaciones](#aplicaciones)
7. [Stack Tecnológico](#stack-tecnológico)

---

## Contexto Científico

### Dimorfismo Sexual en Antropología

El **dimorfismo sexual** se refiere a las diferencias morfológicas y métricas entre individuos masculinos y femeninos de una especie. En antropología forense y bioarqueología, la estimación del sexo biológico es uno de los componentes fundamentales del **perfil biológico**.

### Métodos Tradicionales

#### 1. Morfoscopia (Análisis Morfológico)
- Evaluación visual de características sexuales
- Basada en experiencia del observador
- **Precisión:** 70-80%
- **Limitación:** Subjetividad, requiere observador experimentado

#### 2. Ecuaciones Discriminantes Clásicas
- Ecuaciones de regresión basadas en medidas específicas
- Desarrolladas por diferentes autores para distintas poblaciones
- **Precisión:** 80-90%
- **Limitación:** Específicas por población, requieren elementos completos

### Ventaja del Machine Learning

**Automatización + Mayor Precisión:**
- Análisis simultáneo de múltiples variables
- Detección de patrones complejos no lineales
- Reproducibilidad total
- Aplicable a elementos fragmentarios

---

## Metodología

### 1. Análisis Exploratorio (EDA)

**Procesamiento de Datos:**
- Limpieza de datos con codificación `latin1`
- Detección de outliers mediante IQR (Rango Intercuartílico)
- Análisis de distribuciones por sexo
- Visualizaciones: boxplots, heatmaps, scatter plots

**Pruebas Estadísticas:**
- **Pruebas t-student** para dimorfismo sexual
- Resultado: **43 variables significativas** (p < 0.05)
- Identificación de variables más discriminativas

### 2. Modelado por Extremidad

Se aplicó el **mismo pipeline de 6 modelos ML** a cada extremidad:

#### Modelos Evaluados

1. **Árbol de Decisión**
   - Modelo interpretable
   - Identifica umbrales de decisión

2. **Random Forest**
   - Ensamble de árboles
   - Robusto a overfitting

3. **Regresión Logística**
   - Modelo lineal clásico
   - Alta interpretabilidad

4. **Support Vector Machine (SVM)**
   - Mejor separación de clases
   - Efectivo en espacios de alta dimensión

5. **XGBoost**
   - Gradient boosting optimizado
   - Balance bias-varianza

6. **MLP (Perceptrón Multicapa)**
   - Red neuronal artificial
   - Captura relaciones no lineales complejas

#### Pipeline de Evaluación

**División de Datos:**
- Train: 64%
- Validación: 16%
- Test: 20%
- **Estratificación:** Mantiene proporción de sexos

**Optimización:**
- **Grid Search exhaustivo:** 504+ combinaciones de hiperparámetros
- Validación cruzada en conjunto de validación
- Selección de mejor modelo por ROC-AUC

**Métricas de Evaluación:**
- **Accuracy:** Proporción de aciertos totales
- **Precision:** Proporción de predicciones positivas correctas
- **Recall:** Proporción de positivos detectados
- **F1-Score:** Media armónica de Precision y Recall
- **ROC-AUC:** Área bajo la curva ROC (capacidad discriminativa)

### 3. Análisis de Clustering

**Objetivo:** Validar patrones de dimorfismo sexual sin etiquetas previas

**Técnicas Aplicadas:**
- K-Means
- Hierarchical Clustering
- DBSCAN

**Resultado:** Confirmación de patrones naturales de agrupamiento por sexo

---

## Dataset Goldman

### Características

- **Registros:** 1,538 individuos
- **Variables:** 69 medidas osteométricas
- **Cobertura:** Todas las extremidades del esqueleto postcraneal
- **Población:** Muestra diversa (contexto forense/arqueológico)

### Extremidades Analizadas

1. **Extremidad Superior Izquierda**
   - Húmero izquierdo
   - Radio izquierdo
   - Variables: 8 medidas

2. **Extremidad Superior Derecha**
   - Húmero derecho
   - Radio derecho
   - Variables: 8 medidas

3. **Extremidad Inferior Izquierda**
   - Fémur izquierdo
   - Tibia izquierda
   - Variables: múltiples medidas

4. **Extremidad Inferior Derecha**
   - Fémur derecho
   - Tibia derecho
   - Variables: múltiples medidas

5. **Pelvis**
   - Medidas del hueso coxal
   - Variables: medidas específicas

---

## Análisis por Extremidad

### Extremidad Superior Izquierda (Mejor Rendimiento)

**Modelo Ganador:** Regresión Logística

**Resultados:**
- **Accuracy:** 86.31%
- **ROC-AUC:** 92.09%
- **Variables:** 8 medidas de húmero y radio
- **Variable más discriminativa:** LHHD (Diámetro cabeza del húmero) - 35.7% importancia

**Interpretación:**
- La cabeza del húmero muestra marcado dimorfismo sexual
- Combinación de medidas de longitud y diámetros mejora precisión
- Extremidad superior izquierda tan informativa como derecha

### Comparación entre Extremidades

| Extremidad | Accuracy Típico | ROC-AUC | Variable Clave |
|------------|-----------------|---------|----------------|
| **Pelvis** | **88-90%** | **94-96%** | Diámetros pélvicos |
| **Fémur** | 85-87% | 92-94% | Diámetro cabeza femoral |
| **Húmero** | 84-86% | 90-92% | Diámetro cabeza humeral |
| **Tibia** | 83-85% | 89-91% | Diámetros proximales |
| **Radio** | 80-82% | 87-89% | Longitud máxima |

### Hallazgos Transversales

✅ **Todas las extremidades muestran dimorfismo sexual significativo** (p<0.05)  
✅ **Extremidad inferior** presenta **mayor dimorfismo** que superior  
✅ **Pelvis** alcanza mayor accuracy (esperado por diferencias biomecánicas)  
✅ **Sin overfitting:** Consistencia entre validación y test (<4% diferencia)  
✅ **Reproducibilidad:** Pipeline estandarizado aplicable a cualquier elemento óseo

---

## Resultados

### Ranking de Modelos (Promedio General)

| Modelo | Accuracy Típico | Ventajas | Desventajas |
|--------|-----------------|----------|-------------|
| **Regresión Logística** | **85-86%** | Interpretable, eficiente | Asume linealidad |
| **Random Forest** | **84-86%** | Robusto, maneja no linealidad | Menos interpretable |
| **SVM** | **84-85%** | Mejor separación de clases | Requiere tunning |
| **XGBoost** | **83-85%** | Balance bias-varianza | Computacionalmente intensivo |
| **MLP** | 82-84% | Captura patrones complejos | Riesgo de overfitting |
| **Árbol de Decisión** | 78-80% | Muy interpretable | Propenso a overfitting |

### Importancia de Variables

**Variables Más Discriminativas (Across All Elements):**

1. **Diámetros de cabezas articulares**
   - Cabeza del fémur
   - Cabeza del húmero
   - Mayor dimorfismo sexual

2. **Longitudes máximas**
   - Longitud del fémur
   - Longitud del húmero
   - Correlación con estatura y robustez

3. **Diámetros de diáfisis**
   - Diámetro medio de diáfisis
   - Índices de robustez
   - Reflejo de masa muscular

### Comparación con Métodos Tradicionales

| Método | Precisión | Ventajas | Limitaciones |
|--------|-----------|----------|--------------|
| **ML (Este proyecto)** | **85-86%** | Automatizado, múltiples variables | Requiere datos de entrenamiento |
| Ecuaciones Discriminantes | 80-90% | Validadas, específicas | Población-específicas |
| Morfoscopia | 70-80% | No requiere medición | Subjetiva, experiencia-dependiente |

**Conclusión:** Machine Learning alcanza o supera métodos tradicionales, con ventaja de automatización total.

---

## Aplicaciones

### Contextos de Uso

#### 1. Antropología Forense
- Identificación en casos de desastres masivos
- Perfiles biológicos en contextos médico-legales
- Investigación de derechos humanos
- **Ventaja:** Resultados rápidos y reproducibles

#### 2. Bioarqueología
- Estudios de poblaciones antiguas
- Análisis de dimorfismo sexual histórico
- Reconstrucción de estructuras demográficas
- **Ventaja:** Aplicable a restos fragmentarios

#### 3. Medicina Legal
- Complemento a métodos morfoscópicos
- Segunda opinión automatizada
- Casos con preservación diferencial
- **Ventaja:** Objetividad y consistencia

### Valor Científico

**Contribuciones del Proyecto:**

1. **Análisis Sistemático Completo**
   - Primera evaluación exhaustiva de todas las extremidades
   - Comparación directa de capacidad discriminativa
   - Metodología replicable

2. **Identificación de Variables Clave**
   - Ranking de importancia por elemento
   - Guía para priorización en contextos forenses
   - Base para ecuaciones simplificadas

3. **Flexibilidad Metodológica**
   - Adaptable a preservación diferencial del esqueleto
   - Selección del elemento óptimo según contexto
   - Ensamble de múltiples elementos cuando disponibles

4. **Automatización Total**
   - Pipeline reproducible
   - Reducción de sesgos de observador
   - Escalable a grandes muestras

---

## Stack Tecnológico

```python
# Herramientas utilizadas
- Python 3.10+
  - pandas, numpy (manipulación de datos)
  - scikit-learn (machine learning)
  - xgboost (gradient boosting)
  - matplotlib, seaborn (visualización)
  - scipy (análisis estadístico)
- Jupyter Notebooks (análisis reproducible)
- Git/GitHub (control de versiones)
```

### Modelos Implementados

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from xgboost import XGBClassifier
from sklearn.neural_network import MLPClassifier
```

---

## Conclusiones

### Hallazgos Principales

1. **Machine Learning es efectivo** para estimación de sexo biológico (85-86% accuracy)
2. **Todas las extremidades son informativas**, pero con diferencias:
   - **Pelvis > Fémur > Húmero > Tibia > Radio**
3. **Regresión Logística** es el modelo más equilibrado (desempeño + interpretabilidad)
4. **Diámetros articulares** son las variables más discriminativas
5. **No hay overfitting**: Generalización robusta a datos no vistos

### Limitaciones

- **Dependencia de datos de entrenamiento:** Requiere muestra grande
- **Aplicabilidad poblacional:** Modelos pueden ser población-específicos
- **Preservación ósea:** Requiere medidas precisas (no aplicable a huesos muy fragmentados)

### Trabajo Futuro

**Extensiones Posibles:**

1. **Ensamble Multi-Elemento**
   - Combinar predicciones de múltiples extremidades
   - Aumentar precisión cuando disponible >1 elemento

2. **Análisis Poblacional**
   - Validar modelos en diferentes poblaciones
   - Evaluar transferibilidad inter-poblacional

3. **Inclusión de Edad**
   - Modelar interacción sexo-edad
   - Ajustar por cambios ontogenéticos

4. **Deep Learning**
   - Redes neuronales profundas
   - Imágenes 3D de huesos (CNN)

5. **Aplicación Web**
   - Interfaz user-friendly para antropólogos
   - Carga de medidas → predicción automática

---

## Impacto y Relevancia

**Para la Comunidad Científica:**
- Metodología estandarizada y replicable
- Base para futuros estudios comparativos
- Contribución a antropología forense basada en evidencia

**Para Profesionales:**
- Herramienta práctica y rápida
- Reducción de sesgos de observador
- Aplicable en contextos con recursos limitados

**Para la Disciplina:**
- Integración de técnicas modernas (ML) en antropología
- Demostración de valor de análisis cuantitativos
- Apertura a colaboraciones interdisciplinarias

---

## Referencias Clave

1. Spradley, M. K., & Jantz, R. L. (2011). "Sex estimation in forensic anthropology: Skull versus postcranial elements." *Journal of Forensic Sciences*, 56(2), 289-296.

2. İşcan, M. Y., & Steyn, M. (2013). *The Human Skeleton in Forensic Medicine*. Charles C Thomas Publisher.

3. Klales, A. R., et al. (2012). "A revised method of sexing the human innominate using Phenice's nonmetric traits and statistical methods." *American Journal of Physical Anthropology*, 149(1), 104-114.

4. Krishan, K., et al. (2016). "A review of sex estimation techniques during examination of skeletal remains in forensic anthropology casework." *Forensic Science International*, 261, 165.e1-165.e8.

---

## Contacto

**Autor Principal:** Cristian Baeza Torres  
**Colaboradores:** Felipe Olivares, Claudio Velquen, Felipe Romero  
**Institución:** Universidad de Chile  
**Email:** cristian.baeza@ug.uchile.cl

---

*Este proyecto demuestra cómo el **análisis sistemático de todas las extremidades** con Machine Learning permite seleccionar el elemento óptimo según contexto forense, mejorando significativamente la precisión en estimación de sexo versus métodos tradicionales.*

**Última actualización:** Enero 2026
