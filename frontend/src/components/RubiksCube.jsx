import React, { useEffect, useRef } from 'react';
import '../styles/RubiksCube.css';

const RubiksCube = ({ cubeState, isAnimating, currentMove }) => {
  const cubeRef = useRef(null);

  const faceColors = {
    W: '#ffffff', // White
    Y: '#ffd500', // Yellow
    R: '#ff0000', // Red
    O: '#ff8c00', // Orange
    G: '#00ff00', // Green
    B: '#0000ff'  // Blue
  };

  const renderFace = (faceKey, faceData, className) => {
    return (
      <div key={faceKey} className={`cube-face ${className}`}>
        {faceData.map((color, index) => (
          <div
            key={index}
            className="sticker"
            style={{
              backgroundColor: faceColors[color],
              boxShadow: `inset 0 0 0 2px rgba(0,0,0,0.3)`,
              border: '1px solid rgba(0,0,0,0.2)'
            }}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (currentMove && cubeRef.current) {
      const cube = cubeRef.current;
      cube.classList.add('animating');
      
      setTimeout(() => {
        cube.classList.remove('animating');
      }, 600);
    }
  }, [currentMove]);

  return (
    <div className="cube-container">
      <div 
        ref={cubeRef}
        className={`cube ${isAnimating ? 'animating' : ''}`}
        style={{ '--current-move': currentMove || '' }}
      >
        {/* Front Face (Green) */}
        {renderFace('front', cubeState.front, 'front')}
        
        {/* Back Face (Blue) */}
        {renderFace('back', cubeState.back, 'back')}
        
        {/* Right Face (Red) */}
        {renderFace('right', cubeState.right, 'right')}
        
        {/* Left Face (Orange) */}
        {renderFace('left', cubeState.left, 'left')}
        
        {/* Top Face (White) */}
        {renderFace('top', cubeState.top, 'top')}
        
        {/* Bottom Face (Yellow) */}
        {renderFace('bottom', cubeState.bottom, 'bottom')}
      </div>

      {/* Rotation Controls */}
      <div className="cube-controls">
        <button 
          className="control-btn"
          onClick={() => {
            if (cubeRef.current) {
              const current = cubeRef.current.style.transform || 'rotateX(-20deg) rotateY(-30deg)';
              cubeRef.current.style.transform = current + ' rotateY(90deg)';
            }
          }}
        >
          ↻ Rotate
        </button>
      </div>

      {/* Current Move Indicator */}
      {currentMove && (
        <div className="move-indicator">
          <div className="move-text">
            {currentMove}
          </div>
        </div>
      )}
    </div>
  );
};

export default RubiksCube;