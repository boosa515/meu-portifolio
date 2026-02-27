import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// DESLIGA o controle automático do navegador.
// Agora nós somos os únicos responsáveis pelo scroll.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById("root")!).render(<App />);