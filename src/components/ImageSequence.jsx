// ImageSequence.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  width: 150px;
  height: 150px;
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageSequence = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  function files(index) {
    const data = `
      ./male0001.png
      ./male0002.png
      ./male0003.png
      ./male0300.png
    `;
    return data.split("\n")[index];
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;

    canvas.width = 150;  // Match container size
    canvas.height = 150;

    const frameCount = 300;
    const images = [];
    const imageSeq = {
      frame: 1,
    };

    // Load all images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = files(i);
      images.push(img);
    }

    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.15,
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
      },
      onUpdate: () => render(),
    });

    function render() {
      scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
      if (!img) return;
      
      const canvas = ctx.canvas;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    }

    // Cleanup
    return () => {
      const trigger = ScrollTrigger.getById("imageSequence");
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <Container>
      <StyledCanvas ref={canvasRef} />
    </Container>
  );
};

export default ImageSequence;
