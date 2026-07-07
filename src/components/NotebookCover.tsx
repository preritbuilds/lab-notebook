"use client";

import { useEffect, useRef, useState } from "react";
import SiteNav from "./SiteNav";

/**
 * A full-viewport notebook cover. As the visitor scrolls, the front cover
 * swings open (rotateY around its spine) and reveals the title page, which
 * then hands off to the research board below.
 */
export default function NotebookCover() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 = closed, 1 = fully open
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
        setProgress(total > 0 ? scrolled / total : 1);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const angle = reduced ? 0 : -progress * 130; // degrees around the spine

  return (
    <div ref={wrapRef} style={{ height: reduced ? "auto" : "180vh" }}>
      <div
        className={reduced ? "relative h-screen" : "sticky top-0 h-screen"}
        style={{ perspective: "1800px" }}
      >
        {/* ---------- title page (revealed underneath) ---------- */}
        <div className="ruled-paper absolute inset-0 flex flex-col items-center justify-center px-6">
          {/* red margin line, like a real notebook */}
          <div className="absolute inset-y-0 left-8 w-px bg-string/50 sm:left-16" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-graphite/70">
            Property of
          </p>
          <h1 className="mt-3 font-mono text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            Prerit
          </h1>
          <p className="mt-4 max-w-md text-center font-serif text-graphite">
            Physics &amp; EECS, UC Berkeley. Quantum computing, neural quantum
            states, markets — and the things I build to understand them.
          </p>
          <p className="margin-note mt-6">
            if found, please return — experiments in progress ↓
          </p>
          <div className="mt-10">
            <SiteNav />
          </div>
          <a
            href="#workspace"
            className="mt-14 font-mono text-sm text-string underline decoration-dotted underline-offset-4"
          >
            {reduced ? "enter the workspace ↓" : "keep scrolling — the board is below ↓"}
          </a>
        </div>

        {/* ---------- front cover ---------- */}
        <div
          className="buckram absolute inset-0 flex flex-col items-center justify-center shadow-cover"
          aria-hidden={progress > 0.95}
          style={{
            transformOrigin: "left center",
            transform: `rotateY(${angle}deg)`,
            backfaceVisibility: "hidden",
            pointerEvents: progress > 0.6 ? "none" : "auto",
          }}
        >
          {/* spine shadow */}
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/45 to-transparent" />
          {/* worn edge highlight */}
          <div className="absolute inset-0 border-[6px] border-black/20" />

          {/* pasted label */}
          <div className="relative w-[min(78vw,420px)] rotate-[-1deg] bg-label px-8 py-8 text-center shadow-note">
            <div className="absolute inset-1 border border-ink/30" />
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-graphite">
              Laboratory Notebook
            </p>
            <p className="mt-5 font-mono text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              PRERIT
            </p>
            <p className="mt-4 font-mono text-xs text-graphite">
              № 04 · Berkeley, California
            </p>
            <p className="margin-note mt-3 text-lg">experiments, ideas &amp; loose ends</p>
          </div>

          <p className="absolute bottom-10 animate-bounce font-mono text-xs uppercase tracking-[0.25em] text-label/80">
            scroll to open
          </p>
        </div>
      </div>
    </div>
  );
}
