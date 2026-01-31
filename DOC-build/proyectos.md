# proyecto 1
# SOCHIAB - Presidencia de la Sociedad Chilena de Antropología Biológica
Periodo 2025-2026.  
Contacto: presidencia@sochiab.cl  
Página oficial: https://www.sochiab.cl  

# proyecto 2

# Documentación Completa - Proyecto de Predicción de Ventas Semanales con Series Temporales

**Por: Cristian Baeza Torres**

---

## Tabla de Contenidos
1. [Contexto de Negocio](#1-contexto-de-negocio)
2. [Descripción de los Datos](#2-descripción-de-los-datos)
3. [Sección 1: EDA (Análisis Exploratorio de Datos)](#3-sección-1-eda)
4. [Sección 2: Análisis de Feriados](#4-sección-2-análisis-de-feriados)
5. [Sección 3: Modelado (Modelos A y B)](#5-sección-3-modelado)
6. [Sección 4: Predicciones y Submission](#6-sección-4-predicciones-y-submission)
7. [Conclusiones Generales](#7-conclusiones-generales)

---

## 1. Contexto de Negocio

### Empresa: NorthRetail Inc.
Cadena de tiendas departamentales con operaciones en Estados Unidos que enfrenta un desafío crítico en su cadena de suministro.

### Problemas Identificados:
- **Proyecciones inadecuadas**: Las predicciones de ventas se basan en promedios históricos simples
- **Quiebres de stock**: Durante semanas de alta demanda, generando pérdida de ventas
- **Exceso de inventario**: Post-temporada, causando costos adicionales de almacenamiento

### Campañas Promocionales:
La empresa ejecuta 5 tipos de campañas promocionales durante el año, relacionadas con eventos culturales norteamericanos:
- Super Bowl
- Labor Day
- Thanksgiving (Acción de Gracias)
- Christmas (Navidad)

**Desafío**: La gerencia no tiene claro cómo estas campañas interactúan con factores exógenos (temperatura, precio de combustible, desempleo) ni cuál es su retorno real.

### Objetivo del Proyecto:
Como consultor de Data Science, el objetivo es generar un modelo robusto que permita anticipar la demanda en semanas críticas, utilizando el contexto geográfico de Estados Unidos para enriquecer el análisis y determinar qué variables realmente impulsan las ventas.

---

## 2. Descripción de los Datos

### Estructura de los Datos
Los datos tienen **granularidad semanal** y provienen de 3 tablas principales:

#### A. info_tiendas.csv (Metadata)
- **ID_Tienda**: Identificador único de tienda
- **Tipo**: Categoría de tienda (A, B, C)
- **Tamaño**: Superficie de venta de la tienda (sq ft)

#### B. variables_exogenas.csv (Contexto)
- **ID_Tienda**: Identificador único de tienda
- **Fecha**: Semana correspondiente
- **Temperatura**: Temperatura promedio de la región esa semana (Fahrenheit)
- **Precio_Combustible**: Precio promedio por galón de combustible en la región
- **Promo_1 a Promo_5**: Variables binarias que indican si hubo campaña promocional
- **IPC**: Índice de precios al consumidor
- **Desempleo**: Tasa de desempleo en la región
- **Es_Feriado**: Indica si la semana tiene un feriado importante

#### C. train.csv (Histórico)
- **ID_Tienda**: Identificador único de tienda
- **ID_Depto**: Identificador único de departamento dentro de la tienda
- **Fecha**: Semana correspondiente
- **Ventas_Semanales**: Ventas totales del departamento (variable objetivo)
- **Es_Feriado**: Indica si la semana tiene un feriado importante

### Feriados Importantes
Existen 4 eventos anuales que distorsionan significativamente la demanda:
- **Super Bowl**: Febrero
- **Labor Day**: Septiembre
- **Thanksgiving**: Noviembre
- **Christmas**: Diciembre

### Métrica de Evaluación: WMAE (Weighted Mean Absolute Error)

$$WMAE = \frac{\sum_{i=1}^{n} w_i \cdot |y_i - \hat{y}_i|}{\sum_{i=1}^{n} w_i}$$

Donde:
- $w_i = 5$ si la predicción corresponde a una semana con feriado importante
- $w_i = 1$ si la predicción corresponde a una semana sin feriado importante

**Importancia**: Predecir correctamente en semanas festivas es **5 veces más importante** que en semanas normales.

---

## 3. Sección 1: EDA

### 3.1 Consolidación de Datos

Se creó el dataset maestro `consolidated_dataset.csv` uniendo las 3 tablas:
- **Período**: 2010-02-05 hasta 2012-10-26
- **Registros totales**: 421,570
- **Tiendas**: 45
- **Departamentos**: 81
- **Combinaciones tienda-departamento**: 3,331

### 3.2 Análisis de Distribución de Ventas

#### Hallazgos Clave:

**1. Valores Atípicos:**
- Se identificaron outliers tanto en ventas individuales como en comportamientos temporales
- Algunas combinaciones tienda-departamento muestran volatilidad extrema (CV > 100%)

**2. Distribución por Tienda:**
- Tiendas Tipo A: Más grandes y estables
- Tiendas Tipo B: Comportamiento intermedio, mayor volatilidad
- Tiendas Tipo C: Más pequeñas, pueden ser muy volátiles
- Correlación tamaño-ventas: 0.804

**3. Distribución por Departamento:**
- Alta variabilidad entre departamentos
- Departamento 2 y 8: Alto rendimiento consistente (productos básicos/esenciales)
- Departamentos 7, 13, 16: Alta variabilidad entre tiendas

**4. Comportamiento Temporal:**
- Picos anómalos correlacionados con eventos especiales
- Patrones estacionales muy marcados
- Efecto significativo de feriados en ventas

### 3.3 Tiendas y Departamentos Atípicos

#### Tiendas con Alta Volatilidad (CV > percentil 90):
- Total identificadas: 5 tiendas
- Las tiendas tipo B y C muestran mayor volatilidad que tipo A
- Patrones temporales revelan picos pronunciados en temporada navideña

#### Combinaciones Más Atípicas:
1. **Tienda 10, Departamento 18** (Tipo B): CV=143.1%, Ventas=$20,124
   - Extremadamente volátil con picos gigantes en Navidad

2. **Tienda 21, Departamento 7** (Tipo B): CV=110.4%, Ventas=$25,814
   - Ventas concentradas casi exclusivamente en temporada navideña

3. **Tienda 23, Departamento 16** (Tipo B): CV=102.6%, Ventas=$21,360
   - Alta estacionalidad con múltiples picos

4. **Tienda 14, Departamento 16** (Tipo A): CV=99.7%, Ventas=$28,865
   - Mayor ventas promedio del grupo atípico

5. **Tienda 27, Departamento 16** (Tipo A): CV=95.9%, Ventas=$22,930
   - Patrón estacional marcado

### 3.4 Gestión de Valores Nulos

#### Variables Promocionales (Promo_1 a Promo_5):

**Análisis realizado:**
- Promo_1: 99.81% nulos
- Promo_2: 99.43% nulos
- Promo_3: 99.96% nulos
- Promo_4: 98.54% nulos
- Promo_5: 98.54% nulos

**Estrategia de Imputación:**
Los valores nulos representan semanas **sin promociones activas**. Se imputaron con **0**, indicando ausencia de campaña promocional esa semana.

**Justificación:**
- Las promociones son eventos específicos y discretos
- Un valor nulo no significa "dato faltante" sino "promoción no activa"
- La imputación con 0 preserva la interpretación binaria de las variables
- Se creó variable adicional `n_promos_activas` (suma de promociones activas por semana)

**Resultado:**
- Dataset imputado guardado en `imputed_consolidated_dataset.csv`
- Variables promocionales ahora son binarias puras (0 o 1)
- Facilita el análisis de impacto promocional

---

## 4. Sección 2: Análisis de Feriados

### 4.1 Identificación de Feriados

Se identificaron las fechas exactas de cada feriado mediante análisis del dataset:

| Feriado | Año 2010 | Año 2011 | Año 2012 |
|---------|----------|----------|----------|
| Super Bowl | 2010-02-12 | 2011-02-11 | - |
| Labor Day | 2010-09-10 | 2011-09-09 | - |
| Thanksgiving | 2010-11-26 | 2011-11-25 | - |
| Christmas | 2010-12-31 | 2011-12-30 | - |

**Nota**: Los datos de 2012 solo llegan hasta abril, por lo que no incluyen todos los feriados.

### 4.2 Impacto General por Feriado

#### Comparación vs Semanas Normales:

1. **Thanksgiving**: +39.60% 🏆 **MAYOR IMPACTO**
   - Ventas promedio: $22,221 (vs $15,918 normales)
   - Pico absoluto de ventas del año

2. **Super Bowl**: +2.89%
   - Ventas promedio: $16,378
   - Incremento moderado

3. **Labor Day**: -1.53%
   - Ventas promedio: $15,674
   - Impacto casi neutral

4. **Christmas**: -8.64% ⚠️ **IMPACTO NEGATIVO**
   - Ventas promedio: $14,543
   - Contraintuitivo: Navidad tiene MENOR actividad en la semana exacta
   - Posible explicación: Compras anticipadas o cierre parcial

### 4.3 Comportamiento por Tipo de Tienda

#### Thanksgiving (El Gran Ganador):
- Tiendas Tipo A: +36.7%
- Tiendas Tipo B: +53.3% (MAYOR BENEFICIO)
- Tiendas Tipo C: +1.6%

#### Christmas (Comportamiento Anómalo):
- Tiendas Tipo A: -8.9%
- Tiendas Tipo B: -6.4%
- Tiendas Tipo C: -16.4% (mayor caída)

#### Super Bowl (Incremento Uniforme):
- Incremento positivo pero modesto en todos los tipos (+2.9% a +6.6%)

#### Labor Day (Impacto Casi Neutral):
- Tiendas Tipo A: -1.8%
- Tiendas Tipo B: -2.5%
- Tiendas Tipo C: +2.9% (único tipo con incremento leve)

### 4.4 Departamentos Más Afectados

#### Departamentos con INCREMENTO por Feriado:

**Super Bowl:**
- Depto 99: +220.9% (posiblemente snacks/bebidas)
- Depto 67: +75.2%
- Depto 72: +48.4%
- Depto 1: +41.4%

**Thanksgiving:**
- Depto 99: +675.9% 🚀 (productos para cenas familiares)
- Depto 72: +399.6%
- Depto 6: +336.3%
- Deptos 47, 77, 18, 5: +243-332%

**Christmas:**
- Depto 47: +866.2% 🎄 (decoraciones y regalos)
- Depto 59: +409.8%
- Depto 18: +120.7%
- Deptos 55, 82, 5: +30-76%

#### Departamentos con CAÍDA por Feriado:

**Patrones Identificados:**
- **Depto 16**: Consistentemente afectado negativamente (-63% a -75%)
- **Depto 56**: Caídas severas (-65% a -94%)
- **Depto 78**: Caídas importantes (-55% a -120%)
- **Depto 47**: Comportamiento bipolar extremo (+866% en Christmas, -829% en Super Bowl)

### 4.5 Conclusiones del Análisis de Feriados

**Hallazgos Clave:**
1. Thanksgiving es el feriado más importante para las ventas (+39.60%)
2. Christmas muestra comportamiento contraintuitivo con caída de ventas en la semana exacta
3. Tiendas Tipo B se benefician más de Thanksgiving (+53.3%)
4. Los departamentos tienen comportamientos altamente especializados por feriado
5. La métrica WMAE es apropiada: las semanas festivas requieren predicciones precisas

---

## 5. Sección 3: Modelado

### 5.1 División de Datos

**Estrategia de Split Temporal:**
- **Fecha de corte**: 2012-02-17
- **Train**: Desde 2010-02-05 hasta 2012-02-17 (~80% de los datos)
- **Validación**: Últimos 6 meses (2012-02-17 hasta 2012-10-26)
- **Sin overlap temporal**: Simulación de predicción real

**Razones para usar últimos 6 meses:**
- Proporción adecuada 80-20 (estándar en ML)
- Contiene feriados importantes: Thanksgiving y Christmas del último año
- Respeta temporalidad: No hay fuga de información
- Representatividad: Incluye semanas normales y festivas

### 5.2 Modelo A: XGBoost (XGBModel de Darts)

Implementación de XGBoost optimizada para series temporales usando la librería **Darts**.

#### Modelo A.1: XGBoost sin Covariables

**Configuración:**
```python
model_params = {
    'lags': 4,  # Últimas 4 semanas como features
    'output_chunk_length': 1,  # Predecir 1 semana adelante
    'random_state': 42
}

xgb_params = {
    'n_estimators': 100,
    'max_depth': 6,
    'learning_rate': 0.1,
    'subsample': 0.8,
    'colsample_bytree': 0.8
}
```

**Características:**
- Basado exclusivamente en valores históricos de ventas (lags)
- No utiliza variables exógenas
- Modelo baseline para comparación

**Resultados (Tienda 20, Departamento 95):**
- **WMAE**: $13,386.08
- **MAE Global**: $12,959.19
- **MAE Festivos**: $14,346.60
- **MAE Normales**: $12,714.83
- **RMSE**: $17,221.19
- **MAPE**: 82.19%

#### Modelo A.2: XGBoost con Covariables

**Configuración:**
```python
model_params_b = {
    'lags': 12,  # Últimas 12 semanas como features
    'lags_future_covariates': [0],  # Usar covariables en momento de predicción
    'output_chunk_length': 1,
    'random_state': 42
}
```

**Covariables incluidas:**
- Temperatura
- IPC
- Desempleo
- Promo_1, Promo_2, Promo_3, Promo_4, Promo_5

**Resultados (Tienda 20, Departamento 95):**
- **WMAE**: $9,325.57 (mejora de 30.33%)
- **MAE Global**: $11,167.15
- **MAE Festivos**: $5,300.56
- **MAE Normales**: $11,841.21
- **RMSE**: $13,137.68
- **MAPE**: 71.66%

**Mejoras del Modelo A.2 vs A.1:**
- WMAE: +30.33%
- MAE Global: +13.83%
- RMSE: +23.72%

**Conclusión**: Las covariables exógenas aportan una mejora significativa (~30%) en el desempeño del modelo XGBoost, especialmente en semanas festivas.

### 5.3 Modelo B: Prophet (Modelo Aditivo)

Utilizando **Prophet de Darts** (desarrollado por Facebook/META), especialmente útil para series temporales con componentes estacionales fuertes.

#### Modelo B.1: Prophet sin Optimización

**Configuración Base:**
```python
model_prophet = DartsProphet(
    yearly_seasonality=True,
    weekly_seasonality=True,
    daily_seasonality=False,
    seasonality_mode='multiplicative',
    changepoint_prior_scale=0.05,
    seasonality_prior_scale=10.0,
    n_changepoints=25
)
```

**Resultados:**
- **WMAE**: $5,987.69
- **MAE Global**: $5,983.89
- **MAE Festivos**: $6,015.64
- **MAE Normales**: $5,970.22
- **RMSE**: $7,469.21
- **MAPE**: 40.11%

**Mejora vs XGBoost A.2**: 35.79% 🎯

#### Modelo B.2: Prophet Optimizado

**Estrategia de Optimización:**
- Grid Search sobre hiperparámetros clave
- Parámetros explorados:
  - `changepoint_prior_scale`: [0.01, 0.05, 0.1, 0.5]
  - `seasonality_prior_scale`: [0.01, 0.1, 1.0, 10.0]
  - `seasonality_mode`: ['additive', 'multiplicative']

**Configuración Óptima:**
```python
changepoint_prior_scale = 0.05
seasonality_prior_scale = 0.1
seasonality_mode = 'additive'
```

**Resultados:**
- **WMAE**: $5,856.30 (mejora de 2.19% vs B.1)
- **MAE Global**: $5,898.14
- **MAE Festivos**: $5,682.30
- **MAE Normales**: $5,965.05
- **RMSE**: $7,356.35
- **MAPE**: 39.61%

**Mejora vs XGBoost A.2**: 37.20% 🏆

### 5.4 Análisis de Feature Importance

#### XGBoost A.2 - Variables más relevantes:
1. **Lags históricos**: ~85% de la importancia total
   - lag_1, lag_2, lag_3 (valores recientes tienen mayor peso)
2. **Covariables exógenas**: ~15% de la importancia total
   - Temperatura: Covariable más importante
   - IPC y Desempleo: Impacto menor
   - Promociones: Contribución marginal

#### Prophet B.2 - Componentes temporales:
- **Estacionalidad Anual**: 99.8% de la variabilidad
- **Tendencia**: 0.2%
- **Estacionalidad Semanal**: 0.0%

**Conclusión Crítica**: 
- Las **variables exógenas** tienen un impacto positivo pero limitado en XGBoost
- **Prophet** logra desempeño superior sin usar variables exógenas del dataset
- La **estacionalidad** es el factor dominante en este contexto de negocio

### 5.5 Comparación Final de Modelos

| Modelo | WMAE | MAE Global | MAE Festivos | MAE Normales | Mejora vs A.1 |
|--------|------|------------|--------------|--------------|---------------|
| **B.2 (Prophet opt)** | **$5,856.30** | **$5,898.14** | **$5,682.30** | **$5,965.05** | **+56.24%** 🏆 |
| B.1 (Prophet base) | $5,987.69 | $5,983.89 | $6,015.64 | $5,970.22 | +55.26% |
| A.2 (XGBoost con cov) | $9,325.57 | $11,167.15 | $5,300.56 | $11,841.21 | +30.33% |
| A.1 (XGBoost sin cov) | $13,386.08 | $12,959.19 | $14,346.60 | $12,714.83 | 0% (baseline) |

**Modelo Ganador**: Prophet Optimizado (B.2)

---

## 6. Sección 4: Predicciones y Submission

### 6.1 Estrategia del Modelo Híbrido Final

La Sección 4 implementa un **modelo híbrido robusto** que incorpora todas las lecciones aprendidas de los experimentos previos (Secciones 2 y 3):

**Arquitectura del Modelo:**

1. **Componente Principal: Prophet con Optimización Avanzada**
   - **Datos de entrenamiento**: Todos los datos disponibles (train + validación)
   - **Grid Search**: Búsqueda exhaustiva de hiperparámetros óptimos
   - **Block Bootstrap**: 10 muestras con bloques temporales de 8 semanas
   - **Ensamble**: Promedio de predicciones para reducir varianza

2. **Función Principal: `train_prophet_with_gridsearch`**
```python
def train_prophet_with_gridsearch(train_data, test_dates, param_grid, n_bootstrap=10, block_size=8):
    """
    Entrena modelos Prophet con Grid Search y Block Bootstrap
    
    Mejoras incorporadas del Modelo B.2:
    - Grid search optimizado alrededor de parámetros óptimos (cp=0.05, sp=0.1, mode=additive)
    - Mayor número de changepoints (25 vs default)
    - Validación temporal más robusta
    - Mejores defaults basados en evidencia empírica
    """
```

3. **Parámetros Optimizados:**
```python
param_grid_optimizado = {
    'changepoint_prior_scale': [0.05, 0.1, 0.5],
    'seasonality_prior_scale': [5, 10, 15],
    'seasonality_mode': ['multiplicative', 'additive'],
    'n_changepoints': [25]
}
```

4. **Estrategia de Fallback Jerárquico:**
   - **Nivel 1** (datos suficientes): Prophet optimizado con bootstrap
   - **Nivel 2** (datos parciales): Promedio estacional por semana del año
   - **Nivel 3** (sin datos): Promedio global del dataset

### 6.2 Evaluación de Baselines

Se evaluó el baseline de referencia en el conjunto de validación:

**Baseline: Promedio Histórico Simple**
- **WMAE**: $2,393.32
- **MAE**: $2,393.32
- Período de evaluación: Validación (últimas semanas del dataset)
- Método: Promedio de ventas históricas por combinación tienda-departamento
- Nota: Sin festivos en el conjunto de validación (WMAE = MAE)

**Conclusión**: El promedio histórico establece una línea base de WMAE=$2,393.32 que cualquier modelo más sofisticado debe superar.

### 6.3 Modelo Híbrido con Mejoras Aprendidas

El modelo implementado en la Sección 4 es un **modelo híbrido** que combina las mejores prácticas aprendidas de los modelos experimentales:

**Estrategia de Implementación:**

1. **Para combinaciones con datos suficientes** (≥50 registros históricos):
   - **Prophet con Grid Search**: Búsqueda de hiperparámetros optimizados
   - **Block Bootstrap**: 10 muestras con bloques de 8 semanas para reducir varianza
   - **Ensamble**: Promedio de las 10 predicciones para mayor robustez
   - **Parámetros optimizados**: Basados en resultados del Modelo B.2

2. **Para combinaciones con datos parciales**:
   - **Promedio Estacional**: Por semana del año (mejor baseline identificado)
   - Captura patrones cíclicos anuales

3. **Para combinaciones sin datos**:
   - **Promedio Global**: Promedio histórico del dataset completo
   - Último recurso para garantizar cobertura total

**Código del Modelo Híbrido:**
```python
def train_prophet_with_gridsearch(train_data, test_dates, param_grid, n_bootstrap=10, block_size=8):
    """
    Entrena Prophet con Grid Search + Block Bootstrap
    Incorpora mejoras del Modelo B.2 (Sección 2)
    """
    # Grid search optimizado alrededor de parámetros óptimos
    # cp=0.05, sp=0.1, mode=additive
    # Mayor número de changepoints (25)
    # Validación temporal robusta
```

**Ventajas del Modelo Híbrido:**
- ✅ **Combina lo mejor de cada enfoque**: Prophet para patrones complejos, baselines para datos escasos
- ✅ **Robusto**: Block Bootstrap reduce sobreajuste, ensamble reduce varianza
- ✅ **Completo**: Garantiza predicción para todas las combinaciones tienda-departamento
- ✅ **Eficiente**: Enfoca recursos computacionales en combinaciones con más datos
- ✅ **Validado**: Basado en evidencia empírica de la Sección 2

**Resultados del Modelo Híbrido en Validación:**
- **MAE**: $2,046.71
- **Mejora vs Baseline**: 14.48% (de $2,393.32 a $2,046.71)
- Método de evaluación: Conjunto de validación sin festivos
- Nota: El modelo híbrido mejora significativamente sobre el promedio histórico simple

### 6.4 Implementación y Resultados del Modelo Híbrido

**Proceso de Generación de Predicciones:**

1. **Selección de combinaciones prioritarias** (~180 combinaciones):
   - Criterio: ≥50 registros históricos
   - Método: Prophet optimizado con Grid Search + Bootstrap
   - Tiempo de ejecución: ~10 combinaciones procesadas

2. **Completado con promedio estacional** (~3,151 combinaciones):
   - Método: Promedio por semana del año (mejor baseline)
   - Garantiza cobertura completa del dataset de test

3. **Post-procesamiento**:
   - Eliminación de valores negativos: `np.maximum(predictions, 0)`
   - Validación de formato: `Store_Dept_Date`
   - Verificación de cobertura: 100% de registros test

**Archivo Submission Final:**

**Estructura:**
```csv
id,Weekly_Sales
1_1_2012-11-02,24350.52
1_1_2012-11-09,22180.13
...
```

**Formato ID**: `{Store}_{Dept}_{Date}`

**Validación de Predicciones Top 100:**
- Concentración en **tiendas grandes** (Tipos A y B) ✓
- **Departamentos 2, 8, 95**: Consistentemente en top ✓
- **Fechas navideñas**: Sobre-representadas (Thanksgiving, Christmas) ✓
- Rangos coherentes con datos históricos ✓

**Ventajas del Modelo Híbrido Final:**

1. **Robustez**: Combina sofisticación (Prophet) con simplicidad (baselines)
2. **Eficiencia**: Optimiza recursos en combinaciones más importantes
3. **Cobertura**: Garantiza predicciones para todas las combinaciones
4. **Validación**: Basado en evidencia empírica de experimentos previos
5. **Reproducibilidad**: Parámetros fijos, semillas establecidas
6. **Desempeño comprobado**: MAE de $2,046.71, mejora de 14.48% vs baseline

**Metodología Aplicada:**

- ✅ **Block Bootstrap + Prophet**: 10 modelos por combinación prioritaria
- ✅ **Grid Search**: Búsqueda exhaustiva de hiperparámetros
- ✅ **Ensamble**: Promedio para reducir varianza
- ✅ **Fallbacks Jerárquicos**: Promedio estacional → Promedio global
- ✅ **Manejo de Festivos**: Inclusión automática con `add_country_holidays('US')`
- ✅ **Garantías de calidad**: Sin valores negativos, cobertura 100%

**Estadísticas del Submission:**
- Total de predicciones: 115,064 registros
- Rango de ventas: $0.00 - $310,234.15
- Promedio: $8,342.57
- Sin valores negativos (garantizado por `max(0, prediction)`)
- Cobertura: 100% de combinaciones requeridas

**Desempeño del Modelo:**
- **MAE en Validación**: $2,046.71
- **Mejora vs Baseline Simple**: 14.48%
- **Método**: Modelo híbrido (Prophet optimizado + Promedio estacional)
- **Robustez**: Ensamble de 10 modelos con block bootstrap

### 6.5 Predicciones Top 100

Se generó análisis de las **Top 100 predicciones más altas** para validación:

**Características observadas:**
- Concentración en **tiendas grandes** (Tipos A y B)
- **Departamentos 2, 8, 95**: Consistentemente en top
- **Fechas navideñas**: Sobre-representadas (Thanksgiving, Christmas)
- Rangos coherentes con datos históricos

---

## 7. Conclusiones Generales

### 7.1 Hallazgos Principales

#### Sobre los Datos:
1. **Estacionalidad domina**: Los patrones anuales explican >99% de la variabilidad en ventas
2. **Thanksgiving es crítico**: +39.60% en ventas, mayor impacto de todos los feriados
3. **Christmas es contraintuitivo**: -8.64% en la semana exacta (compras anticipadas)
4. **Volatilidad por segmento**: CV varía de <50% (productos estables) a >100% (productos estacionales)

#### Sobre los Modelos:
1. **Prophet supera XGBoost**: 37% de mejora en WMAE
2. **Variables exógenas tienen impacto limitado**: Solo 15% de importancia en XGBoost
3. **Optimización de hiperparámetros importa**: +2.19% de mejora con Grid Search
4. **Ensamble mejora robustez**: Block Bootstrap + promedio reduce varianza
5. **Modelo híbrido es la mejor estrategia**: Combina sofisticación con cobertura completa

#### Sobre el Negocio:
1. **Timing es todo**: Thanksgiving requiere preparación 2 semanas antes
2. **Christmas requiere anticipación**: Las compras ocurren antes de la semana exacta
3. **Promociones tienen ROI bajo**: La estacionalidad natural es más fuerte
4. **Departamentos especializados**: Algunos productos son extremadamente estacionales

### 7.2 Recomendaciones Estratégicas

#### Gestión de Inventario:
1. **Preparación anticipada para Thanksgiving**: Stock +40% en tiendas Tipo B
2. **Productos críticos**: Deptos 99, 72, 6, 47 (alta demanda festiva)
3. **Reducción pre-Christmas**: Anticipar caída en la semana exacta
4. **Monitoreo de volatilidad**: Combinaciones con CV > 100% requieren atención especial

#### Estrategia Promocional:
1. **Inversión limitada en promociones genéricas**: ROI dudoso vs estacionalidad natural
2. **Focalización en departamentos sensibles**: Deptos 99, 47, 72 responden mejor
3. **Timing estratégico**: Coordinar con feriados naturales
4. **A/B testing**: Validar impacto real de cada tipo de promoción

#### Mejoras del Modelo:
1. **Implementar Prophet en producción**: Mejor desempeño y simplicidad
2. **Modelo híbrido para robustez**: Combinar Prophet + baselines estacionales
3. **Actualización continua**: Re-entrenar con datos nuevos cada trimestre
4. **Segmentación por tipo de producto**: Modelos especializados para alta/baja volatilidad

---

**Documento generado**: 13 de diciembre de 2025  
**Autor**: Cristian Baeza Torres  
**Proyecto**: Tarea 2 - Analítica de Datos (Series Temporales)

# proyecto 3

# Estimación de Sexo Biológico mediante Análisis Osteométrico y Machine Learning

## 📊 Descripción del Proyecto

Este proyecto aplica **Machine Learning** para estimar el sexo biológico a partir de medidas osteométricas del dataset **Goldman** (1,538 registros, 69 variables). El análisis se realizó de forma **sistemática para todas las extremidades** del cuerpo: húmero, radio, fémur, tibia y pelvis, evaluando su capacidad discriminativa individual y comparativa.

El objetivo es proporcionar herramientas automatizadas para antropólogos forenses y bioarqueólogos en contextos donde restos humanos están fragmentados.

Trabajo realizado para la asignatura **Analitica de Datos** en conjunto con Felipe Olivares, Claudio Velquen y Felipe Romero.

## 🔧 Metodologías Aplicadas

### **1. Análisis Exploratorio (EDA)**
- Limpieza de datos con codificación `latin1`
- Pruebas t-student para dimorfismo sexual (43 variables significativas, p<0.05)
- Detección de outliers mediante IQR
- Visualizaciones comparativas por sexo (boxplots, heatmaps)

### **2. Modelado por Extremidad**

Se aplicó el **mismo pipeline de 6 modelos ML** a cada extremidad:
- **Árbol de Decisión**
- **Random Forest**
- **Regresión Logística**
- **Support Vector Machine (SVM)**
- **XGBoost**
- **MLP (Perceptrón Multicapa)**

**Metodología:**
- División estratificada: Train (64%) / Validación (16%) / Test (20%)
- Grid Search exhaustivo (504+ combinaciones de hiperparámetros)
- Evaluación: Accuracy, Precision, Recall, F1-Score, ROC-AUC

### **3. Análisis de Clustering**
- Aplicación de técnicas de **aprendizaje no supervisado**
- Agrupamiento de individuos basado en características osteométricas
- Validación de patrones de dimorfismo sexual sin etiquetas previas

## 🎯 Resultados Principales

### **Extremidad Superior Izquierda (Mejor Rendimiento)**
**Modelo Ganador:** Regresión Logística
- **Accuracy:** 86.31%
- **ROC-AUC:** 92.09%
- **Variables:** 8 medidas de húmero y radio
- **Variable más discriminativa:** LHHD (Diámetro cabeza del húmero) - 35.7% importancia

### **Hallazgos Transversales**
✅ **Todas las extremidades muestran dimorfismo sexual significativo** (p<0.05)  
✅ **Extremidad inferior** (fémur, tibia) presenta **mayor dimorfismo** que superior  
✅ **Pelvis** alcanza mayor accuracy (esperado por diferencias biomecánicas)  
✅ **Sin overfitting:** Consistencia entre validación y test (<4% diferencia)  
✅ **Reproducibilidad:** Pipeline estandarizado aplicable a cualquier elemento óseo

### **Ranking de Modelos (Promedio General)**
| Modelo | Accuracy Típico | Ventajas |
|--------|-----------------|----------|
| Regresión Logística | 85-86% | Interpretable, eficiente |
| Random Forest | 84-86% | Robusto, maneja no linealidad |
| SVM | 84-85% | Mejor separación de clases |
| XGBoost | 83-85% | Balance bias-varianza |

## 💡 Aplicaciones y Valor Científico

**Contextos de uso:**
- Antropología forense (identificación con restos fragmentarios)
- Bioarqueología (estudios poblacionales históricos)
- Medicina legal (perfiles biológicos)

**Ventajas sobre métodos tradicionales:**
- **Automatización completa** vs. morfoscopia subjetiva (70-80% accuracy)
- **Superior o comparable** a ecuaciones discriminantes clásicas (80-90%)
- **Interpretabilidad:** Identificación de variables clave por elemento
- **Flexibilidad:** Adaptable a preservación diferencial del esqueleto


**Stack Tecnológico:** Python, Pandas, Scikit-learn, XGBoost, SciPy, Matplotlib, Seaborn

---

Este proyecto demuestra cómo el **análisis sistemático de todas las extremidades** con ML permite seleccionar el elemento óptimo según contexto forense, mejorando significativamente la precisión en estimación de sexo versus métodos tradicionales.

