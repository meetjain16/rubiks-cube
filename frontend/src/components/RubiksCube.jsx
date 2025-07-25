import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { RotateCcw, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import '../styles/RubiksCube.css';

const RubiksCube = ({ cubeState, isAnimating, currentMove, rotation, onRotate }) => {
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
      cube.classList.add('move-animation');
      
      setTimeout(() => {
        cube.classList.remove('move-animation');
      }, 600);
    }
  }, [currentMove]);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.style.transform = 
        `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
    }
  }, [rotation]);

  return (
    <div className="cube-container">
      <div 
        ref={cubeRef}
        className={`cube ${isAnimating ? 'scrambling' : ''}`}
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

      {/* Manual Rotation Controls */}
      <div className="cube-controls">
        <div className="control-grid">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRotate('up')}
            className="control-btn hover:bg-white/20"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          
          <div className="control-row">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRotate('left')}
              className="control-btn hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRotate('reset')}
              className="control-btn hover:bg-white/20"
              title="Reset view"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRotate('right')}
              className="control-btn hover:bg-white/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRotate('down')}
            className="control-btn hover:bg-white/20"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="control-label">Rotate Cube</p>
      </div>

      {/* Current Move Indicator */}
      {currentMove && (
        <div className="move-indicator">
          <div className="move-text">
            {currentMove}
          </div>
          <div className="move-description">
            Step {currentMove}
          </div>
        </div>
      )}
    </div>
  );
};

export default RubiksCube;