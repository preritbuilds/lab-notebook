// Everything pinned to the research board lives here.
// `body` is optional — leave it out and the title fills the whole note.
// Positions are just defaults; visitors can rearrange them and their layout
// is saved in their own browser.

export type NoteColor = "yellow" | "blue" | "pink";

export type BoardNote = {
  id: string;
  section: "built" | "thinking";
  title: string;
  body?: string; // optional one-liner; omit for a title-only note
  color: NoteColor;
  x: number; // default position on the board
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

export const BOARD_W = 1500;
export const BOARD_H = 1050;

export const notes: BoardNote[] = [
  // ---------- WHAT I'VE BUILT ----------
  {
    id: "nmr",
    section: "built",
    title: "2-qubit NMR quantum computer",
    body: "A benchtop spectrometer running real gate sequences on nuclear spins — built from scratch.",
    color: "yellow",
    x: 70,
    y: 140,
    rotate: -2.5,
    fastener: "pin",
  },
  {
    id: "nqs",
    section: "built",
    title: "Neural quantum states",
    body: "Carleo–Troyer RBM wavefunction + Metropolis VMC for the transverse-field Ising model.",
    color: "yellow",
    x: 305,
    y: 235,
    rotate: 1.8,
    fastener: "tape",
    href: "/lab-notes/nqs-tfim",
  },
  {
    id: "beyond",
    section: "built",
    title: "Beyond Physics",
    body: "A physics learning platform that grew to 10,000+ users.",
    color: "yellow",
    x: 85,
    y: 375,
    rotate: 2.2,
    fastener: "pin",
  },
  {
    id: "almgren",
    section: "built",
    title: "Almgren–Chriss execution model",
    body: "Optimal trade scheduling under market impact — implemented and stress-tested.",
    color: "yellow",
    x: 315,
    y: 490,
    rotate: -1.4,
    fastener: "tape",
  },
  {
    id: "molgen",
    section: "built",
    title: "Molecular generation pipeline",
    body: "SMILES → neural nets → candidate molecules. RDKit descriptors, QSAR models, SHAP.",
    color: "yellow",
    x: 80,
    y: 615,
    rotate: -1.6,
    fastener: "tape",
  },
  {
    id: "crown",
    section: "built",
    title: "CROWN Robotics",
    body: "Competition robotics: mechanisms, control, and far too many late nights.",
    color: "yellow",
    x: 300,
    y: 745,
    rotate: 2.0,
    fastener: "pin",
  },

  // ---------- WHAT I'M THINKING ABOUT (title-only notes) ----------
  { id: "deep-rl", section: "thinking", title: "Deep RL", color: "blue", x: 645, y: 150, rotate: 2.1, fastener: "pin" },
  { id: "mems", section: "thinking", title: "MEMS", color: "blue", x: 865, y: 120, rotate: -1.8, fastener: "tape" },
  { id: "interp", section: "thinking", title: "AI interpretability", color: "blue", x: 1080, y: 155, rotate: 1.3, fastener: "pin" },
  { id: "pinns", section: "thinking", title: "PINNs", color: "pink", x: 1290, y: 185, rotate: -2.4, fastener: "tape" },
  { id: "cows", section: "thinking", title: "Tracking how cows eat", color: "blue", x: 660, y: 335, rotate: -1.5, fastener: "tape" },
  { id: "sofa-veo", section: "thinking", title: "Sofa on Veo scooters", color: "pink", x: 880, y: 305, rotate: 2.6, fastener: "pin" },
  { id: "pm-trader", section: "thinking", title: "Prediction-market analyser & trader", color: "blue", x: 1095, y: 345, rotate: -1.1, fastener: "pin" },
  { id: "plasma", section: "thinking", title: "Plasma gun", color: "pink", x: 1295, y: 385, rotate: 1.9, fastener: "tape" },
  { id: "bionumbers", section: "thinking", title: "BioNumbers", color: "blue", x: 640, y: 515, rotate: 1.4, fastener: "pin" },
  { id: "particle-life", section: "thinking", title: "Particle life simulator", color: "blue", x: 860, y: 495, rotate: -2.2, fastener: "tape" },
  { id: "emergence", section: "thinking", title: "Reductionism vs. emergentism", color: "pink", x: 1080, y: 525, rotate: 1.6, fastener: "pin" },
  { id: "mri", section: "thinking", title: "How do I make cheap, high-quality MRIs?", color: "blue", x: 1285, y: 565, rotate: -1.3, fastener: "pin" },
  { id: "concierge", section: "thinking", title: "AI morning concierge", color: "blue", x: 700, y: 695, rotate: -2.0, fastener: "pin" },
  { id: "qiskit", section: "thinking", title: "Qiskit", color: "pink", x: 925, y: 680, rotate: 1.2, fastener: "tape" },
  { id: "emh", section: "thinking", title: "Efficient market hypothesis", color: "blue", x: 1145, y: 705, rotate: -1.7, fastener: "tape" },
];

export const connections: Connection[] = [
  { from: "beyond", to: "nmr", label: "where it started" },
  { from: "crown", to: "deep-rl", label: "robots that learn" },
];
