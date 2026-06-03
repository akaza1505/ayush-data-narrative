import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  BarChart2,
  TrendingUp,
  Target,
  Users,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Zap,
  Star,
  BarChart3,
} from "lucide-react";
import { Reveal } from "../Reveal";

// KPI Metrics - Animated counters with icons
const KPI_METRICS = [
  { label: "Campaigns Analyzed", value: 24, suffix: "", color: "#F59E0B", icon: BarChart2 },
  { label: "Revenue Growth Tracked", value: 32, suffix: "%", color: "#10B981", icon: TrendingUp },
  { label: "KPIs Monitored", value: 18, suffix: "+", color: "#3B82F6", icon: Target },
  { label: "Stakeholders Served", value: 12, suffix: "+", color: "#F43F5E", icon: Users },
];

// Insights - Delivered outcomes
const INSIGHTS = [
  { icon: Zap, text: "Identified top-3 underperforming channels via funnel analysis", color: "#F59E0B" },
  { icon: Activity, text: "Built live dashboard tracking 18 campaign KPIs in real-time", color: "#10B981" },
  { icon: Target, text: "Pinpointed 27% budget inefficiency through ROI visualization", color: "#3B82F6" },
  { icon: Star, text: "Presented insights to C-suite, informing Q3 strategy shift", color: "#F43F5E" },
];

// Inside component - Channel performance
const CHANNELS = [
  { name: "Social Media", performance: 78, color: "#3B82F6" },
  { name: "Email Marketing", performance: 92, color: "#10B981" },
  { name: "Paid Search", performance: 61, color: "#F59E0B" },
  { name: "Display Ads", performance: 44, color: "#F43F5E" },
  { name: "Content / SEO", performance: 83, color: "#06B6D4" },
];

function AnimatedBar({ width, color, delay = 0, active }: { width: number; color: string; delay?: number; active: boolean }) {
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setCurrentWidth(width), delay);
    return () => clearTimeout(timer);
  }, [active, width, delay]);

  return (
    <div className="relative h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width: `${currentWidth}%`,
          background: color,
          transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: `0 0 8px ${color}60`,
        }}
      />
    </div>
  );
}

function CounterKpi({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 2000;
    
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, value]);

  return <span>{count}{suffix}</span>;
}

export function Project() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const kpiRef = useRef<HTMLDivElement>(null);
  const kpiVisible = useInView(kpiRef, { once: true, amount: 0.2 });

  const dashboardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: dashboardRef, offset: ["start end", "end start"] });
  const dashboardY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const dashboardRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative border-t border-ink/10 py-24 md:py-32 overflow-hidden bg-paper text-ink"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink/[0.005] via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-12 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">04 — Case Study</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Featured Work</span>
        </div>

        {/* First section (Original Visuals) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.03em] text-balance">
                Marketing Campaign Performance — <span className="italic">a Power BI story.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-mist">
              <span className="rounded-full border border-ink/15 px-3 py-1">Power BI</span>
              <span className="rounded-full border border-ink/15 px-3 py-1">DAX</span>
              <span className="rounded-full border border-ink/15 px-3 py-1">Attribution</span>
              <span className="rounded-full border border-ink/15 px-3 py-1">Executive Reporting</span>
            </Reveal>
          </div>

          {/* Animated dashboard mock */}
          <motion.div
            ref={dashboardRef}
            style={{ y: dashboardY, rotate: dashboardRotate }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative overflow-hidden rounded-2xl border border-ink/15 bg-ink p-6 text-paper shadow-2xl w-full max-w-[420px]">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-paper/50">
                <span className="flex items-center gap-2">
                  <BarChart3 size={12} style={{ color: "var(--citrus)" }} /> Campaign · ROAS
                </span>
                <span>Q4</span>
              </div>
              {/* Bars */}
              <div className="mt-6 flex h-40 items-end gap-2">
                {[40, 70, 55, 90, 62, 78, 45, 88, 60, 95, 72].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 rounded-sm"
                    style={{
                      background: i === 9 ? "var(--flame)" : i === 3 ? "var(--mint)" : "color-mix(in oklab, var(--paper) 30%, transparent)",
                    }}
                  />
                ))}
              </div>
              {/* Line overlay */}
              <svg viewBox="0 0 100 30" className="mt-4 h-16 w-full">
                <motion.path
                  d="M0,22 Q15,8 25,14 T50,10 T75,16 T100,6"
                  stroke="var(--citrus)"
                  strokeWidth="0.8"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </svg>
              <div className="mt-2 grid grid-cols-3 gap-3 border-t border-paper/10 pt-4 text-center">
                {[
                  { k: "ROAS", v: "4.2x", c: "var(--citrus)" },
                  { k: "CTR", v: "+18%", c: "var(--mint)" },
                  { k: "CPA", v: "−24%", c: "var(--flame)" },
                ].map((m) => (
                  <div key={m.k}>
                    <div className="font-display text-xl" style={{ color: m.c }}>{m.v}</div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-paper/40">{m.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second section (Case Study Details Box) */}
        <div className="mt-16 relative rounded-2xl border border-white/[0.08] bg-ink text-paper overflow-hidden shadow-2xl">
          {/* Colored top bar */}
          <div
            className="h-1 w-full"
            style={{ background: "linear-gradient(90deg, #F59E0B, #F43F5E, #3B82F6, #10B981)" }}
          />

          <div className="p-6 md:p-12 lg:p-16">
            
            {/* Title & Metadata badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                Analysis & Insights
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10 text-paper/40">
                Marketing ROI Optimization
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-paper mb-8">
              Campaign Performance Deep Dive
            </h3>

            {/* Problem / Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40 mb-3">
                  The Problem
                </h4>
                <p className="text-sm text-paper/70 leading-relaxed">
                  Fragmented data across 5+ channels made it impossible to assess campaign ROI. Creative performance insights were siloed, leading to budget waste on low-converting channels.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40 mb-3">
                  The Solution
                </h4>
                <p className="text-sm text-paper/70 leading-relaxed">
                  Consolidated multi-source data into a single Power BI model. Designed interactive executive dashboards with drill-through parameters mapping touchpoint paths, attribution trends, and real-time CPC vs. ROAS metrics.
                </p>
              </div>
            </div>

            {/* KPI METRICS */}
            <div
              ref={kpiRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-t border-white/[0.06] pt-12"
            >
              {KPI_METRICS.map(({ label, value, suffix, color, icon: Icon }) => (
                <div
                  key={label}
                  className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={14} style={{ color }} strokeWidth={1.8} />
                    <span className="text-[10px] uppercase tracking-[0.15em] text-paper/40 font-medium">
                      {label}
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold" style={{ color }}>
                    <CounterKpi value={value} suffix={suffix} active={kpiVisible} />
                  </div>
                </div>
              ))}
            </div>

            {/* Channel Performance & Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 border-t border-white/[0.06] pt-12">
              
              {/* Channel Performance */}
              <div className="lg:col-span-6">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40 mb-6">
                  Channel Performance Index
                </h4>
                <div className="space-y-5">
                  {CHANNELS.map(({ name, performance, color }, i) => (
                    <div key={name} className="flex items-center gap-4">
                      <span className="text-sm text-paper/50 w-32 flex-shrink-0">{name}</span>
                      <div className="flex-1">
                        <AnimatedBar
                          width={performance}
                          color={color}
                          delay={i * 150}
                          active={kpiVisible}
                        />
                      </div>
                      <span className="text-sm font-semibold w-10 text-right" style={{ color }}>
                        {performance}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Insights */}
              <div className="lg:col-span-6">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/40 mb-6">
                  Key Insights Delivered
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {INSIGHTS.map(({ icon: Icon, text, color }) => (
                    <div
                      key={text}
                      className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] transition-colors"
                    >
                      <div
                        className="p-2 rounded-lg flex-shrink-0 mt-0.5"
                        style={{ background: `${color}18` }}
                      >
                        <Icon size={14} style={{ color }} strokeWidth={2} />
                      </div>
                      <p className="text-sm text-paper/70 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA FOOTER */}
            <div className="mt-12 pt-8 border-t border-white/[0.05] flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm text-paper/35 font-light italic max-w-sm">
                "Data is only valuable when it drives decisions."
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-paper/50 hover:text-paper transition-colors duration-300 group"
              >
                Discuss this work
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
