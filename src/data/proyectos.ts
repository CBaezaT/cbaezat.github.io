export interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  descripcionCorta: string;
  tags: string[];
  estado: string;
  color: string;
  emoji: string;
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
    color: "red",
    emoji: "👥",
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
    color: "blue",
    emoji: "📊",
    año: "2025",
    link: "proyectos/prediccion-ventas/"
  },
  {
    id: 3,
    titulo: "Estimación de Sexo Biológico con ML",
    descripcion: "Aplicación de Machine Learning para estimar el sexo biológico a partir de medidas osteométricas. Análisis sistemático de todas las extremidades con 86.31% de accuracy, superando métodos tradicionales.",
    descripcionCorta: "Machine Learning para estimación de sexo biológico mediante análisis osteométrico",
    tags: ["Antropología Forense", "Machine Learning", "Bioarqueología"],
    estado: "Completado",
    color: "green",
    emoji: "🧬",
    año: "2025",
    link: "proyectos/sexo-osteometrico/"
  },
  {
    id: 4,
    titulo: "ARIACH - Red de Investigadores",
    descripcion: "Fundador de la red de investigadores en Antropología, buscando fortalecer colaboraciones interdisciplinarias y promover investigación de calidad.",
    descripcionCorta: "Red de investigadores en Antropología, fortaleciendo colaboraciones interdisciplinarias",
    tags: ["Antropología", "Redes", "Liderazgo"],
    estado: "2020 - Activo",
    color: "purple",
    emoji: "🤝",
    año: "2020"
  }
];

// Función para obtener los últimos N proyectos
export function getUltimosProyectos(n: number = 3): Proyecto[] {
  return proyectos.slice(0, n);
}
