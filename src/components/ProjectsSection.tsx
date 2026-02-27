import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // NOVA FUNÇÃO: Salva a posição exata do scroll ao clicar
  const handleSaveScroll = () => {
    sessionStorage.setItem("scroll-position-home", window.scrollY.toString());
  };

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
            MEUS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            PROJETOS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card Software */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-hover rounded-2xl p-8 h-full flex flex-col items-center text-center group border-2 border-transparent hover:border-primary/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Software</h3>
              <p className="text-muted-foreground mb-8">
                Aplicativos mobile, sistemas web e ferramentas construídas com Flutter, React e outras tecnologias modernas.
              </p>
              
              {/* Link atualizado com onClick */}
              <Link
                to="/software"
                onClick={handleSaveScroll}
                className="mt-auto inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Ver Projetos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card Hardware */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-hover rounded-2xl p-8 h-full flex flex-col items-center text-center group border-2 border-transparent hover:border-accent/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Hardware</h3>
              <p className="text-muted-foreground mb-8">
                Projetos de engenharia, sistemas embarcados, robótica e prototipagem física.
              </p>

              {/* Link atualizado com onClick */}
              <Link
                to="/hardware"
                onClick={handleSaveScroll}
                className="mt-auto inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors"
              >
                Ver Projetos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;