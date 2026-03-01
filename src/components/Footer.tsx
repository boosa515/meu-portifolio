import { Github, Linkedin, Mail, Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-border bg-[#0a0a0a]">

      {/* LINHA GLOW SUPERIOR */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">

          {/* ================= BRAND ================= */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Code2 className="text-primary" />
              <h3 className="text-xl font-bold">
                Gabriel R. Pires
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Desenvolvedor Fullstack focado em criar aplicações modernas,
              performáticas e com excelente experiência de usuário.
            </p>
          </div>


          {/* ================= SOCIAL ================= */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">
              Conecte-se
            </h4>

            <div className="flex justify-center md:justify-start gap-4">

              <a
                href="https://github.com/boosa515"
                target="_blank"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/grp-0892ret/"
                target="_blank"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rezendepiresgabriel@gmail.com"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>

            </div>
          </div>

        </div>

        {/* DIVISOR */}
        <div className="border-t border-border mt-12 pt-6 text-center text-xs text-muted-foreground">

          © {new Date().getFullYear()} Gabriel R. Pires — Todos os direitos reservados

        </div>

      </div>
    </footer>
  );
};

export default Footer;
