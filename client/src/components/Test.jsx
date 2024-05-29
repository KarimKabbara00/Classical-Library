import React, { useState, useEffect } from 'react';
import { useSprings, animated } from '@react-spring/web';

const UpDownImageAnimation = () => {
  const [toggle, setToggle] = useState(false);

  const upConfig = { tension: 200, friction: 20 }; // Faster config
  const downConfig = { tension: 100, friction: 30 }; // Slower config

  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150"
  ];

  const springs = useSprings(
    images.length,
    images.map((_, i) => ({
      to: { transform: toggle ? 'translateY(0%)' : 'translateY(100%)' },
      from: { transform: 'translateY(0%)' },
      config: toggle ? upConfig : downConfig,
      delay: i * 300 // Stagger the animations by 300ms
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setToggle(prev => !prev);
    }, 2000); // Toggle every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      {springs.map((props, index) => (
        <animated.img
          key={index}
          src={images[index]}
          alt={`Animated ${index + 1}`}
          style={{
            width: '150px',
            height: '150px',
            margin: '10px',
            ...props,
          }}
        />
      ))}
    </div>
  );
};

export default UpDownImageAnimation;
