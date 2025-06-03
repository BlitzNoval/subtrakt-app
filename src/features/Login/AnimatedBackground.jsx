import React, { useState } from 'react';
import '../../styles/Login/AnimatedBackground.css';

const AnimatedBackground = () => {
  // Generate falling "minus" shaped rectangles
  const generateSquares = () => {
    const squares = [];
    for (let i = 0; i < 20; i++) {
      squares.push({
        id: i,
        width: Math.random() * 0 + 100,  // Width: 100-200px
        height: Math.random() * 20 + 20,   // Height: 20-40px (thin)
        left: Math.random() * 80,
        delay: Math.random() * 0,
        duration: Math.random() * 4 + 4
      });
    }
    return squares;
  };

  const [squares] = useState(generateSquares());

  return (
    <div className="left-section">
      <div className="animated-background">
        {squares.map(square => (
          <div
            key={square.id}
            className="falling-square"
            style={{
              width: `${square.width}px`,
              height: `${square.height}px`,
              left: `${square.left}%`,
              animationDelay: `${square.delay}s`,
              animationDuration: `${square.duration}s`
            }}
          />
        ))}
      </div>
      <div className="brand-section">
        <h1 className="brand-logo">Subtrakt</h1>
      </div>
    </div>
  );
};

export default AnimatedBackground;