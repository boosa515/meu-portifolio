import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/artur-brasileiro",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/artur-brasileiro",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:contato@arturbrasileiro.dev",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-primary mb-3 tracking-wider uppercase">
            Contato
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
            Estou sempre aberto a novos projetos e oportunidades. Sinta-se à
            vontade para entrar em contato.
          </p>

          <div className="flex items-center justify-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-14 h-14 glass rounded-xl flex items-center justify-center transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.3)] hover:scale-110"
                aria-label={s.label}
              >
                <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 pt-8 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            Feito com <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> por Artur Brasileiro
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
