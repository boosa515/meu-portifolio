import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import GhostCursor from "./components/GhostCursor";
import Background from "./components/Background";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* BACKGROUND GLOBAL */}
      <Background />

      {/* CURSOR */}
      <GhostCursor />

      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:category" element={<ProjectsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
