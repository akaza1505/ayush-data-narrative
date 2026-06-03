import { motion } from "motion/react";
import { useState } from "react";
import {
  BarChart3, FileSpreadsheet, Database, Code2, Bot, FileText,
  Users, MessageSquare, Workflow, ClipboardList, LineChart, Briefcase, Layers, Target
} from "lucide-react";

type Node = { name: string; group: "tech" | "biz"; x: number; y: number; Icon: any; color: string };

const nodes: Node[] = [
  { name: "Power BI", group: "tech", x: 18, y: 22, Icon: BarChart3, color: "var(--citrus)" },
  { name: "Excel", group: "tech", x: 34, y: 12, Icon: FileSpreadsheet, color: "var(--mint)" },
  { name: "Google Sheets", group: "tech", x: 52, y: 20, Icon: FileSpreadsheet, color: "var(--mint)" },
  { name: "MySQL", group: "tech", x: 70, y: 14, Icon: Database, color: "var(--iris)" },
  { name: "R", group: "tech", x: 84, y: 28, Icon: Code2, color: "var(--rose)" },
  { name: "ChatGPT", group: "tech", x: 88, y: 50, Icon: Bot, color: "var(--flame)" },
  { name: "BRD", group: "tech", x: 12, y: 50, Icon: FileText, color: "var(--iris)" },
  { name: "PRD", group: "tech", x: 22, y: 70, Icon: FileText, color: "var(--iris)" },
  { name: "SRS", group: "tech", x: 78, y: 72, Icon: FileText, color: "var(--iris)" },
  { name: "FRS", group: "tech", x: 88, y: 82, Icon: FileText, color: "var(--iris)" },

  { name: "Stakeholder Mgmt", group: "biz", x: 38, y: 38, Icon: Users, color: "var(--flame)" },
  { name: "Client Comms", group: "biz", x: 62, y: 38, Icon: MessageSquare, color: "var(--flame)" },
  { name: "Business Analysis", group: "biz", x: 50, y: 52, Icon: LineChart, color: "var(--iris)" },
  { name: "Requirements", group: "biz", x: 30, y: 58, Icon: ClipboardList, color: "var(--mint)" },
  { name: "Workflow Optim.", group: "biz", x: 70, y: 58, Icon: Workflow, color: "var(--citrus)" },
  { name: "Reporting", group: "biz", x: 42, y: 78, Icon: Layers, color: "var(--rose)" },
  { name: "Data Interp.", group: "biz", x: 58, y: 78, Icon: Target, color: "var(--rose)" },
  { name: "Project Coord.", group: "biz", x: 50, y: 88, Icon: Briefcase, color: "var(--flame)" },
];

// Connections via index pairs
const links: [number, number][] = [
  [10, 11], [10, 12], [11, 12], [12, 13], [12, 14], [13, 15], [14, 15],
  [15, 16], [16, 17], [12, 17],
  [0, 12], [1, 13], [2, 13], [3, 12], [4, 12], [5, 11],
  [6, 13], [7, 13], [8, 14], [9, 14],
  [10, 6], [11, 1], [14, 2], [15, 0],
];

export function Skills() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="skills" className="relative border-t border-ink/10 py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-16 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">03 — Capabilities</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Constellation</span>
        </div>

        <h2 className="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,5rem)] font-light leading-[1.02] tracking-[-0.03em]">
          A connected <span className="italic">skill ecosystem</span> — not a checklist.
        </h2>
        <p className="mt-6 max-w-xl text-sm text-charcoal">
          Hover the nodes to trace how technical fluency and business instinct reinforce each other.
        </p>

        <div className="relative mt-16 aspect-[16/11] w-full overflow-hidden rounded-2xl border border-ink/10 bg-paper">
          <div className="absolute inset-0 grid-noise opacity-50" />

          {/* Links */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map(([a, b], i) => {
              const isActive = active !== null && (a === active || b === active);
              return (
                <motion.line
                  key={i}
                  x1={nodes[a].x}
                  y1={nodes[a].y}
                  x2={nodes[b].x}
                  y2={nodes[b].y}
                  stroke={isActive ? "var(--ink)" : "currentColor"}
                  strokeWidth={isActive ? 0.25 : 0.12}
                  className={isActive ? "text-ink" : "text-ink/20"}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: i * 0.04, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((n, i) => {
            const isActive = active === i;
            const isDim = active !== null && !isActive && !links.some(([a, b]) => (a === active && b === i) || (b === active && a === i));
            return (
              <motion.button
                key={n.name}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                animate={{ opacity: isDim ? 0.3 : 1, scale: isActive ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  className="relative flex flex-col items-center gap-2"
                >
                  <div
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-paper shadow-sm transition-shadow group-hover:shadow-lg"
                    style={isActive ? { borderColor: n.color, boxShadow: `0 0 0 4px color-mix(in oklab, ${n.color} 20%, transparent)` } : undefined}
                  >
                    <n.Icon size={18} style={{ color: n.color }} strokeWidth={1.75} />
                  </div>
                  <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-charcoal">{n.name}</span>
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-widest text-mist">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink" /> {nodes.filter(n => n.group === "tech").length} Technical</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink" /> {nodes.filter(n => n.group === "biz").length} Business</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink" /> {links.length} Connections</span>
        </div>
      </div>
    </section>
  );
}
