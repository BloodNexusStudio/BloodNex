import Spline from '@splinetool/react-spline';
import React from 'react';

const SplineViewer = () => {
  const handleBackClick = () => {
    window.history.back(); // Use browser's native back functionality
  };

  return (
    <div className="spline-viewer-frame">
      <div className="header">
        <button 
          onClick={handleBackClick}
          className="back-button"
          aria-label="Go back"
        >
          ← Back
        </button>
      </div>
      <div className="spline-container">
        <Spline 
          scene="https://prod.spline.design/ZO7BAig6QAuQAdPd/scene.splinecode"
        />
      </div>
      <style jsx>{`
        .spline-viewer-frame {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f0f0f0;
        }

        .header {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid #e0e0e0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
        }

        .back-button {
          padding: 0.5rem 1rem;
          background: #ffffff;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          background: #f5f5f5;
          border-color: #999;
        }

        .spline-container {
          flex: 1;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 60px;
        }
      `}</style>
    </div>
  );
};

export default SplineViewer;