import { useRef, useEffect, useState } from "react";
import Header from "./components/header/Header";
import About from "./pages/About";
import Agenda from "./pages/Agenda";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import useScrollProgress from './utils/progress';

export interface SectionInfo {
  id: string;
  name: string;
}

function App() {
  const SCROLL_DISTANCE = 400;
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef, SCROLL_DISTANCE);

  // Estados para as informações que dependem do DOM
  const [sectionsInformations, setSectionsInformations] = useState<SectionInfo[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. Busca as seções APÓS o DOM estar pronto
    const sectionElements = sectionRef.current.querySelectorAll<HTMLElement>("section[id]");

    // 2. Extrai as informações dos atributos data-name
    const infos: SectionInfo[] = Array.from(sectionElements).map((section) => ({
      id: section.id,
      name: section.getAttribute("data-name") || "",
    }));

    setSectionsInformations(infos);

    // 3. Configura o Observador
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // 0.2 funciona muito melhor para telas longas ou mobile
        threshold: 0.2, 
      }
    );

    // 4. Inicia a observação
    sectionElements.forEach((section) => observer.observe(section));

    // 5. Cleanup
    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <main ref={sectionRef}>
      <Header 
        progress={progress} 
        activeSection={activeSection} 
        sections={sectionsInformations} 
      />
      <Home />
      <About />
      <Projects />
      <Agenda />
      <Contact />
    </main>
  );
}

export default App;