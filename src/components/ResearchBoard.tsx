"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BOARD_H,
  BOARD_W,
  connections,
  notes,
  type BoardNote,
} from "@/lib/board-data";
import Pendulum from "./Pendulum";

const STORAGE_KEY = "lab-board-positions-v1";
const NOTE_W = 216;
const NOTE_H = 150; // approximate; used for clamping + string anchors

type Positions = Record<string, { x: number; y: number }>;

const COLOR_CLASS: Record<BoardNote["color"], string> = {
  yellow: "bg-stickyYellow",
  blue: "bg-stickyBlue",
  pink: "bg-stickyPink",
};

function defaultPositions(): Positions {
  const p: Positions = {};
  for (const n of notes) p[n.id] = { x: n.x, y: n.y };
  return p;
}

export default function ResearchBoard() {
  const [pos, setPos] = useState<Positions>(defaultPositions);
  const [dragId, setDragId] = useState<string | null>(null);
  const dragOffset = useRef({ dx: 0, dy: 0 });
  const boardRef = useRef<HTMLDivElement>(null);

  // hydrate saved layout after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Positions;
        setPos((prev) => {
          const next = { ...prev };
          for (const id of Object.keys(next)) {
            if (parsed[id]) next[id] = parsed[id];
          }
          return next;
        });
      }
    } catch {
      /* corrupted storage — keep defaults */
    }
  }, []);

  const save = useCallback((p: Positions) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      /* storage unavailable — fine, layout just won't persist */
    }
  }, []);

  const onPointerDown = (id: string) => (e: React.PointerEvent) => {
    // let links inside notes stay clickable
    if ((e.target as HTMLElement).closest("a")) return;
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    const p = pos[id];
    dragOffset.current = {
      dx: e.clientX - rect.left - p.x,
      dy: e.clientY - rect.top - p.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragId(id);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragId) return;
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    const x = Math.min(
      Math.max(e.clientX - rect.left - dragOffset.current.dx, 4),
      BOARD_W - NOTE_W - 4
    );
    const y = Math.min(
      Math.max(e.clientY - rect.top - dragOffset.current.dy, 4),
      BOARD_H - NOTE_H - 4
    );
    setPos((prev) => ({ ...prev, [dragId]: { x, y } }));
  };

  const endDrag = () => {
    if (dragId) {
      setPos((prev) => {
        save(prev);
        return prev;
      });
    }
    setDragId(null);
  };

  const reset = () => {
    const d = defaultPositions();
    setPos(d);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  };

  // anchor for the red string: roughly where the pin/tape sits
  const anchor = (id: string) => {
    const p = pos[id];
    return { x: p.x + NOTE_W / 2, y: p.y + 10 };
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div
        ref={boardRef}
        className="graph-paper relative mx-auto rounded-sm border border-ink/20 shadow-[inset_0_0_60px_rgba(22,50,79,0.06)]"
        style={{ width: BOARD_W, height: BOARD_H, touchAction: "none" }}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* ---------- penciled section headings ---------- */}
        <div className="pointer-events-none absolute left-8 top-6 select-none">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-graphite/80 underline decoration-graphite/40 underline-offset-8">
            What I&apos;ve built
          </p>
        </div>
        <div className="pointer-events-none absolute right-8 top-6 select-none text-right">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-graphite/80 underline decoration-graphite/40 underline-offset-8">
            What I&apos;m thinking about
          </p>
        </div>

        {/* ---------- red string layer ---------- */}
        <svg
          className="pointer-events-none absolute inset-0"
          width={BOARD_W}
          height={BOARD_H}
          aria-hidden="true"
        >
          {connections.map((c) => {
            const a = anchor(c.from);
            const b = anchor(c.to);
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 + 46; // gravity sag
            return (
              <g key={`${c.from}-${c.to}`}>
                <path
                  d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                  fill="none"
                  stroke="#B3261E"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                {c.label && (
                  <text
                    x={mx}
                    y={my - 8}
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#8E1F16"
                    transform={`rotate(-2 ${mx} ${my})`}
                  >
                    {c.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* ---------- taped sketch: RBM diagram ---------- */}
        <div
          className="pointer-events-none absolute select-none bg-white/90 p-3 shadow-note"
          style={{ left: 500, top: 300, transform: "rotate(1.4deg)", width: 200 }}
        >
          <span className="tape" style={{ left: 58, top: -12, transform: "rotate(-3deg)" }} />
          <svg viewBox="0 0 180 120" width="176" height="118" aria-label="Sketch of a restricted Boltzmann machine">
            {[0, 1, 2, 3].map((i) =>
              [0, 1, 2].map((j) => (
                <line
                  key={`${i}-${j}`}
                  x1={30 + i * 40}
                  y1={95}
                  x2={50 + j * 40}
                  y2={30}
                  stroke="#16324F"
                  strokeWidth="0.8"
                  opacity="0.55"
                />
              ))
            )}
            {[0, 1, 2, 3].map((i) => (
              <circle key={`v${i}`} cx={30 + i * 40} cy={95} r={7} fill="#FBFAF4" stroke="#16324F" strokeWidth="1.4" />
            ))}
            {[0, 1, 2].map((j) => (
              <circle key={`h${j}`} cx={50 + j * 40} cy={30} r={7} fill="#CDE8F6" stroke="#16324F" strokeWidth="1.4" />
            ))}
            <text x="8" y="99" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="#41403C">σ</text>
            <text x="8" y="34" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="#41403C">h</text>
          </svg>
          <p className="margin-note mt-1 text-base">ψ(σ) = Σ_h e^{"{...}"} — a wavefunction with hidden units</p>
        </div>

        {/* ---------- taped live experiment: double pendulum ---------- */}
        <div
          className="absolute bg-white/90 p-2 shadow-note"
          style={{ left: 505, top: 620, transform: "rotate(-1.6deg)" }}
        >
          <span className="tape" style={{ left: 70, top: -12, transform: "rotate(2deg)" }} />
          <Pendulum />
          <p className="px-1 pb-1 font-mono text-[10px] uppercase tracking-widest text-graphite/70">
            exp. 07 — sensitive dependence
          </p>
        </div>

        {/* ---------- paper-clipped index card ---------- */}
        <div
          className="pointer-events-none absolute select-none bg-white p-3 shadow-note"
          style={{ left: 500, top: 90, width: 210, transform: "rotate(-0.8deg)" }}
        >
          {/* paper clip */}
          <svg
            className="absolute -top-4 left-6"
            width="18"
            height="40"
            viewBox="0 0 18 40"
            aria-hidden="true"
          >
            <path
              d="M5 8 v22 a4 4 0 0 0 8 0 V6 a6 6 0 0 0 -12 0 v26"
              fill="none"
              stroke="#7d8a94"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="font-mono text-[11px] uppercase tracking-widest text-graphite/70">
            standing rule
          </p>
          <p className="mt-1 font-hand text-xl leading-snug text-ink">
            Build the thing before deciding whether it&apos;s a career.
          </p>
        </div>

        {/* ---------- sticky notes ---------- */}
        {notes.map((n) => {
          const p = pos[n.id];
          const dragging = dragId === n.id;
          return (
            <div
              key={n.id}
              role="group"
              aria-label={`${n.section === "built" ? "Built" : "Thinking about"}: ${n.title}`}
              className={`sticky-note absolute cursor-grab select-none p-4 pt-5 ${COLOR_CLASS[n.color]} ${
                dragging ? "dragging" : ""
              }`}
              style={{
                left: p.x,
                top: p.y,
                width: NOTE_W,
                transform: `rotate(${dragging ? 0 : n.rotate}deg)`,
                zIndex: dragging ? 30 : 10,
              }}
              onPointerDown={onPointerDown(n.id)}
            >
              {n.fastener === "pin" ? (
                <span className="pin" style={{ left: NOTE_W / 2 - 7, top: -6 }} />
              ) : (
                <span
                  className="tape"
                  style={{ left: NOTE_W / 2 - 42, top: -12, transform: "rotate(-2deg)" }}
                />
              )}
              <p className="font-mono text-[10px] uppercase tracking-widest text-graphite/60">
                {n.section === "built" ? "built" : "thinking"}
              </p>
              <h3 className="mt-1 font-mono text-sm font-semibold leading-snug text-ink">
                {n.href ? (
                  <Link href={n.href} className="underline decoration-dotted underline-offset-2 hover:text-string">
                    {n.title}
                  </Link>
                ) : (
                  n.title
                )}
              </h3>
              <p className="mt-2 font-hand text-lg leading-snug text-graphite">
                {n.body}
              </p>
            </div>
          );
        })}

        {/* ---------- reset ---------- */}
        <button
          onClick={reset}
          className="absolute bottom-4 left-4 border border-ink/30 bg-paper px-3 py-1.5 font-mono text-xs text-graphite shadow-note hover:text-string focus-visible:outline focus-visible:outline-2 focus-visible:outline-string"
        >
          re-pin everything
        </button>

        <p className="pointer-events-none absolute bottom-4 right-4 select-none font-hand text-lg text-graphite/60">
          drag the notes around — your layout is saved in your browser
        </p>
      </div>
    </div>
  );
}
