import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Routes>
          <Route
            path="/play"
            element={<SplineViewer />}
          />
          <Route
            path="/"
            element={
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
            }
          />
          {/* Optional: Catch-all route for 404 */}
          <Route
            path="*"
            element={
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
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
