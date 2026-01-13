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
}

export const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: "Análisis de Sindemias en Chile",
    descripcion: "Estudio de las interacciones entre COVID-19, enfermedades crónicas y factores socioeconómicos en la población chilena mediante análisis de datos avanzado.",
    descripcionCorta: "Estudio de interacciones entre COVID-19, enfermedades crónicas y factores socioeconómicos en Chile",
    tags: ["Data Science", "Epidemiología", "Python"],
    estado: "En curso - 2025",
    color: "blue",
    emoji: "🏆",
    año: "2025"
  },
  {
    id: 2,
    titulo: "Transcripción Automática de Audio",
    descripcion: "Desarrollo de herramientas de procesamiento de lenguaje natural para transcripción y análisis automático de archivos de audio en investigación cualitativa.",
    descripcionCorta: "Herramientas de procesamiento de lenguaje natural para transcripción y análisis de audio",
    tags: ["NLP", "Machine Learning", "Python"],
    estado: "2021 - Activo",
    color: "green",
    emoji: "💻",
    año: "2021"
  },
  {
    id: 3,
    titulo: "SOCHIAB 2025-2026",
    descripcion: "Presidente de la Sociedad Chilena de Antropología Biológica, liderando iniciativas de investigación, educación y promoción de la disciplina en Chile.",
    descripcionCorta: "Presidente de la Sociedad Chilena de Antropología Biológica, liderando iniciativas de investigación",
    tags: ["Liderazgo", "Sociedad Científica", "Gestión"],
    estado: "2025 - 2026",
    color: "red",
    emoji: "👥",
    año: "2025"
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
