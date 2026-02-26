import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Star, Sparkles } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "KaizenHub",
    description:
      "Aplicativo de produtividade completo construído com Flutter. Gestão de tarefas, hábitos e metas com interface intuitiva e gamificação.",
    tags: ["Flutter", "Dart", "Firebase", "Riverpod"],
    featured: true,
    github: "#",
    live: "#",
  },
  {
    title: "FinTracker",
    description:
      "App de controle financeiro pessoal com dashboards interativos, categorização automática e relatórios mensais.",
    tags: ["Flutter", "Dart", "SQLite"],
    github: "#",
  },
  {
    title: "DevConnect",
    description:
      "Rede social para desenvolvedores com feed de postagens, mensagens em tempo real e sistema de perfil profissional.",
    tags: ["Flutter", "Firebase", "Cloud Functions"],
    github: "#",
  },
  {
    title: "WeatherNow",
    description:
      "Aplicativo de previsão do tempo com animações climáticas, geolocalização e alertas personalizados.",
    tags: ["Flutter", "REST API", "Lottie"],
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projetos" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary mb-3 tracking-wider uppercase">
            Portfólio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Projetos em Destaque
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
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
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Código
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  {project.featured && (
                    <div className="flex items-center gap-1 ml-auto text-primary/60">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
