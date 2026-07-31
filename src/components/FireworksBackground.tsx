import React, { useEffect, useRef } from 'react';

interface FireworksBackgroundProps {
  className?: string;
  color?: string;
  population?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  decay: number;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
}

export const FireworksBackground: React.FC<FireworksBackgroundProps> = ({
  className = "absolute inset-0 flex items-center justify-center rounded-xl",
  color = "white",
  population = 60,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (containerRef.current && canvas) {
        width = containerRef.current.offsetWidth;
        height = containerRef.current.offsetHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const fireworks: Firework[] = [];

    const palette = color === 'white' 
      ? ['#ffffff', '#00ffc6', '#38bdf8', '#c084fc', '#f472b6'] 
      : ['#000000', '#00ffc6', '#0284c7', '#9333ea'];

    const createFirework = () => {
      const x = Math.random() * width;
      const targetY = Math.random() * (height * 0.45) + height * 0.08;
      const fwColor = palette[Math.floor(Math.random() * palette.length)];

      fireworks.push({
        x,
        y: height,
        targetY,
        vy: -(Math.random() * 3.5 + 6.5),
        color: fwColor,
      });
    };

    const explode = (x: number, y: number, fwColor: string) => {
      const count = Math.floor(population * (0.7 + Math.random() * 0.5));
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 0.8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: fwColor,
          decay: Math.random() * 0.015 + 0.008,
          size: Math.random() * 2 + 1,
        });
      }
    };

    let frameCount = 0;

    const loop = () => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.22)';
      ctx.fillRect(0, 0, width, height);

      frameCount++;
      if (frameCount % 45 === 0 && fireworks.length < 4) {
        createFirework();
      }

      // Update & draw launching fireworks rockets
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.y += fw.vy;

        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = fw.color;
        ctx.fill();

        if (fw.y <= fw.targetY) {
          explode(fw.x, fw.y, fw.color);
          fireworks.splice(i, 1);
        }
      }

      // Update & draw exploding spark particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // smooth gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [population, color]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
    </div>
  );
};

export default FireworksBackground;
