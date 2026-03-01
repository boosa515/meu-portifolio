import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";

/* ================= TYPEWRITER ================= */
const TypewriterText = () => {
  const words = ["Oi, eu sou", "Hi, I am"];

  const TYPING_SPEED = 90;
  const DELETE_SPEED = 50;
  const PAUSE_TIME = 1500;

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Cursor piscando
  useEffect(() => {
    const timeout = setTimeout(() => setBlink(prev => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  // Máquina de escrever
  useEffect(() => {
    if (subIndex === words[index].length && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), PAUSE_TIME);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex(prev => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex(prev => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? DELETE_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting]);

  return (
    <span className="inline-flex items-center">
      {words[index].substring(0, subIndex)}
      <span
        className={`ml-2 w-[3px] h-[1em] bg-primary transition-opacity ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

/* ================= HERO ================= */
const Hero = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center">

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full max-w-5xl px-4 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* TÍTULO */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">

            <span className="block md:inline text-foreground mr-2">
              <TypewriterText />
            </span>

            <span className="block md:inline gradient-text whitespace-nowrap">
              Gabriel R. Pires
            </span>

          </h1>

          {/* SUBTEXTO */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Engenheiro de Computação & Desenvolvedor Fullstack.
            Construindo aplicações modernas e experiências digitais de alto nível.
          </p>

          {/* STATUS */}
          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground mb-10">
            <span>+5 projetos reais</span>
            <span>•</span>
            <span>Disponível para freelas</span>
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">

            <a
              href="#projetos"
              onClick={(e) => handleScroll(e, "projetos")}
              className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold 
              bg-primary text-primary-foreground
              transition-all duration-300
              hover:scale-105 hover:shadow-glow
              active:scale-95"
            >
              Ver Projetos
            </a>

            <a
              href="#contato"
              onClick={(e) => handleScroll(e, "contato")}
              className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold 
              bg-secondary text-secondary-foreground border border-border
              transition-all duration-300
              hover:scale-105 hover:border-primary/40 hover:bg-secondary/80
              active:scale-95"
            >
              Entrar em Contato
            </a>

          </div>

          {/* REDES SOCIAIS */}
          <div className="flex items-center justify-center gap-6">

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>

          </div>

        </motion.div>
      </div>

      {/* SCROLL DOWN */}
      <motion.a
        href="#sobre"
        onClick={(e) => handleScroll(e, "sobre")}
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground cursor-pointer z-10"
      >
        <ArrowDown className="w-6 h-6 opacity-60" />
      </motion.a>

    </section>
  );
};

export default Hero;
