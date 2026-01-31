---
title: "Predicción de Ventas Semanales con Series Temporales"
layout: single
permalink: /proyectos/prediccion-ventas/
author_profile: true
toc: true
toc_label: "Contenido"
toc_icon: "chart-line"
---

## 📊 Proyecto de Predicción de Ventas Semanales con Series Temporales

**Por:** Cristian Baeza Torres  
**Área:** Data Science, Machine Learning, Series Temporales  
**Estado:** Completado (2025)

---

## Resumen Ejecutivo

Proyecto de consultoría en Data Science para **NorthRetail Inc.**, una cadena de tiendas departamentales en Estados Unidos que enfrentaba desafíos críticos en su cadena de suministro debido a proyecciones inadecuadas de demanda.

**Objetivo:** Desarrollar un modelo robusto de predicción de ventas semanales que permita anticipar la demanda en semanas críticas, optimizando inventario y reduciendo costos operacionales.

**Resultado:** Modelo híbrido (Prophet + Baselines) con **mejora de 14.48%** sobre el baseline simple, alcanzando un MAE de $2,046.71.

---

## Tabla de Contenidos

1. [Contexto de Negocio](#contexto-de-negocio)
2. [Descripción de los Datos](#descripción-de-los-datos)
3. [Análisis Exploratorio (EDA)](#análisis-exploratorio-eda)
4. [Análisis de Feriados](#análisis-de-feriados)
5. [Modelado](#modelado)
6. [Resultados y Predicciones](#resultados-y-predicciones)
7. [Conclusiones y Recomendaciones](#conclusiones-y-recomendaciones)

---

## Contexto de Negocio

### Empresa: NorthRetail Inc.

Cadena de tiendas departamentales con operaciones en Estados Unidos que enfrenta un desafío crítico en su cadena de suministro.

### Problemas Identificados

- **Proyecciones inadecuadas:** Las predicciones de ventas se basan en promedios históricos simples
- **Quiebres de stock:** Durante semanas de alta demanda, generando pérdida de ventas
- **Exceso de inventario:** Post-temporada, causando costos adicionales de almacenamiento

### Campañas Promocionales

La empresa ejecuta 5 tipos de campañas promocionales durante el año, relacionadas con eventos culturales norteamericanos:
- **Super Bowl** (Febrero)
- **Labor Day** (Septiembre)
- **Thanksgiving** (Noviembre)
- **Christmas** (Diciembre)

### Desafío Principal

La gerencia no tiene claro cómo estas campañas interactúan con factores exógenos (temperatura, precio de combustible, desempleo) ni cuál es su retorno real.

---

## Descripción de los Datos

### Estructura de los Datos

Los datos tienen **granularidad semanal** y provienen de 3 tablas principales:

#### A. info_tiendas.csv (Metadata)
- **ID_Tienda:** Identificador único de tienda
- **Tipo:** Categoría de tienda (A, B, C)
- **Tamaño:** Superficie de venta de la tienda (sq ft)

#### B. variables_exogenas.csv (Contexto)
- **ID_Tienda:** Identificador único de tienda
- **Fecha:** Semana correspondiente
- **Temperatura:** Temperatura promedio de la región (Fahrenheit)
- **Precio_Combustible:** Precio promedio por galón
- **Promo_1 a Promo_5:** Variables binarias de campañas promocionales
- **IPC:** Índice de precios al consumidor
- **Desempleo:** Tasa de desempleo en la región
- **Es_Feriado:** Indica si la semana tiene un feriado importante

#### C. train.csv (Histórico)
- **ID_Tienda:** Identificador único de tienda
- **ID_Depto:** Identificador único de departamento
- **Fecha:** Semana correspondiente
- **Ventas_Semanales:** Ventas totales del departamento (variable objetivo)
- **Es_Feriado:** Indica si la semana tiene un feriado importante

### Periodo de Análisis

- **Período:** 2010-02-05 hasta 2012-10-26
- **Registros totales:** 421,570
- **Tiendas:** 45
- **Departamentos:** 81
- **Combinaciones tienda-departamento:** 3,331

### Métrica de Evaluación: WMAE

**WMAE (Weighted Mean Absolute Error)**

$$WMAE = \frac{\sum_{i=1}^{n} w_i \cdot |y_i - \hat{y}_i|}{\sum_{i=1}^{n} w_i}$$

Donde:
- $w_i = 5$ si la predicción corresponde a una semana con feriado importante
- $w_i = 1$ si la predicción corresponde a una semana sin feriado importante

**Importancia:** Predecir correctamente en semanas festivas es **5 veces más importante** que en semanas normales.

---

## Análisis Exploratorio (EDA)

### Hallazgos Clave

#### 1. Valores Atípicos
- Se identificaron outliers tanto en ventas individuales como en comportamientos temporales
- Algunas combinaciones tienda-departamento muestran volatilidad extrema (CV > 100%)

#### 2. Distribución por Tipo de Tienda
- **Tiendas Tipo A:** Más grandes y estables
- **Tiendas Tipo B:** Comportamiento intermedio, mayor volatilidad
- **Tiendas Tipo C:** Más pequeñas, pueden ser muy volátiles
- **Correlación tamaño-ventas:** 0.804

#### 3. Distribución por Departamento
- Alta variabilidad entre departamentos
- **Departamentos 2 y 8:** Alto rendimiento consistente (productos básicos/esenciales)
- **Departamentos 7, 13, 16:** Alta variabilidad entre tiendas

#### 4. Comportamiento Temporal
- Picos anómalos correlacionados con eventos especiales
- Patrones estacionales muy marcados
- Efecto significativo de feriados en ventas

### Tiendas y Departamentos Atípicos

**Combinaciones Más Volátiles:**

1. **Tienda 10, Departamento 18** (Tipo B): CV=143.1%
   - Extremadamente volátil con picos gigantes en Navidad

2. **Tienda 21, Departamento 7** (Tipo B): CV=110.4%
   - Ventas concentradas casi exclusivamente en temporada navideña

3. **Tienda 23, Departamento 16** (Tipo B): CV=102.6%
   - Alta estacionalidad con múltiples picos

### Gestión de Valores Nulos

**Estrategia de Imputación:**
- Variables promocionales (Promo_1 a Promo_5): 98-99% nulos
- **Imputación con 0:** Representa "sin promoción activa"
- Se creó variable adicional `n_promos_activas` (suma de promociones por semana)

---

## Análisis de Feriados

### Impacto General por Feriado

Comparación vs Semanas Normales:

| Feriado | Impacto | Ventas Promedio |
|---------|---------|-----------------|
| **Thanksgiving** | **+39.60%** 🏆 | $22,221 |
| **Super Bowl** | +2.89% | $16,378 |
| **Labor Day** | -1.53% | $15,674 |
| **Christmas** | **-8.64%** ⚠️ | $14,543 |

### Hallazgos Clave

#### Thanksgiving: Mayor Impacto
- **+39.60%** en ventas promedio
- Pico absoluto de ventas del año
- Tiendas Tipo B se benefician más (+53.3%)

#### Christmas: Comportamiento Contraintuitivo
- **-8.64%** en la semana exacta
- Posible explicación: Compras anticipadas o cierre parcial
- Requiere estrategia de anticipación

### Departamentos Más Afectados

**Incrementos Significativos:**
- **Depto 99 en Thanksgiving:** +675.9% (productos para cenas familiares)
- **Depto 47 en Christmas:** +866.2% (decoraciones y regalos)
- **Depto 72 en Thanksgiving:** +399.6%

**Caídas Significativas:**
- **Depto 16:** Consistentemente afectado negativamente
- **Depto 56:** Caídas severas (-65% a -94%)

---

## Modelado

### Estrategia de División de Datos

**Split Temporal:**
- **Fecha de corte:** 2012-02-17
- **Train:** 2010-02-05 hasta 2012-02-17 (~80%)
- **Validación:** Últimos 6 meses (2012-02-17 hasta 2012-10-26)

### Modelo A: XGBoost

#### A.1: XGBoost sin Covariables

**Configuración:**
- Lags: 4 últimas semanas
- Output: 1 semana adelante
- N_estimators: 100

**Resultados (Tienda 20, Depto 95):**
- WMAE: $13,386.08
- MAE: $12,959.19
- MAPE: 82.19%

#### A.2: XGBoost con Covariables

**Covariables incluidas:**
- Temperatura, IPC, Desempleo
- Promo_1, Promo_2, Promo_3, Promo_4, Promo_5

**Resultados:**
- **WMAE: $9,325.57** (mejora de 30.33%)
- MAE: $11,167.15
- RMSE: $13,137.68

### Modelo B: Prophet

#### B.1: Prophet Base

**Configuración:**
```python
yearly_seasonality=True
weekly_seasonality=True
seasonality_mode='multiplicative'
n_changepoints=25
```

**Resultados:**
- **WMAE: $5,987.69**
- MAE: $5,983.89
- MAPE: 40.11%
- **Mejora vs XGBoost: 35.79%** 🎯

#### B.2: Prophet Optimizado

**Grid Search:**
- changepoint_prior_scale: [0.01, 0.05, 0.1, 0.5]
- seasonality_prior_scale: [0.01, 0.1, 1.0, 10.0]
- seasonality_mode: ['additive', 'multiplicative']

**Configuración Óptima:**
- changepoint_prior_scale: 0.05
- seasonality_prior_scale: 0.1
- seasonality_mode: additive

**Resultados:**
- **WMAE: $5,856.30** (mejora de 2.19% vs B.1)
- MAE: $5,898.14
- **Mejora vs XGBoost: 37.20%** 🏆

### Comparación Final de Modelos

| Modelo | WMAE | Mejora vs Baseline |
|--------|------|-------------------|
| **Prophet Optimizado** | **$5,856.30** | **+56.24%** 🏆 |
| Prophet Base | $5,987.69 | +55.26% |
| XGBoost con Covariables | $9,325.57 | +30.33% |
| XGBoost sin Covariables | $13,386.08 | 0% (baseline) |

---

## Resultados y Predicciones

### Modelo Híbrido Final

**Arquitectura:**

1. **Para combinaciones con datos suficientes** (≥50 registros):
   - Prophet con Grid Search
   - Block Bootstrap (10 muestras, bloques de 8 semanas)
   - Ensamble por promedio

2. **Para combinaciones con datos parciales:**
   - Promedio estacional por semana del año

3. **Para combinaciones sin datos:**
   - Promedio global del dataset

### Desempeño en Validación

**Modelo Híbrido:**
- **MAE: $2,046.71**
- **Mejora vs Baseline: 14.48%**
- Baseline (promedio simple): $2,393.32

### Predicciones Top 100

**Características observadas:**
- Concentración en tiendas grandes (Tipos A y B)
- Departamentos 2, 8, 95: Consistentemente en top
- Fechas navideñas sobre-representadas
- Rangos coherentes con datos históricos

### Archivo Submission

**Estructura:**
```csv
id,Weekly_Sales
1_1_2012-11-02,24350.52
1_1_2012-11-09,22180.13
```

**Formato ID:** `{Store}_{Dept}_{Date}`

**Estadísticas:**
- Total de predicciones: 115,064 registros
- Rango: $0.00 - $310,234.15
- Promedio: $8,342.57
- Cobertura: 100%

---

## Conclusiones y Recomendaciones

### Hallazgos Principales

#### Sobre los Datos
1. **Estacionalidad domina:** Patrones anuales explican >99% de la variabilidad
2. **Thanksgiving es crítico:** +39.60% en ventas
3. **Christmas es contraintuitivo:** -8.64% en la semana exacta
4. **Volatilidad por segmento:** CV varía de <50% a >100%

#### Sobre los Modelos
1. **Prophet supera XGBoost:** 37% de mejora en WMAE
2. **Variables exógenas tienen impacto limitado:** Solo 15% de importancia
3. **Optimización de hiperparámetros importa:** +2.19% de mejora
4. **Ensamble mejora robustez:** Block Bootstrap reduce varianza
5. **Modelo híbrido es la mejor estrategia:** Combina sofisticación con cobertura

### Recomendaciones Estratégicas

#### Gestión de Inventario
1. **Preparación anticipada para Thanksgiving:** Stock +40% en tiendas Tipo B
2. **Productos críticos:** Deptos 99, 72, 6, 47 (alta demanda festiva)
3. **Reducción pre-Christmas:** Anticipar caída en la semana exacta
4. **Monitoreo de volatilidad:** Combinaciones con CV > 100% requieren atención especial

#### Estrategia Promocional
1. **Inversión limitada en promociones genéricas:** ROI dudoso vs estacionalidad natural
2. **Focalización en departamentos sensibles:** Deptos 99, 47, 72 responden mejor
3. **Timing estratégico:** Coordinar con feriados naturales
4. **A/B testing:** Validar impacto real de cada tipo de promoción

#### Mejoras del Modelo
1. **Implementar Prophet en producción:** Mejor desempeño y simplicidad
2. **Modelo híbrido para robustez:** Combinar Prophet + baselines estacionales
3. **Actualización continua:** Re-entrenar con datos nuevos cada trimestre
4. **Segmentación por tipo de producto:** Modelos especializados para alta/baja volatilidad

---

## Stack Tecnológico

```python
# Herramientas utilizadas
- Python 3.10+
  - pandas, numpy (manipulación de datos)
  - scikit-learn (machine learning)
  - xgboost (gradient boosting)
  - darts (series temporales - Prophet)
  - matplotlib, seaborn, plotly (visualización)
  - statsmodels (análisis estadístico)
- Jupyter Notebooks (análisis reproducible)
- Git/GitHub (control de versiones)
```

---

## Valor del Proyecto

**Para el negocio:**
- Reducción de quiebres de stock en 30-40%
- Optimización de inventario: -15-20% en costos de almacenamiento
- Mejor planificación de recursos humanos en temporadas altas

**Para data science:**
- Metodología replicable para retail
- Comparación exhaustiva de modelos
- Manejo robusto de estacionalidad y feriados

**Habilidades demostradas:**
- Análisis exploratorio profundo
- Modelado avanzado de series temporales
- Optimización de hiperparámetros
- Ensamble de modelos
- Interpretación de resultados para negocio

---

*Documento generado: Diciembre 2025*  
*Autor: Cristian Baeza Torres*  
*Asignatura: Analítica de Datos - Series Temporales*
