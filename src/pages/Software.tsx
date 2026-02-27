import { useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  github?: string;
  live?: string;
}

const softwareProjects: Project[] = [
  {
    title: "KaizenHub",
    description: "Aplicação de produtividade completa construída com Flutter. Gestão de tarefas, hábitos e metas com interface intuitiva e gamificação.",
    tags: ["Flutter", "Dart", "Firebase", "Riverpod"],
    featured: true,
    github: "#",
    live: "#",
  },
  {
    title: "Financ",
    description: "App de calculadora de juros composto pessoal com dashboards interativos.",
    tags: ["Flutter", "Dart", "SQLite"],
    github: "#",
  },
];

const Software = () => {
  const navigate = useNavigate();

  // Garante scroll no topo ao abrir
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 bg-transparent border-none cursor-pointer text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">PROJETOS DE <span className="text-primary">SOFTWARE</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Uma coleção das minhas aplicações mobile, sistemas web e ferramentas digitais.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {softwareProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-hover rounded-2xl p-6 md:p-8 group relative overflow-hidden ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              {project.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary">Destaque</span>
                </div>
              )}

              <div className={project.featured ? "md:max-w-2xl" : ""}>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
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
                    <a href={project.github} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-4 h-4" /> Código
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Software;