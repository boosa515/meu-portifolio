import { useState } from "react";
import { Mail, Github, Linkedin,} from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import contactCharacter from "../assets/characters/contact-character.png";
import "../styles/animations.css";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showModal, setShowModal] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rezendepiresgabriel@gmail.com",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=rezendepiresgabriel@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/boosa515",
      link: "https://github.com/boosa515",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/grp-0892ret",
      link: "https://www.linkedin.com/in/grp-0892ret/",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "WhatsApp",
      link: "https://wa.me/5534993417077?text=Ol%C3%A1%20Gabriel%2C%20tudo%20bem%20%3F",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mdalvewp", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setShowModal(true);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-20 relative overflow-hidden">
      {/* Imagem Flutuante */}
      <img 
        src={contactCharacter} 
        alt="Contact Character" 
        className="floating-character floating-contact w-56 md:w-72 lg:w-96 xl:w-[28rem] h-auto" 
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-primary mb-3 uppercase tracking-wider">
            ENTRE
          </p>
          <h2 className="text-4xl font-bold mb-4">
            EM CONTATO
          </h2>
        </div>

        <div className="flex flex-col items-center max-w-lg mx-auto">
          {/* Ícones de Contato (Enfileirados e Circulares) */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                title={info.label}
                className="w-16 h-16 rounded-full flex items-center justify-center bg-[#1a1a1a] border border-white/5 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-[#252525] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
              >
                <info.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>

          {/* Cartão de Enviar Mensagem (Centralizado e Sólido) */}
          <div className="w-full relative z-10 p-[2px] rounded-xl overflow-visible animated-border-card group mb-10">
            <Card className="w-full relative h-full p-8 !bg-[#121212] !bg-opacity-100 !backdrop-blur-none border-border shadow-2xl rounded-xl z-10">
              <h3 className="text-2xl font-bold mb-6 text-center">Envie uma Mensagem</h3>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  className="bg-secondary border-border"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  className="bg-secondary border-border"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Sua mensagem..."
                  rows={4}
                  className="bg-secondary border-border text-foreground resize-none overflow-hidden min-h-[100px]"
                  required
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>

              <Button type="submit" className="w-full shadow-glow mt-4" disabled={status === "loading"}>
                {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
              </Button>

              {status === "error" && (
                <p className="text-red-500 text-center mt-2">
                  Ocorreu um erro. Tente novamente mais tarde.
                </p>
              )}
            </form>
          </Card>
        </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 bg-card p-6 rounded-lg shadow-lg max-w-sm w-full mx-4"
          >
            <h4 className="text-lg font-semibold mb-2">Mensagem enviada</h4>
            <p className="text-muted-foreground mb-4">Obrigado! Vou responder em breve.</p>
            <div className="flex justify-end">
              <Button onClick={() => setShowModal(false)}>OK</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
