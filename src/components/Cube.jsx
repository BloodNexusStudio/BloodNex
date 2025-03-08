import React from 'react';

export default function Cube() {
  const styles = {
    scene: {
      perspective: '800px',
      width: '200px',
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '50px auto',
    },
    cube: {
      width: '100px',
      height: '100px',
      position: 'relative',
      transformStyle: 'preserve-3d',
      transform: 'rotateX(-30deg) rotateY(-30deg)',
      animation: 'rotate 5s infinite linear',
    },
    face: {
      position: 'absolute',
      width: '100px',
      height: '100px',
      background: 'rgba(255, 255, 255, 0.8)',
      border: '2px solid #333',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    front: { transform: 'translateZ(50px)', backgroundColor: '#ff6347' },
    back: { transform: 'rotateY(180deg) translateZ(50px)', backgroundColor: '#4682b4' },
    right: { transform: 'rotateY(90deg) translateZ(50px)', backgroundColor: '#3cb371' },
    left: { transform: 'rotateY(-90deg) translateZ(50px)', backgroundColor: '#f0e68c' },
    top: { transform: 'rotateX(90deg) translateZ(50px)', backgroundColor: '#dda0dd' },
    bottom: { transform: 'rotateX(-90deg) translateZ(50px)', backgroundColor: '#ff7f50' },
    keyframes: `
      @keyframes rotate {
        0% {
          transform: rotateX(-30deg) rotateY(-30deg);
        }
        100% {
          transform: rotateX(-30deg) rotateY(330deg);
        }
      }
    `,
  };

  return (
    <div>
      <style>
        {styles.keyframes}
      </style>
      <div style={styles.scene}>
        <div style={styles.cube}>
          <div style={{ ...styles.face, ...styles.front }}>Front</div>
          <div style={{ ...styles.face, ...styles.back }}>Back</div>
          <div style={{ ...styles.face, ...styles.right }}>Right</div>
          <div style={{ ...styles.face, ...styles.left }}>Left</div>
          <div style={{ ...styles.face, ...styles.top }}>Top</div>
          <div style={{ ...styles.face, ...styles.bottom }}>Bottom</div>
        </div>
      </div>
    </div>
  );
}
