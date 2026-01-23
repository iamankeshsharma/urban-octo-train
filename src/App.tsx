import NavigationBar from "./components/NavigationBar";
import { navLinks } from "./constants";

function App() {

  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-900 text-white p-4">
      <NavigationBar links={navLinks} />
    </div >
  )
}

export default App
