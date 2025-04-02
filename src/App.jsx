import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ImageSequence from "./components/ImageSequence";
import AestheticCarousel from "./components/AestheticCarousel";
import SplineViewer from "./components/SplineViewer"; // Added SplineViewer import
//import Cube from "./components/Cube";

function App() {
  // Check if "/play" is in the current URL path
  const showSplineViewer = window.location.pathname.includes("/play");

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {showSplineViewer ? (
        <SplineViewer />
      ) : (
        <>
          <NavBar />
          <Hero />
          <About />
          <Features />
          <AestheticCarousel />
          <Story />
          {/* <Cube /> */}
          <Contact />
          <Footer />
          <ImageSequence />
        </>
      )}
    </main>
  );
}

export default App;
