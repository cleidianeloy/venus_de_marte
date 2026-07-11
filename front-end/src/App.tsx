import {
  useRef
} from 'react';
import Header from "./components/Header"
import About from "./pages/About"
import Agenda from "./pages/Agenda"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import useScrollProgress from './utils/progress';



function App() {
  // distância (em px) de scroll até a animação completar 100%
// ajuste esse valor conforme o "ritmo" que quiser
  const SCROLL_DISTANCE = 400;
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef, SCROLL_DISTANCE);
  return (
    <main ref={sectionRef}>
      <Header progress={progress}/>
      <Home/>
      <About/>
      <Projects/>
      <Agenda/>
      <Contact/>
     {
      /* TODO: Continuar trabalhando na estrutura e estilização */
     }
    </main>
  )
}

export default App
