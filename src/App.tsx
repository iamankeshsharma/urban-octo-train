import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import { navLinks } from "./constants";
import { experiences } from "./constants";


function App() {

  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-900 text-white p-4">
      <NavigationBar links={navLinks} className="bg-neutral-900 fixed top-0 left-0 right-0 z-50" />
      <HeroSection id="home" />
      <ExperienceSection data={experiences} id="experience" />
    </div >
  )
}

export default App
