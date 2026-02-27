import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/boosa515",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/grp-0892ret",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:rezendepiresgabriel@gmail.com",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/5534993417077?text=Ol%C3%A1%20Gabriel%2C%20tudo%20bem%20%3F",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com/ga_rpires",
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
            QUER ENTRAR EM CONTATO?
          </h2>
          <br/>
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
            © Gabriel R. Pires 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
