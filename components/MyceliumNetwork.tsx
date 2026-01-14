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
      const nodeCount = 30; // Reduced for better performance
      nodesRef.current = Array.from({ length: nodeCount }, () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.15, // Slower movement
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2
        };
      });
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    const targetFPS = 30; // Cap at 30fps for smoother, battery-friendly animation
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);
        timeRef.current += 0.01;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Update nodes with smooth sine-based movement
        nodesRef.current.forEach(node => {
          // Smooth floating motion using sine waves
          node.x = node.baseX + Math.sin(timeRef.current + node.phase) * 30;
          node.y = node.baseY + Math.cos(timeRef.current * 0.7 + node.phase) * 20;
          
          // Slowly drift the base position
          node.baseX += node.vx;
          node.baseY += node.vy;

          // Wrap around edges smoothly
          if (node.baseX < -50) node.baseX = window.innerWidth + 50;
          if (node.baseX > window.innerWidth + 50) node.baseX = -50;
          if (node.baseY < -50) node.baseY = window.innerHeight + 50;
          if (node.baseY > window.innerHeight + 50) node.baseY = -50;
        });

        // Draw connections with stable curves (no random jitter)
        const maxDistance = 180;
        ctx.lineCap = 'round';
        
        nodesRef.current.forEach((node, i) => {
          nodesRef.current.slice(i + 1).forEach((otherNode) => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              const opacity = (1 - distance / maxDistance) * 0.12;

              // Gradient line (gold to emerald)
              const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
              gradient.addColorStop(0, `rgba(212, 168, 87, ${opacity})`);
              gradient.addColorStop(0.5, `rgba(110, 231, 183, ${opacity})`);
              gradient.addColorStop(1, `rgba(16, 185, 129, ${opacity})`);

              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.6;
              ctx.moveTo(node.x, node.y);

              // Smooth, deterministic curve based on positions
              const midX = (node.x + otherNode.x) / 2;
              const midY = (node.y + otherNode.y) / 2;
              const offset = Math.sin((node.phase + otherNode.phase) * 2) * 15;
              ctx.quadraticCurveTo(midX + offset, midY - offset, otherNode.x, otherNode.y);

              ctx.stroke();
            }
          });
        });

        // Draw nodes with soft glow
        nodesRef.current.forEach(node => {
          // Outer glow
          const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 4);
          glowGradient.addColorStop(0, 'rgba(212, 168, 87, 0.3)');
          glowGradient.addColorStop(1, 'rgba(212, 168, 87, 0)');
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(212, 168, 87, 0.5)';
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
