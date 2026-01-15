'use client';
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
  phase: number;
}

export default function MyceliumNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      // Re-initialize nodes on resize
      initNodes();
    };

    const initNodes = () => {
      const isMobile = window.innerWidth < 768;
      const nodeCount = isMobile ? 12 : 20; // Drastically reduced for performance
      nodesRef.current = Array.from({ length: nodeCount }, () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.1, // Even slower
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 1.5 + 0.5,
          phase: Math.random() * Math.PI * 2
        };
      });
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    const targetFPS = 24; // Lower FPS for background animation (more cinematic & battery friendly)
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);
        timeRef.current += 0.008; // Slower time step

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Update nodes
        nodesRef.current.forEach(node => {
          node.x = node.baseX + Math.sin(timeRef.current + node.phase) * 20;
          node.y = node.baseY + Math.cos(timeRef.current * 0.8 + node.phase) * 15;
          
          node.baseX += node.vx;
          node.baseY += node.vy;

          if (node.baseX < -100) node.baseX = window.innerWidth + 100;
          if (node.baseX > window.innerWidth + 100) node.baseX = -100;
          if (node.baseY < -100) node.baseY = window.innerHeight + 100;
          if (node.baseY > window.innerHeight + 100) node.baseY = -100;
        });

        // Simplified drawing - only lines within distance
        const maxDistance = 220;
        ctx.lineCap = 'round';
        
        nodesRef.current.forEach((node, i) => {
          nodesRef.current.slice(i + 1).forEach((otherNode) => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq < maxDistance * maxDistance) {
              const distance = Math.sqrt(distanceSq);
              const opacity = (1 - distance / maxDistance) * 0.08;

              ctx.beginPath();
              ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y); // Use straight lines for performance
              ctx.stroke();
            }
          });
        });

        // Draw nodes simple
        nodesRef.current.forEach(node => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(212, 168, 87, 0.3)';
          ctx.fill();
        });
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
