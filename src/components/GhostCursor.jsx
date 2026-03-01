import { useEffect, useState } from "react";

const GhostCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });

  // pega posição do mouse
  useEffect(() => {
    const move = (e) => {
      setTarget({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // suavização (leve, sem travar)
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
      className="fixed pointer-events-none z-50"
      style={{
        transform: `translate(${pos.x - 120}px, ${pos.y - 120}px)`,
        width: 240,
        height: 240,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(0, 255, 200, 0.45) 0%, rgba(0,255,200,0.08) 40%, transparent 70%)",
        filter: "blur(70px)",
        mixBlendMode: "screen", // deixa mais suave no fundo escuro
      }}
    />
  );
};

export default GhostCursor;
