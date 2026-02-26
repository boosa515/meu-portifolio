import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Smartphone, Code } from "lucide-react";
import profileImg from "@/assets/profile-avatar.png";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Code, label: "Linguagens", value: "Flutter & Dart" },
    { icon: Smartphone, label: "Foco", value: "Mobile" },
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
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass neon-border">
                <img
                  src={profileImg}
                  alt="Artur Brasileiro"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm flex items-center justify-center">
                <span className="font-mono text-primary text-sm font-bold">
                  Sr. Dev
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="font-mono text-sm text-primary mb-3 tracking-wider uppercase">
              Sobre mim
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Transformando ideias em{" "}
              <span className="gradient-text">experiências digitais</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Sou Engenheiro de Computação apaixonado por desenvolvimento mobile.
              Com foco em Flutter e Dart, construo aplicações de alto desempenho
              com interfaces elegantes e código limpo. Minha missão é criar
              produtos que impactem positivamente a vida das pessoas através da
              tecnologia.
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
