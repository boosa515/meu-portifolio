import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  // APENAS RESTAURAÇÃO. Não salva nada aqui para evitar bugs.
  useLayoutEffect(() => {
    const savedPosition = sessionStorage.getItem("scroll-position-home");
    
    if (savedPosition) {
      // Restaura imediatamente
      window.scrollTo(0, parseInt(savedPosition));
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Index;