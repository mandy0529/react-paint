import React, {useEffect, useRef, useState} from 'react';

function App() {
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, serColor] = useState('#bbb');
  const [line, setLine] = useState(10);
  const [context, setContext] = useState(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [hue, setHue] = useState(0);
  const [direction, setDirection] = useState(true);

  const handleCanvas = () => {
    const canvas = canvasRef.current;
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = line;
    ctx.lineCap = 'round';
    setContext(ctx);
  };
  const directionChange = () => {
    setDirection(!direction);
  };
  const draw = (e) => {
    if (!isDrawing) return;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    setLastX(e.clientX);
    setLastY(e.clientY);
    serColor(`hsl(${hue},100%,50%)`);
    setHue(hue + 1);
    if (hue >= 360) {
      setHue(0);
    }
    if (context.lineWidth >= 50 || context.lineWidth <= 1) {
      directionChange();
    }
    if (direction) {
      console.log({direction}, '내려감');
      console.log(context.lineWidth, 'context');
      context.lineWidth++;
    } else {
      console.log({direction}, '올라감');
      console.log(context.lineWidth, 'context');
      context.lineWidth--;
    }
  };

  const drawing = (e) => {
    setIsDrawing(true);
    setLastX(e.clientX);
    setLastY(e.clientY);
  };

  useEffect(() => {
    console.log({direction}, 'dirction');
  }, [direction]);
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    handleCanvas();
  }, []);

  return (
    <canvas
      id="canvas"
      onMouseMove={draw}
      onMouseDown={drawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      ref={canvasRef}
    ></canvas>
  );
}

export default App;
