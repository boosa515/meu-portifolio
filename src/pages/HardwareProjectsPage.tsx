import { useLayoutEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { hardwareProjects } from "@/data/hardwareProjects";

const HardwareProjectsPage = () => {
  const [activeId, setActiveId] = useState(hardwareProjects[0]?.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Scroll to top is now handled by AnimatePresence in App.tsx

  const activeProject = useMemo(
    () => hardwareProjects.find((p) => p.id === activeId) ?? hardwareProjects[0],
    [activeId]
  );

  if (!activeProject) return null;

  return (
    <div className="min-h-screen pb-12 pt-20">
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-8 h-auto p-0 hover:bg-transparent">
          <Link to="/#projetos" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Projetos
          </Link>
        </Button>

        <h2 className="mb-8 font-display text-4xl font-bold gradient-text">Projetos de Hardware</h2>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-4">
            {hardwareProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveId(project.id);
                  setActiveImageIndex(0);
                }}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  activeProject.id === project.id
                    ? "border-primary bg-card shadow-glow"
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

          <Card className="border-border bg-card p-5">
            <div className="space-y-5">
              <img
                src={`${import.meta.env.BASE_URL}${activeProject.screenshots[activeImageIndex]}`}
                alt={`Foto ${activeImageIndex + 1}`}
                className="h-[360px] w-full rounded-xl border border-border/60 object-cover"
              />

              <div className="flex flex-wrap gap-2">
                {activeProject.screenshots.map((shot, index) => (
                  <button
                    key={shot}
                    onClick={() => setActiveImageIndex(index)}
                    className={`rounded-lg border p-1 ${activeImageIndex === index ? "border-primary" : "border-border"}`}
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
                <p className="mt-2 text-muted-foreground">{activeProject.fullDescription}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="rounded border border-border bg-secondary px-2 py-1 text-xs">
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
                {activeProject.videoSrc && (
                  <Button
                    onClick={() => {
                      setSelectedVideo(`${import.meta.env.BASE_URL}${activeProject.videoSrc}`);
                      setOpen(true);
                    }}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Ver Demonstração
                  </Button>
                )}

                <Button asChild variant="outline">
                  <a href={activeProject.githubLink} target="_blank" rel="noopener noreferrer">
                    Ver Código no GitHub
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="overflow-hidden border-border bg-black p-0 sm:max-w-4xl">
            <DialogHeader className="sr-only">
              <DialogTitle>Demonstração</DialogTitle>
              <DialogDescription>Vídeo do projeto em funcionamento.</DialogDescription>
            </DialogHeader>
            {selectedVideo && <video src={selectedVideo} controls autoPlay className="h-full w-full" />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HardwareProjectsPage;
