import { Code2, Cpu, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState, useEffect } from "react";
import { softwareProjects } from "../data/softwareProjects";
import { hardwareProjects } from "../data/hardwareProjects";

const Projects = () => {
  const projectCategories = [
    {
      icon: Code2,
      title: "Software",
      description: "IA, Web e Apps.",
      color: "text-primary",
      bgHover: "group-hover:bg-primary/5",
      link: "/software",
    },
    {
      icon: Cpu,
      title: "Hardware",
      description: "IoT e Eletrônica.",
      color: "text-accent",
      bgHover: "group-hover:bg-accent/5",
      link: "/hardware",
    },
  ];

  // Identifica de onde o projeto veio para o link funcionar
  const featuredProjects = [
    ...softwareProjects.map(p => ({ ...p, isSoftware: true })),
    ...hardwareProjects.map(p => ({ ...p, isSoftware: false }))
  ].filter(p => p.featured);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    watchDrag: false,
    containScroll: "trimSnaps"
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="projetos" className="py-24 relative overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-3 uppercase tracking-wider">
            Explorar
          </p>
          <h2 className="text-5xl md:text-6xl font-black mb-4 font-display tracking-tighter drop-shadow-sm">
            MEUS PROJETOS
          </h2>
        </div>

        {/* Categories (Rectangles) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {projectCategories.map((category, index) => (
            <Link to={category.link} key={index} className="block group">
              <Card
                className={`
                  p-6 
                  flex flex-row items-center justify-between
                  bg-card/30 backdrop-blur-2xl border-white/5 rounded-3xl
                  transition-all duration-500 ease-out
                  hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.3)]
                  relative overflow-hidden
                  ${category.bgHover}
                `}
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <category.icon
                      className={`w-14 h-14 ${category.color} relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-1 tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-[200px]">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 relative z-10">
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Projects Carousel */}
        {featuredProjects.length > 0 && (
          <div className="max-w-6xl mx-auto space-y-4">
            <h3 className="text-center text-sm font-bold tracking-widest text-white uppercase">DESTAQUES</h3>
            <div className="relative">
              <div className="overflow-hidden pb-10 pt-4 px-4" ref={emblaRef}>
                <div className="flex -ml-4">
                  {featuredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex-none w-full sm:w-[50%] lg:w-[33.33%] pl-4 min-w-0"
                    >
                      <div className="flex flex-col items-center">
                        <Link to={project.isSoftware ? "/software" : "/hardware"} className="w-full block">
                          <div className="relative aspect-square w-full rounded-2xl overflow-hidden group cursor-pointer border border-white/5 transition-all duration-300">
                            <img
                              src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                              alt={project.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </Link>

                        {/* Informações embaixo da imagem (Sempre visíveis) */}
                        <div className="mt-5 text-center px-2">
                          <Link to={project.isSoftware ? "/software" : "/hardware"} className="hover:text-primary transition-colors">
                            <h4 className="text-xl font-bold text-white mb-2">{project.name}</h4>
                          </Link>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.shortDescription}</p>
                          <div className="mt-4 flex gap-2 flex-wrap justify-center">
                            {project.techStack.slice(0, 3).map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/90">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Buttons */}
              <div className="absolute top-[35%] -left-4 md:-left-12 -translate-y-1/2 z-20">
                <Button
                  variant="outline"
                  size="icon"
                  className={`w-12 h-12 rounded-full bg-background/50 backdrop-blur-xl border-white/10 transition-all duration-300 shadow-xl ${canScrollPrev ? 'text-primary border-primary/50 hover:bg-primary hover:text-primary-foreground' : 'opacity-50 cursor-not-allowed'}`}
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              </div>

              <div className="absolute top-[35%] -right-4 md:-right-12 -translate-y-1/2 z-20">
                <Button
                  variant="outline"
                  size="icon"
                  className={`w-12 h-12 rounded-full bg-background/50 backdrop-blur-xl border-white/10 transition-all duration-300 shadow-xl ${canScrollNext ? 'text-primary border-primary/50 hover:bg-primary hover:text-primary-foreground' : 'opacity-50 cursor-not-allowed'}`}
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;