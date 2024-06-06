import React, { useState } from 'react';

const FillableDiv = () => {
  const [fillColor, setFillColor] = useState('transparent');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [fillWidth, setFillWidth] = useState(0);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      const div = event.target;
      const rect = div.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const fillPercentage = (mouseX / rect.width) * 100;
      setFillWidth(fillPercentage);
      div.style.background = `linear-gradient(to right, ${fillColor} ${fillPercentage}%, transparent ${fillPercentage}%)`;
    }
  };

  const handleColorChange = (event) => {
    setFillColor(event.target.value);
  };

  return (
    <div
      className="fillable-div"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <input type="color" value={fillColor} onChange={handleColorChange} />
    </div>
  );
};

export default FillableDiv;
