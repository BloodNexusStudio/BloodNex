import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ImageSequence from "./components/ImageSequence";
import AestheticCarousel from "./components/AestheticCarousel";
//import Cube from "./components/Cube";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar  />
      <Hero/>
      <About />
      <Features />
      <AestheticCarousel />
      <Story />
      {/* <Cube /> */}
      <Contact />
      <Footer />
      <ImageSequence/>
    </main>
  );
}

export default App;
