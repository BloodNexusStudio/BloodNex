import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoading(false); // Set loading to false as soon as hero-1.mp4 is loaded
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Ensure the video loads immediately
    }
  }, []);

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
          <video
            ref={videoRef}
            src="videos/hero-1.mp4"
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <div className="absolute left-0 top-0 z-30 size-full">
          <div className="mt-12 px-4 sm:px-8">
            {/* Desktop layout */}
            <div className="hidden sm:block">
              <div className="relative mt-44">
                <div className="flex w-full justify-between">
                  <h1 className="font-roller-coaster-serif hero-heading text-red-blood">BLOOD</h1>
                  <h1 className="font-roller-coaster-serif hero-heading text-white">NEXUS</h1>
                </div>
              </div>
            </div>
            
            {/* Mobile layout */}
            <div className="block sm:hidden">
              <div className="relative mt-44">
                <h1 className="font-roller-coaster-serif hero-heading pl-2 text-red-blood">BLOOD</h1>
                <h1 className="font-roller-coaster-serif hero-heading pr-2 text-white">NEXUS</h1>
              </div>
            </div>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              At BN Studios, we're a passionate team crafting memorable gaming experiences that captivate and inspire players worldwide
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-grey-300 flex-center gap-1"
              onClick={(e) => {
                window.open("https://www.youtube.com/@BloodNexusStudio", "_blank");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
