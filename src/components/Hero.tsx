import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import Background from "./Background";
import heroCharacter from "../assets/characters/hero-character.png";
import "../styles/animations.css";

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

  // Efeito Maquina de escrever
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
        className={`ml-2 w-[3px] h-[1em] bg-primary transition-opacity ${blink ? "opacity-100" : "opacity-0"
          }`}
      />
    </span>
  );
};

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
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden">
      <Background />
      {/* CONTEÚDO */}
      <div className="relative z-10 w-full max-w-5xl px-4 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* TÍTULO */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight mb-6 drop-shadow-sm">

            <span className="block md:inline-block text-foreground mr-2 min-h-[1.2em]">
              <TypewriterText />
            </span>

            <span className="block md:inline gradient-text whitespace-nowrap">
              Gabriel R. Pires
            </span>

          </h1>

          {/* SUBTEXTO */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#fffafa] max-w-2xl mx-auto mb-8 font-medium">
            Engenheiro & Desenvolvedor Fullstack
            <br />
            Construindo aplicações para moldar o futuro.
          </p>


          {/* BOTÕES */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">

            <a
              href="#projetos"
              onClick={(e) => handleScroll(e, "projetos")}
              className="w-full sm:w-auto px-8 py-4 rounded-lg font-bold text-lg
              bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]
              transition-all duration-300
              hover:scale-105 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.7)]
              active:scale-95"
            >
              Ver Projetos
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

      {/* Imagem Flutuante */}
      <img 
        src={heroCharacter} 
        alt="Hero Character" 
        className="floating-character floating-hero w-40 md:w-56 lg:w-72 h-auto" 
      />

    </section>
  );
};

export default Hero;
