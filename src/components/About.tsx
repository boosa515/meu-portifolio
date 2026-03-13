import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code, Globe } from "lucide-react";
import profileImg from "@/assets/avatar.png";

// Seus ícones
const techs = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Android", icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/android/android-plain.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "GitHub", icon: "https://pngimg.com/uploads/github/github_PNG90.png" },
  { name: "Arduino", icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/arduino/arduino-original-wordmark.svg" },
  { name: "Firebase", icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/firebase/firebase-original.svg" },
  { name: "Fusion", icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/fusion/fusion-original.svg" },
  { name: "Linux", icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/linux/linux-original.svg" },
  { name: "Photoshop", icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/photoshop/photoshop-original.svg" },
  { name: "Raspberry Pi", icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/raspberrypi/raspberrypi-plain.svg" },
  { name: "Unity", icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/unity/unity-plain.svg" },
  { name: "Cisco", icon: "https://translatorswithoutborders.org/wp-content/uploads/2021/12/Cisco-logo.png" },
  { name: "EasyEDA", icon: "https://i0.wp.com/arduinofactory.com/wp-content/uploads/2024/09/easyeda_logo.png?w=1024&ssl=1" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Code, label: "Stack", value: "TypeScript & Dart" },
    { icon: Globe, label: "Foco", value: "Web & Mobile" },
    { icon: GraduationCap, label: "Formação", value: "Eng. Computação" },
  ];

  return (
    <section id="sobre" className="py-24 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass neon-border">
              <img src={profileImg} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="font-mono text-sm text-primary mb-3 uppercase tracking-wider text-center">Sobre mim</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 font-display tracking-tighter drop-shadow-sm uppercase text-center">
              TRANSFORMANDO IDEIAS
            </h2>
            <div className="text-white leading-relaxed mb-8 text-justify space-y-4">
              <p>
                Olá, eu sou um Engenheiro da Computação com experiência prática no desenvolvimento de projetos multidisciplinares. Meus projetos unem desenvolvimento de sites e aplicativos com a eletrônica, criando pontes entre o mundo digital e o físico.
              </p>
              <p>
                Tenho facilidade em transitar entre diferentes tecnologias para encontrar a melhor solução para cada problema. Meu foco é projetar sistemas que sejam robustos no back-end, eficientes no hardware e extremamente amigáveis para o usuário final.
              </p>
              <p>
                Estou sempre em busca do próximo desafio tecnológico. Vamos construir algo incrível juntos!
              </p>
            </div>
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

        {/* TECNOLOGIAS E FERRAMENTAS (ESTÁTICO) */}
        <div className="mt-32 md:mt-40 flex flex-col items-center">
          <p className="font-mono text-sm text-primary mb-10 uppercase tracking-wider">Tecnologias e Ferramentas</p>
          <div className="flex flex-wrap justify-center gap-6 max-w-[850px] mx-auto">
            {techs.map((tech, i) => (
              <div
                key={i}
                className="relative flex items-center justify-center w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] bg-gradient-to-br from-background to-[#2a2a2a] rounded-3xl border border-white/5 shadow-[0_0_15px_#2a2a2a] transition-all duration-300 hover:-translate-y-2 hover:to-[#333333] hover:shadow-[0_0_25px_#333333] group cursor-default"
              >
                {/* TOOLTIP (Balão de fala branco) */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-zinc-900 text-xs font-bold rounded-lg opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out pointer-events-none z-50 shadow-xl whitespace-nowrap origin-bottom">
                  {tech.name}
                  {/* Triângulo apontando para baixo */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-white"></div>
                </div>

                {/* Imagem (Ícone da tecnologia) */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;