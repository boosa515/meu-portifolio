import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20, // Começa levemente deslocado para baixo
    scale: 0.98 // Começa levemente menor (efeito de profundidade)
  },
  in: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1] // Easing "Cubic Bezier" para suavidade premium
    }
  },
  out: { 
    opacity: 0, 
    y: -20, // Sai subindo levemente
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const PageTransition = ({ children, className }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;