import { useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";

const ScrollHandler = () => {
  const location = useLocation();
  const navType = useNavigationType();

  // Salva a posição antes de sair da Home
  useEffect(() => {
    // O return do useEffect roda quando o componente desmonta (ao mudar de página)
    return () => {
      if (location.pathname === "/") {
        sessionStorage.setItem("scroll-position-home", window.scrollY.toString());
      }
    };
  }, [location.pathname]);

  useLayoutEffect(() => {
    // Se for a página Home ('/') e a navegação for do tipo POP (botão voltar do navegador ou navigate(-1))
    if (location.pathname === "/" && navType === "POP") {
      const savedPosition = sessionStorage.getItem("scroll-position-home");
      
      if (savedPosition) {
        // PASSO IMPORTANTE: Desativa temporariamente o scroll-behavior smooth do CSS global
        // Isso impede que o navegador tente animar a rolagem até a posição salva
        document.documentElement.style.scrollBehavior = "auto";

        // O setTimeout garante que a página renderizou antes de rolar
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedPosition),
            behavior: "instant" // Força o pulo instantâneo
          });

          // Reativa a rolagem suave (smooth) um pouco depois, para que as próximas interações voltem ao normal
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = "smooth";
          }, 50);
          
        }, 100); // Mantém o atraso de 100ms para sincronizar com a entrada da página
      }
    } else {
      // Se for qualquer outra página ou navegação normal
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    }
  }, [location.pathname, navType]);

  return null;
};

export default ScrollHandler;