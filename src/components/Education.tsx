import { GraduationCap } from "lucide-react";
import { useState } from "react";
import CertificateModal from "@/components/CertificateModal";

// =========================================================
// 1. IMPORTAÇÃO DAS IMAGENS (Necessário para o Vite/Deploy)
// =========================================================

// DIO
import dioPython from "@/assets/certificates/fpf_dio.png";

// UDEMY
import udemyPentest from "@/assets/certificates/pehes_udemy.png";
import udemyWifi from "@/assets/certificates/tdiarsf_udemy.png";
import udemyEthical from "@/assets/certificates/fdeh_udemy.png";

// 4LINUX
import linuxBeginner from "@/assets/certificates/lbico_4linux.png";
import linuxHtml from "@/assets/certificates/mwch_4linux.png";
import linuxFund from "@/assets/certificates/lf_4linux.png";
import linuxDevops from "@/assets/certificates/de_4linux.png";
import linuxBigData from "@/assets/certificates/bde_4linux.png";
import linuxBeginnerDev from "@/assets/certificates/bd_4linux.png";
import linuxLogs from "@/assets/certificates/adl_4linux.png"; 


// =========================================================
// 2. LISTAS DE DADOS (Adicione novos aqui no futuro)
// =========================================================

const dioCerts = [
  { title: "Formação Python Fundamentals", img: dioPython },
];

const udemyCerts = [
  { title: "Pentest e Hacking em Sites", img: udemyPentest },
  { title: "Técnicas de Invasão WiFi", img: udemyWifi },
  { title: "Fundamentos de Ethical Hacking", img: udemyEthical },
];

const fourLinuxCerts = [
  { title: "Linux Beginner In Cloud", img: linuxBeginner },
  { title: "Mundo web com HTML5", img: linuxHtml },
  { title: "Linux Fundamentals", img: linuxFund },
  { title: "DevOps Essentials", img: linuxDevops },
  { title: "Big Data Essentials", img: linuxBigData },
  { title: "Beginners Developer", img: linuxBeginnerDev },
  { title: "Auditoria de Logs", img: linuxLogs },
];

const Education = () => {
  const [modal, setModal] = useState({
    open: false,
    image: "",
    title: "",
  });

  const openCert = (image: string, title: string) => {
    setModal({
      open: true,
      image,
      title,
    });
  };

  // Pequeno componente para criar o botão (evita repetição de código)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CertButton = ({ title, img }: { title: string; img: string }) => (
    <button
      onClick={() => openCert(img, title)}
      className="block hover:text-primary text-left w-full transition-colors"
    >
      • {title}
    </button>
  );

  return (
    <section id="educacao" className="py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* TÍTULO */}
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-3 uppercase tracking-wider">
            Minhas
          </p>
          <h2 className="text-4xl font-bold">
            CERTIFICAÇÕES
          </h2>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* ================= DIO ================= */}
          <div className="glass rounded-2xl p-6 text-center h-full">
            <a href="https://www.dio.me/" target="_blank">
              <img
                src="https://hermes.digitalinnovation.one/assets/diome/logo.png"
                alt="DIO"
                className="h-16 mx-auto mb-6 hover:scale-105 transition"
              />
            </a>
            <div className="text-left space-y-2 text-sm">
              {dioCerts.map((cert, index) => (
                <CertButton key={index} title={cert.title} img={cert.img} />
              ))}
            </div>
          </div>

          {/* ================= UDEMY ================= */}
          <div className="glass rounded-2xl p-6 text-center h-full">
            <a href="https://www.udemy.com/" target="_blank">
              <img
                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg"
                alt="Udemy"
                className="h-16 mx-auto mb-6 hover:scale-105 transition"
              />
            </a>
            <div className="text-left space-y-2 text-sm">
              {udemyCerts.map((cert, index) => (
                <CertButton key={index} title={cert.title} img={cert.img} />
              ))}
            </div>
          </div>

          {/* ================= 4LINUX ================= */}
          <div className="glass rounded-2xl p-6 text-center h-full">
            <a href="https://4linux.com.br/" target="_blank">
              <img
                src="https://4linux.com.br/cursos/wp-content/uploads/sites/2/2021/04/logo-4linux-13.svg"
                alt="4Linux"
                className="mx-auto mb-6 hover:scale-105 transition h-14 object-contain"
              />
            </a>
            <div className="text-left space-y-2 text-sm">
              {fourLinuxCerts.map((cert, index) => (
                <CertButton key={index} title={cert.title} img={cert.img} />
              ))}
            </div>
          </div>

          {/* ================= FORMAÇÃO (Mantido igual) ================= */}
          <div className="md:col-start-2">
            <div className="glass rounded-2xl p-6 text-center h-full flex flex-col">
              <div className="flex items-center justify-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold uppercase">
                  FORMAÇÃO
                </h3>
              </div>
              <div className="text-left space-y-3 text-sm">
                <a
                  href="https://www.uemg.br/ituiutaba"
                  target="_blank"
                  className="block hover:text-primary"
                >
                  • Engenharia da Computação - UEMG
                </a>
                <a
                  href="https://ifgoiano.edu.br/home/index.php/ipameri.html"
                  target="_blank"
                  className="block hover:text-primary"
                >
                  • Técnico em Redes de Computadores - IF
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ================= MODAL ================= */}
        <CertificateModal
          isOpen={modal.open}
          onClose={() => setModal({ ...modal, open: false })}
          image={modal.image}
          title={modal.title}
        />

      </div>
    </section>
  );
};

export default Education;