import { useEffect, useState } from "react";

const GhostCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });

  const [isVisible, setIsVisible] = useState(false); // Initially false, or maybe true? Better false so it fades in when mouse enters

  // pega posição do mouse
  useEffect(() => {
    const move = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
      
      const targetEl = document.elementFromPoint(e.clientX, e.clientY);
      const isHero = targetEl && !!targetEl.closest('#hero');
      setIsVisible(isHero);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // suavização
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    let frame;

    const animate = () => {
      setPos((prev) => ({
        x: lerp(prev.x, target.x, 0.08),
        y: lerp(prev.y, target.y, 0.08),
      }));

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <div
      className="hidden md:block fixed pointer-events-none z-[0]" // Change z-[-1] to z-[0] if needed, but keeping original or adding transition class
      style={{
        transform: `translate(${pos.x - 150}px, ${pos.y - 150}px)`,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, hsl(var(--primary) / 0.15) 30%, transparent 60%)",
        filter: "blur(60px)",
        mixBlendMode: "screen", // deixa mais suave no fundo escuro
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.6s ease-in-out",
        zIndex: -1,
      }}
    />
  );
};

export default GhostCursor;
