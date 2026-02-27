import { useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";

const ScrollHandler = () => {
  const location = useLocation();
  const navType = useNavigationType();

  // Salva a posição antes de sair da Home
  useEffect(() => {
    // Se estou saindo da Home (path atual é /), salvo a posição
    const handleScroll = () => {
        // Não faz nada, apenas garante que o sessionStorage seja atualizado no unmount
    };
    
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
        // O segredo: setTimeout garante que a página renderizou antes de rolar
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedPosition),
            behavior: "instant" // Importante: instantâneo para não ver a página rolando
          });
        }, 100); // 100ms de atraso para garantir que a animação de entrada já ocupou espaço
      }
    } else {
      // Se for qualquer outra página (Projetos) ou navegação normal (clique no menu)
      // Rola para o topo suavemente ou instantaneamente
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    }
  }, [location.pathname, navType]);

  return null;
};

export default ScrollHandler;