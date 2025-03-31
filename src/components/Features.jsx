import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";

const videoSources = [
  "videos/hero-6.mp4",
  "videos/beam.mp4",
  "videos/SHIP.mp4",
];

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, onEnded }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop={false} // Disable loop because we handle switching manually
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
        onEnded={onEnded} // Switch to next video when current one ends
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Function to switch to the next video in loop
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Welcome to Blood Nexus Studios,
          </p>
          <p className="max-w-full p-4 font-circular-web text-lg text-blue-50 opacity-50">
            Step into the abyss of creativity at Blood Nexus Studios, where jaw-dropping visuals, 
            heart-pounding gameplay, and cutting-edge innovation collide. From AAA-quality game design 
            to mind-blowing CGI and VFX, we craft immersive worlds and unforgettable experiences that 
            push the boundaries of imagination—across mobile, PC, consoles, and beyond. Ready to be captivated?
          </p>
        </div>

        {/* First card: Cycles through three videos in a loop */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src={videoSources[currentVideoIndex]}
            title={
              <>
                A<b>A</b>A <b>Q</b>uality
              </>
            }
            description="Asset creation and environment design."
            onEnded={handleVideoEnd} // Switch video when current one ends
          />
        </BentoTilt>

        {/* Other cards remain as they are */}
        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/features-6.mp4"
              title={
                <>
                  Cha<b>ra</b>cter
                  D<b>esi</b>gn
                </>
              }
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/hero-3.mp4"
              title={
                <>
                  <b>S</b>tyli<b>z</b>ed
                </>
              }
              description="Game ready assets."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/hero-2.mp4"
              title={
                <>
                  <b>L</b>ow <b>P</b>oly
                </>
              }
              description="High Detailed Assets & Animation."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                S<b>t</b>ay tu<b>n</b>ed for up<b>d</b>ates.
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/hero-4.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
