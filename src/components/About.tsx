import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code, Globe } from "lucide-react";

// sua imagem
import profileImg from "@/assets/avatar.png";

const techs = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "GitHub", icon: "https://pngimg.com/uploads/github/github_PNG90.png" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Code, label: "Stack", value: "TypeScript & Dart" },
    { icon: Globe, label: "Foco", value: "Web & Mobile" },
    { icon: GraduationCap, label: "Formação", value: "Eng. Computação" },
  ];

  const doubled = [...techs, ...techs];

  return (
    <section id="sobre" className="py-24 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">

        {/* Conteúdo principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >

          {/* Imagem */}
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass neon-border">
              <img
                src={profileImg}
                alt="Seu nome"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Texto */}
          <div>
            <p className="font-mono text-sm text-primary mb-3 uppercase tracking-wider">
              Sobre mim
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transformando ideias em{" "}
              <span className="gradient-text">experiências digitais</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Sou estudante do 9º período de Engenharia da Computação, apaixonado por tecnologia e desenvolvimento de software.
              Tenho experiência na criação de aplicações web e mobile, além de projetos com hardware como Arduino e sistemas embarcados.
              Estou constantemente buscando evoluir minhas habilidades e enfrentar novos desafios que me permitam criar soluções inovadoras.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="card rounded-xl p-4 text-center">
                  <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-sm font-semibold">{s.value}</p>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Carrossel */}
        <div className="relative mt-20 w-screen left-1/2 -translate-x-1/2">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex w-max marquee">
            {doubled.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex-shrink-0 mx-4 w-28 h-28 glass rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <img src={tech.icon} alt={tech.name} className="w-10 h-10" />
                <span className="text-xs text-muted-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
