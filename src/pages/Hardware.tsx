import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  github?: string;
  live?: string;
}

// Preencha com os seus projetos reais de Hardware
const hardwareProjects: Project[] = [
  {
    title: "Deauther Didático (2.4 e 5GHz)",
    description: "Dispositivo didático baseado no BW-16 com tela OLED de 0,96', usado para estudar o funcionamento de redes Wi-Fi e entender, em ambiente controlado, como pacotes de desautenticação afetam a conexão. O projeto inclui case em impressão 3D e uma placa de circuito impresso feita manualmente, tornando o dispositivo compacto e ideal para aprendizado prático.",
    tags: ["Impressão 3D", "BW-16", "Tela OLED 0,96'", "Circuito Impresso"],
    featured: true,
    github: "#",
    live: "#",
  },
];

const Hardware = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">PROJETOS DE <span className="text-accent">HARDWARE</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Sistemas embarcados, prototipagem, robótica e eletrónica.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {hardwareProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-hover rounded-2xl p-6 md:p-8 group relative overflow-hidden ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                <Cpu className="w-4 h-4 text-accent" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-secondary text-secondary-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {project.github && (
                  <a href={project.github} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                    <Github className="w-4 h-4" /> Código
                  </a>
                )}
                {project.live && (
                  <a href={project.live} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                    <ExternalLink className="w-4 h-4" /> Detalhes
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hardware;