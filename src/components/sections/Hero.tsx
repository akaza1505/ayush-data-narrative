import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, BarChart3, LineChart, PieChart, Sparkles, Database, TrendingUp } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { SplitText } from "./Reveal";

const floats = [
  { Icon: BarChart3, color: "var(--iris)", x: "8%", y: "22%", size: 28, d: 0 },
  { Icon: LineChart, color: "var(--flame)", x: "84%", y: "18%", size: 34, d: 0.3 },
  { Icon: PieChart, color: "var(--mint)", x: "12%", y: "72%", size: 30, d: 0.6 },
  { Icon: Database, color: "var(--citrus)", x: "82%", y: "70%", size: 26, d: 0.9 },
  { Icon: TrendingUp, color: "var(--rose)", x: "50%", y: "12%", size: 22, d: 1.2 },
  { Icon: Sparkles, color: "var(--iris)", x: "70%", y: "85%", size: 20, d: 1.5 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const m = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-noise opacity-60" />
      {/* Radial gradient mouse-follow */}
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${50 + mouse.x * 20}% ${50 + mouse.y * 20}%, color-mix(in oklab, var(--ink) 6%, transparent), transparent 60%)`,
        }}
      />

      {/* Floating icons */}
      {floats.map(({ Icon, color, x, y: fy, size, d }, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{
            left: x,
            top: fy,
            x: mouse.x * (10 + i * 4),
            y: mouse.y * (10 + i * 4),
          }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6 + d, repeat: Infinity, ease: "easeInOut", delay: d }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl opacity-30" style={{ background: color }} />
            <Icon size={size} style={{ color }} strokeWidth={1.5} />
          </div>
        </motion.div>
      ))}

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-[1500px] px-6 lg:px-12">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-mist"
        >
          <span className="h-px w-12 bg-ink/30" />
          <span>Portfolio · 2026</span>
          <span className="ml-auto hidden md:inline">Bhubaneswar, IN</span>
        </motion.div>

        <h1 className="font-display text-[clamp(3.2rem,11vw,12rem)] font-light leading-[0.88] tracking-[-0.04em]">
          <SplitText text="Ayush" className="block" />
          <span className="block italic text-balance">
            <SplitText text="Kumar Singh." delay={0.2} />
          </span>
        </h1>

        <div className="mt-10 grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="md:col-span-5 max-w-md text-[15px] leading-relaxed text-charcoal"
          >
            MBA candidate translating ambiguous business questions into{" "}
            <span className="font-display italic">data-shaped answers</span> — through
            analysis, dashboards, and AI-assisted workflows.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="md:col-span-4 space-y-2 font-mono text-xs uppercase tracking-widest text-charcoal"
          >
            {["Business Analytics", "Data Visualization", "Process Optimization", "AI-Assisted Analytics"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-ink" />
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="md:col-span-3 flex flex-col items-start gap-3"
          >
            <Magnetic>
              <a
                href="#work"
                data-cursor="explore"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm text-paper transition-colors"
              >
                View Portfolio
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-2 py-2 text-sm underline underline-offset-4 decoration-ink/30 hover:decoration-ink"
              >
                Let's Connect
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-mist"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          ↓ Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}
