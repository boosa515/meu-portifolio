import { useState, useEffect } from "react";
import { Code2, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Lê o tema salvo no navegador (localStorage) para manter em todas as páginas
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  // Lógica da cor da barra ao rolar a página
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lógica para aplicar o tema e salvar a escolha do usuário
  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [isLight]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <Code2 className="w-6 h-6 text-primary transition-all group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
        </a>
        {/* Lado Direito: Apenas o botão de tema */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLight(!isLight)}
            className="p-2 text-foreground hover:text-primary transition-colors"
            title="Alternar Tema"
          >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;