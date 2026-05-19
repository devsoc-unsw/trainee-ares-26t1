import React, { useState, useEffect } from 'react';

const TestSprite = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 6;
  const frameWidth = 100; // Width of one individual frame

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
    }, 150); // Speed of animation

    return () => clearInterval(interval);
  }, []);

  const spriteStyle = {
    width: `${frameWidth}px`,
    height: '100px',
    backgroundImage: "url('/cats/cat-black-side.png')",
    backgroundPosition: `-${currentFrame * frameWidth}px 0px`,
    backgroundRepeat: 'no-repeat',
  };

  return <div style={spriteStyle} />;
};

export default TestSprite;