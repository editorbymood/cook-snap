import React, { useEffect, useRef } from 'react';

interface FoodItem {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  image: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface FloatingFoodElementsProps {
  className?: string;
  count?: number;
  speed?: number;
  sizeRange?: [number, number];
  opacityRange?: [number, number];
}

const FloatingFoodElements: React.FC<FloatingFoodElementsProps> = ({
  className = '',
  count = 30,
  speed = 1.2,
  sizeRange = [15, 30],
  opacityRange = [0.2, 0.4]
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const foodItems = useRef<FoodItem[]>([]);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize food items with more variety
    const foodImages = [
      '🍕', '🍔', '🍟', '🌭', '🍿', '🥪', '🌮', '🌯', '🥗', '🍜',
      '🍝', '🍛', '🍣', '🍱', '🥘', '🍲', '🍤', '🍗', '🥩', '🍖',
      '🍚', '🍙', '🍘', '🍥', '🥮', '🍡', '🥟', '🍢', '🍧', '🍨',
      '🍦', '🥧', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩',
      '🥐', '🥖', '🥨', '🧀', '🍅', '🥑', '🥦', '🥕', '🌽', '🥬'
    ];

    foodItems.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * speed,
      dy: (Math.random() - 0.5) * speed,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      image: foodImages[Math.floor(Math.random() * foodImages.length)],
      opacity: Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      foodItems.current.forEach(item => {
        // Update position
        item.x += item.dx;
        item.y += item.dy;
        item.rotation += item.rotationSpeed;

        // Bounce off walls
        if (item.x < 0 || item.x > canvas.width) item.dx *= -1;
        if (item.y < 0 || item.y > canvas.height) item.dy *= -1;

        // Draw emoji with rotation and opacity
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.globalAlpha = item.opacity;
        ctx.font = `${item.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.image, 0, 0);
        ctx.restore();
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [count, speed, sizeRange, opacityRange]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        zIndex: 0,
        mixBlendMode: 'multiply',
        filter: 'blur(0.5px)'
      }}
    />
  );
};

export default FloatingFoodElements; 