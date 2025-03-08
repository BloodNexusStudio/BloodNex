import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState, useCallback } from "react";
import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoCache, setVideoCache] = useState({});
  
  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const videoRefs = useRef([]);

  // Cache videos in localStorage
  const cacheVideo = useCallback(async (index) => {
    const videoKey = `hero-video-${index}`;
    if (!localStorage.getItem(videoKey)) {
      try {
        const response = await fetch(`videos/hero-${index}.mp4`);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          localStorage.setItem(videoKey, reader.result);
          setVideoCache(prev => ({ ...prev, [index]: reader.result }));
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Video caching failed:', error);
      }
    } else {
      setVideoCache(prev => ({ 
        ...prev, 
        [index]: localStorage.getItem(videoKey) 
      }));
    }
  }, []);

  // Preload all videos on mount
  useEffect(() => {
    for (let i = 1; i <= totalVideos; i++) {
      cacheVideo(i);
    }
    
    // Check if all videos are cached
    const checkLoading = setInterval(() => {
      if (Object.keys(videoCache).length === totalVideos) {
        setLoading(false);
        clearInterval(checkLoading);
      }
    }, 100);

    return () => clearInterval(checkLoading);
  }, [cacheVideo]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVdRef.current?.play(),
      });
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, {
    dependencies: [currentIndex],
    revertOnUpdate: true,
  });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => {
    return videoCache[index] || `videos/hero-${index}.mp4`;
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />
          
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-20 px-4 sm:px-10">
            {/* Add your content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;