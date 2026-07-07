"use client";

import { useEffect, useRef } from "react";

/**
 * A tiny double pendulum integrated with RK4-ish stepping, drawn in ink.
 * It's chaotic, so every visit looks slightly different — which is the point.
 * Respects prefers-reduced-motion (renders a static frame instead).
 */
export default function Pendulum({ width = 220, height = 170 }: { width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // state: angles + angular velocities
    let a1 = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
    let a2 = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
    let w1 = 0;
    let w2 = 0;
    const m1 = 1, m2 = 1, l1 = 42, l2 = 42, g = 9.81;
    const ox = width / 2;
    const oy = 34;
    const trace: { x: number; y: number }[] = [];

    function derivs(a1: number, a2: number, w1: number, w2: number) {
      const d = a1 - a2;
      const den = 2 * m1 + m2 - m2 * Math.cos(2 * d);
      const dw1 =
        (-g * (2 * m1 + m2) * Math.sin(a1) -
          m2 * g * Math.sin(a1 - 2 * a2) -
          2 * Math.sin(d) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(d))) /
        (l1 * den);
      const dw2 =
        (2 *
          Math.sin(d) *
          (w1 * w1 * l1 * (m1 + m2) +
            g * (m1 + m2) * Math.cos(a1) +
            w2 * w2 * l2 * m2 * Math.cos(d))) /
        (l2 * den);
      return [dw1, dw2];
    }

    function step(dt: number) {
      const [dw1, dw2] = derivs(a1, a2, w1, w2);
      w1 += dw1 * dt;
      w2 += dw2 * dt;
      a1 += w1 * dt;
      a2 += w2 * dt;
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const x1 = ox + l1 * Math.sin(a1);
      const y1 = oy + l1 * Math.cos(a1);
      const x2 = x1 + l2 * Math.sin(a2);
      const y2 = y1 + l2 * Math.cos(a2);

      // trace of the second bob, fading like a pen line
      trace.push({ x: x2, y: y2 });
      if (trace.length > 260) trace.shift();
      ctx.beginPath();
      trace.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = "rgba(179, 38, 30, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // rods
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#16324F";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // pivot + bobs
      for (const [x, y, r] of [
        [ox, oy, 2.5],
        [x1, y1, 5],
        [x2, y2, 5],
      ] as const) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "#16324F";
        ctx.fill();
      }
    }

    let raf = 0;
    function loop() {
      for (let i = 0; i < 3; i++) step(1 / 180);
      draw();
      raf = requestAnimationFrame(loop);
    }

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(raf);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      role="img"
      aria-label="A small double pendulum simulation tracing a chaotic path"
    />
  );
}
