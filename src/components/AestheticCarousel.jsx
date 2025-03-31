import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AestheticCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoPlayRef = useRef(null);
    const transitionDuration = 500; // in ms
    
    // Updated carousel items with your image paths
    const carouselItems = [
      {
        id: 1,
        imageUrl: "/img/c1.png",
        title: "Immersive Worlds",
        description: "Explore breathtaking landscapes and environments"
      },
      {
        id: 2,
        imageUrl: "/img/c2.jpeg",
        title: "Epic Characters",
        description: "Encounter unforgettable heroes and villains"
      },
      {
        id: 3,
        imageUrl: "/img/c3.png",
        title: "Thrilling Combat",
        description: "Experience intense and dynamic battle systems"
      },
      {
        id: 4,
        imageUrl: "/img/c4.png",
        title: "Stunning Visuals",
        description: "Witness next-generation graphics and effects"
      }
    ];
  
    const nextSlide = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
        setTimeout(() => setIsTransitioning(false), transitionDuration);
      }
    };
  
    const prevSlide = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
        setTimeout(() => setIsTransitioning(false), transitionDuration);
      }
    };
  
    const goToSlide = (index) => {
      if (!isTransitioning && index !== activeIndex) {
        setIsTransitioning(true);
        setActiveIndex(index);
        setTimeout(() => setIsTransitioning(false), transitionDuration);
      }
    };
  
    // Auto-play functionality
    useEffect(() => {
      autoPlayRef.current = nextSlide;
    }, []);
  
    useEffect(() => {
      const play = () => {
        autoPlayRef.current();
      };
  
      const interval = setInterval(play, 5000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative w-full bg-black overflow-hidden">
        {/* Stylish header section */}
        <div className="relative py-16 px-8 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="mx-auto max-w-6xl">
            <div className="relative z-10">
              <h2 className="text-sm text-red-600 font-semibold uppercase tracking-widest mb-2">Experience the World of</h2>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl sm:text-6xl font-bold text-red-600">BLOOD</span>
                
                <span className="text-4xl sm:text-6xl font-bold text-white">NEXUS</span>
              </div>
              <p className="text-lg text-gray-300 max-w-full">
                Step into a realm where dark fantasy and visceral combat merge, creating an unforgettable journey through a world on the edge of chaos.
              </p>
              
              {/* Animated decoration line */}
              <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-50"></div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/20 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-red-700/30 rounded-full filter blur-2xl opacity-20"></div>
        </div>
        
        {/* Main carousel container */}
        <div className="relative h-[80vh] w-full">
          {/* Carousel items */}
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                activeIndex === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
              }`}
            >
              {/* Background image with subtle zoom effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10000ms] ease-out"
                style={{ 
                  backgroundImage: `url(${item.imageUrl})`,
                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)'
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Text content */}
              <div className="absolute bottom-0 left-0 w-full p-8 pb-16 sm:p-16 text-white z-30">
                <h2 className="text-4xl sm:text-6xl font-bold mb-2 opacity-0 translate-y-4 animate-fadeIn" 
                    style={{ 
                      animationDelay: activeIndex === index ? '300ms' : '0ms',
                      animationFillMode: 'forwards',
                      animationDuration: '800ms'
                    }}>
                  {item.title}
                </h2>
                <p className="text-xl sm:text-2xl max-w-lg opacity-0 translate-y-4 animate-fadeIn"
                   style={{ 
                     animationDelay: activeIndex === index ? '500ms' : '0ms',
                     animationFillMode: 'forwards',
                     animationDuration: '800ms'
                   }}>
                  {item.description}
                </p>
                
                {/* Call to action button */}
                <button className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded opacity-0 translate-y-4 animate-fadeIn transition-colors"
                       style={{ 
                         animationDelay: activeIndex === index ? '700ms' : '0ms',
                         animationFillMode: 'forwards',
                         animationDuration: '800ms'
                       }}>
                  Discover More
                </button>
              </div>
            </div>
          ))}
          
          {/* Navigation controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          
          {/* Custom progress indicators */}
          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 space-x-4">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'w-12 bg-red-600' : 'w-3 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  

export default AestheticCarousel;