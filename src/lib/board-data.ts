// Everything pinned to the research board lives here.
// Add / edit notes freely — positions are just defaults; visitors can
// rearrange them and their layout is saved in their own browser.

export type NoteColor = "yellow" | "blue" | "pink";

export type BoardNote = {
  id: string;
  section: "built" | "thinking";
  title: string;
  body: string;
  color: NoteColor;
  x: number; // default position on a 1200 x 860 board
  y: number;
  rotate: number; // degrees
  fastener: "pin" | "tape";
  href?: string; // optional link (project page, repo, note…)
};

export type Connection = {
  from: string;
  to: string;
  label?: string;
};

export const BOARD_W = 1200;
export const BOARD_H = 880;

export const notes: BoardNote[] = [
  // ---------- WHAT I'VE BUILT ----------
  {
    id: "nmr",
    section: "built",
    title: "2-qubit NMR quantum computer",
    body: "A benchtop spectrometer running real gate sequences on nuclear spins — built from scratch.",
    color: "yellow",
    x: 70,
    y: 150,
    rotate: -2.5,
    fastener: "pin",
  },
  {
    id: "nqs",
    section: "built",
    title: "Neural quantum states, from scratch",
    body: "Carleo–Troyer RBM wavefunction + Metropolis VMC for the transverse-field Ising model.",
    color: "yellow",
    x: 320,
    y: 260,
    rotate: 1.8,
    fastener: "tape",
    href: "/lab-notes/nqs-tfim",
  },
  {
    id: "beyond",
    section: "built",
    title: "Beyond Physics",
    body: "A physics learning platform that grew to 10,000+ users before I retired it.",
    color: "yellow",
    x: 90,
    y: 420,
    rotate: 2.2,
    fastener: "pin",
  },
  {
    id: "molgen",
    section: "built",
    title: "Molecular generation pipeline",
    body: "SMILES → neural nets → candidate molecules. RDKit descriptors, QSAR models, SHAP.",
    color: "yellow",
    x: 330,
    y: 560,
    rotate: -1.6,
    fastener: "tape",
  },
  {
    id: "pm-tool",
    section: "built",
    title: "Prediction-market alpha research",
    body: "Lead–lag structure between Kalshi / Polymarket prices and equity & crypto markets.",
    color: "yellow",
    x: 80,
    y: 660,
    rotate: -2.8,
    fastener: "pin",
  },

  // ---------- WHAT I'M THINKING ABOUT ----------
  {
    id: "entanglement",
    section: "thinking",
    title: "Entanglement bounds for RBMs",
    body: "Can second Rényi entropy S₂ act as a live training diagnostic across the TFIM phase transition?",
    color: "blue",
    x: 830,
    y: 130,
    rotate: 2.4,
    fastener: "pin",
  },
  {
    id: "info-flow",
    section: "thinking",
    title: "Where does information move first?",
    body: "Prediction markets vs. the order book: who updates first when news lands, and by how many minutes?",
    color: "blue",
    x: 950,
    y: 360,
    rotate: -2.1,
    fastener: "tape",
  },
  {
    id: "interp",
    section: "thinking",
    title: "Features as directions",
    body: "Superposition, sparse autoencoders, and what 'a concept' even is inside a network.",
    color: "blue",
    x: 800,
    y: 560,
    rotate: 1.4,
    fastener: "pin",
  },
  {
    id: "tabletop",
    section: "thinking",
    title: "Cheapest genuinely-quantum experiment?",
    body: "What is the minimum benchtop setup that demonstrates entanglement, not just interference?",
    color: "pink",
    x: 990,
    y: 680,
    rotate: -1.2,
    fastener: "tape",
  },
];

export const connections: Connection[] = [
  { from: "nqs", to: "entanglement", label: "same wavefunction" },
  { from: "pm-tool", to: "info-flow", label: "same data" },
  { from: "nmr", to: "tabletop", label: "spins → photons?" },
  { from: "molgen", to: "interp", label: "what did it learn?" },
];
