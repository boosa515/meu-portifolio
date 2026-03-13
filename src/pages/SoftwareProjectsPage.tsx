import { useLayoutEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { softwareProjects } from "@/data/softwareProjects";

const SoftwareProjectsPage = () => {
  const [activeId, setActiveId] = useState(softwareProjects[0]?.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Scroll to top is now handled by AnimatePresence in App.tsx

  const activeProject = useMemo(
    () => softwareProjects.find((p) => p.id === activeId) ?? softwareProjects[0],
    [activeId]
  );

  if (!activeProject) return null;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-8 h-auto p-0 hover:bg-transparent">
          <Link to="/#projetos" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Projetos
          </Link>
        </Button>

        <h2 className="font-display text-4xl font-bold gradient-text mb-8">Projetos de Software</h2>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Sidebar */}
          <div className="space-y-4">
            {softwareProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveId(project.id);
                  setActiveImageIndex(0);
                }}
                className={`w-full text-left rounded-xl border p-3 transition ${
                  activeProject.id === project.id
                    ? "border-primary shadow-glow bg-card"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex gap-3">
                  <img
                    src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                    alt={project.name}
                    className="h-16 w-24 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-display font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
                    {project.featured && (
                      <span className="text-[10px] text-primary/90 border border-primary/30 bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider mt-1.5 inline-block">
                        Destaque
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <Card className="p-5 bg-card border-border">
            <div className="space-y-5">
              <img
                src={`${import.meta.env.BASE_URL}${activeProject.screenshots[activeImageIndex]}`}
                alt={`Screenshot ${activeImageIndex + 1}`}
                className="w-full h-[360px] rounded-xl object-cover border border-border/60"
              />

              <div className="flex flex-wrap gap-2">
                {activeProject.screenshots.map((shot, index) => (
                  <button
                    key={shot}
                    onClick={() => setActiveImageIndex(index)}
                    className={`rounded-lg border p-1 ${
                      activeImageIndex === index ? "border-primary" : "border-border"
                    }`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${shot}`}
                      alt={`Miniatura ${index + 1}`}
                      className="h-14 w-24 rounded object-cover"
                    />
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-bold">{activeProject.name}</h3>
                  {activeProject.featured && (
                    <span className="text-xs font-bold text-primary border border-primary/50 bg-primary/10 px-2 py-1 rounded uppercase tracking-wider">
                      ★ Destaque
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">{activeProject.fullDescription}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 rounded bg-secondary border border-border">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {activeProject.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {activeProject.siteLink && (
                  <Button asChild>
                    <a href={activeProject.siteLink} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Ver Projeto Online
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <a href={activeProject.githubLink} target="_blank" rel="noopener noreferrer">
                    Ver Código no GitHub
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SoftwareProjectsPage;
