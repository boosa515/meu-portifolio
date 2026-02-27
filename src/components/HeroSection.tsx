import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";

// --- COMPONENTE DO EFEITO MÁQUINA DE ESCREVER ---
const TypewriterText = () => {
  const words = ["Oi, eu sou", "HI, I am"];
  const [index, setIndex] = useState(0);
  // Começamos com o tamanho da primeira palavra para ela já aparecer escrita
  const [subIndex, setSubIndex] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Efeito do cursor piscando (o travessão)
  useEffect(() => {
    const blinkTimeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  // Lógica de apagar e reescrever
  useEffect(() => {
    // Se a palavra inteira foi escrita, pausa antes de começar a apagar
    if (subIndex === words[index].length + 1 && !isDeleting) {
      const pauseBeforeDelete = setTimeout(() => setIsDeleting(true), 500);
      return () => clearTimeout(pauseBeforeDelete);
    }

    // Se apagou tudo, troca a palavra e começa a escrever
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Velocidade: apaga mais rápido (80ms) e escreve um pouco mais devagar (120ms)
    const typeSpeed = isDeleting ? 100 : 120;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  return (
    <span className="inline-flex items-center">
      {words[index].substring(0, subIndex)}
      <span
        className={`inline-block w-[4px] h-[1em] bg-primary ml-2 transition-opacity duration-100 ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      ></span>
    </span>
  );
};

// --- COMPONENTE PRINCIPAL DA SEÇÃO ---
const HeroSection = () => {
  return (
    <section
      id="sobre"
      className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden pt-20"
    >
      {/* Luz de fundo (glow) para dar um charme no design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* TÍTULO RESPONSIVO */}
          {/* flex-col no celular, md:flex-row a partir de tablets */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center">
            <span className="block md:inline text-foreground mb-2 md:mb-0 md:mr-4">
              <TypewriterText />
            </span>
            <span className="block md:inline text-primary whitespace-nowrap">
              Gabriel R. Pires
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
             Engenheiro de Computação & Fullstack Developer focado em Web. Criando experiências mobile de alto padrão.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#projetos"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all hover:scale-105 border border-border"
            >
              Entrar em Contato
            </a>
          </div>

          {/* Redes Sociais */}
          <div className="flex items-center justify-center gap-6">
            <a href="https://github.com/boosa515/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/grp-0892ret/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Ícone de Scroll flutuando em baixo */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown className="w-6 h-6 opacity-50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;