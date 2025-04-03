import { useState, useEffect } from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ImageSequence from "./components/ImageSequence";
import AestheticCarousel from "./components/AestheticCarousel";
import SplineViewer from "./components/SplineViewer";

function App() {
  const [showSplineViewer, setShowSplineViewer] = useState(
    window.location.pathname.includes("/play")
  );

  useEffect(() => {
    const handlePopState = () => {
      setShowSplineViewer(window.location.pathname.includes("/play"));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
          <Contact />
          <Footer />
          <ImageSequence />
        </>
      )}
    </main>
  );
}

export default App;
