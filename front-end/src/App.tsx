
import Footer from "./components/footer"
import Header from "./components/header"
import Contact from "./pages/Contact"
import Introdution from "./pages/Introdution"
import UpcomingEvents from "./pages/UpcomingEvents"
import Works from "./pages/Works"



function App() {


  return (
    <main className="gradient-principal">
      <Header/>
      <Introdution/>
      <Works/>
      <UpcomingEvents/>
      <Contact/>
''    <Footer/>
     {
      /* TODO: Continuar trabalhando na estrutura e estilização */
     }
    </main>
  )
}

export default App
