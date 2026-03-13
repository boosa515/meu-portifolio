export type HardwareProject = {
  id: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  screenshots: string[];
  techStack: string[];
  highlights: string[];
  githubLink: string;
  videoSrc?: string;
  featured?: boolean;
};

export const hardwareProjects: HardwareProject[] = [
  {
    id: 3,
    name: "Analisador de Espectro de Áudio",
    shortDescription: "Visualização de espectro em tempo real.",
    fullDescription:
      "Projeto com ESP32-S3 para captura e processamento de áudio com exibição em OLED.",
    thumbnail: "espectro/projeto_espectro.jpg",
    screenshots: [
      "espectro/projeto_espectro.jpg",
      "espectro/photo-1.jpg",
    ],
    techStack: ["ESP32-S3", "OLED", "C/C++"],
    highlights: ["Leitura em tempo real", "Projeto compacto", "Visualização clara"],
    githubLink: "https://github.com/Artur-Brasileiro/Analisador-Espectro",
    videoSrc: "espectro/video_espectro.mp4",
    featured: true,
  },
  {
    id: 4,
    name: "Deauther Didático (2.4 e 5GHz)",
    shortDescription: "Desautenticação de redes em ambiente controlado.",
    fullDescription:
      "Dispositivo didático para estudar Wi-Fi em ambiente controlado, com foco em segurança de redes e aprendizado prático.",
    thumbnail: "deauther/projeto_deauther.jpg",
    screenshots: [
      "deauther/photo-1.jpg",
      "deauther/photo-2.jpg",
      "deauther/photo-3.jpg",
    ],
    techStack: ["BW-16", "OLED", "C/C++", "Impressão 3D"],
    highlights: ["Uso didático", "Placa customizada", "Design compacto"],
    githubLink: "https://github.com/Artur-Brasileiro/Deauther-5GHz",
    videoSrc: "deauther/video_deauther.mp4",
    featured: true,
  },
];