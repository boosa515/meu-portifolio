import { GraduationCap } from "lucide-react";
import { useState } from "react";
import CertificateModal from "@/components/CertificateModal";

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

              <button
                onClick={() => openCert("src/assets/certificates/formacao_pyton_fundamentals_dio.png", "Formacao Pyton Fundamentals")}
                className="block hover:text-primary"
              >
                • Formacao Pyton Fundamentals
              </button>

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
              <button
                onClick={() => openCert("src/assets/certificates/pentest_e_hacking_em_sites_udemy.png", "Pentest e Hacking em Sites e Aplicações Web")}
                className="block hover:text-primary"
              >
                • Pentest e Hacking em Sites e Aplicações
              </button>
              <button
                onClick={() => openCert("src/assets/certificates/tecnicas_de_invasão_a_redes_sem_fio_udemy.png", "Tecnicas de Invasão a Redes Sem Fio")}
                className="block hover:text-primary"
              >
                • Tecnicas de Invasão a Redes Sem Fio
              </button>
              <button
                onClick={() => openCert("src/assets/certificates/fundamentos_de_ethical_hacking_udemy.png", "Fundamentos de Ethical Hacking")}
                className="block hover:text-primary"
              >
                • Fundamentos de Ethical Hacking
              </button>

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

              <button
                onClick={() => openCert("src/assets/certificates/linux_beginner_in_cloud_online_4linux.png", "Linux Beginner In Cloud")}
                className="block hover:text-primary"
              >
                • Linux Beginner In Cloud
              </button>

              <button
                onClick={() => openCert("src/assets/certificates/mundo_web_com_html5_4linux.png", "Mundo web com HTML5")}
                className="block hover:text-primary"
              >
                • Mundo web com HTML5
              </button>
              <button
                onClick={() => openCert("src/assets/certificates/linux_fundamentals_4linux.png", "Linux Fundamentals")}
                className="block hover:text-primary"
              >
                • Linux Fundamentals
              </button>
               <button
                onClick={() => openCert("src/assets/certificates/devops_essentials_4linux.png", "DevOps Essentials")}
                className="block hover:text-primary"
              >
                • DevOps Essentials
              </button>
              <button
                onClick={() => openCert("src/assets/certificates/big_data_essentials_4linux.png", "Big Data Essentials")}
                className="block hover:text-primary"
              >
                • Big Data Essentials
              </button>
              <button
                onClick={() => openCert("src/assets/certificates/beginners_developer_4linux.png", "Beginners Developer")}
                className="block hover:text-primary"
              >
                • Beginners Developer
              </button>
              <button
                onClick={() => openCert("src/assets/certificates/auditoria_de_logs_4linux.png.png", "Auditoria de Logs")}
                className="block hover:text-primary"
              >
                • Auditoria de Logs
              </button>

            </div>
          </div>

          {/* ================= FORMAÇÃO ================= */}
          <div className="md:col-start-2">
            <div className="glass rounded-2xl p-6 text-center h-full flex flex-col">

              {/* TÍTULO */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold uppercase">
                  FORMAÇÃO
                </h3>
              </div>

              {/* CONTEÚDO */}
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
