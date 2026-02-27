import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Smartphone, Code, Globe } from "lucide-react";

// Importe as duas imagens aqui (certifique-se de que os nomes batem com os arquivos na sua pasta)
import profileImgDark from "@/assets/avatar-escuro.png";
import profileImgLight from "@/assets/avatar-claro.png";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Code, label: "Linguagens", value: "typescript & Dart" },
    { icon: Globe, label: "Foco", value: "Web & Mobile" },
    { icon: GraduationCap, label: "Formação", value: "Eng. Computação" },
  ];

  return (
    <section id="sobre" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Imagens */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass neon-border">
                
                {/* imagem Modo Escuro */}
                <img
                  src={profileImgDark}
                  alt="Gabriel R. Pires"
                  className="w-full h-full object-cover block [.light_&]:hidden"
                />
                
                {/* imagem Modo Claro */}
                <img
                  src={profileImgLight}
                  alt="Gabriel R. Pires"
                  className="w-full h-full object-cover hidden [.light_&]:block"
                />

              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div>
            <p className="font-mono text-sm text-primary mb-3 tracking-wider uppercase">
              Sobre mim
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Transformando ideias em{" "}
              <span className="gradient-text">experiências digitais</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Sou estudante de Engenharia da Computação apaixonado por desenvolvimento web e mobile. Gosto de resolver problemas complexos usando tecnologia. Tenho experiência prática no desenvolvimento de soluções de software e hardware. Buscando aprofundar meus conhecimentos e enfrentar novos desafios inovadores.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-xl p-4 text-center"
                >
                  <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-sm font-semibold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;