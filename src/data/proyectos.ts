export interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  descripcionCorta: string;
  tags: string[];
  estado: string;
  año: string;
  link?: string; // Enlace opcional a la página del proyecto
}

export const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: "SOCHIAB - Presidencia 2025-2026",
    descripcion: "Presidente de la Sociedad Chilena de Antropología Biológica, liderando iniciativas de investigación, educación y promoción de la disciplina en Chile.",
    descripcionCorta: "Presidente de la Sociedad Chilena de Antropología Biológica, liderando iniciativas de investigación",
    tags: ["Liderazgo", "Sociedad Científica", "Gestión"],
    estado: "2025 - 2026",
    año: "2025",
    link: "proyectos/sochiab-presidencia/"
  },
  {
    id: 2,
    titulo: "Predicción de Ventas con Series Temporales",
    descripcion: "Proyecto de consultoría en Data Science para NorthRetail Inc., desarrollando un modelo robusto de predicción de ventas semanales. Modelo híbrido (Prophet + Baselines) con mejora de 14.48% sobre baseline.",
    descripcionCorta: "Modelo de predicción de ventas semanales con Prophet y XGBoost para retail",
    tags: ["Data Science", "Machine Learning", "Series Temporales"],
    estado: "Completado - 2025",
    año: "2025",
    link: "proyectos/prediccion-ventas/"
  },
  {
    id: 3,
    titulo: "Goldman Osteometric Dataset - Estimación de Sexo Biológico",
    descripcion: "Proyecto de Analítica de Datos (UdeC) que aplica 6 modelos de ML supervisado para estimar sexo biológico desde medidas de huesos largos. Dataset Goldman (1.538 individuos). Accuracy ~89% en extremidad superior derecha con Random Forest. Análisis de clustering + PCA revela limitaciones en población asiática.",
    descripcionCorta: "6 modelos de ML supervisado para estimar sexo biológico desde medidas osteométricas del Goldman Dataset",
    tags: ["Analítica de Datos", "Machine Learning", "Antropología Forense"],
    estado: "Completado - 2025",
    año: "2025",
    link: "proyectos/sexo-osteometrico/"
  }
];

// Función para obtener los últimos N proyectos
export function getUltimosProyectos(n: number = 3): Proyecto[] {
  return proyectos.slice(0, n);
}
