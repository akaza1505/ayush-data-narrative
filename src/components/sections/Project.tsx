import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BarChart3 } from "lucide-react";
import { Reveal } from "../Reveal";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const kpis = [
  { label: "Campaigns Analyzed", value: 24, suffix: "+", color: "var(--iris)" },
  { label: "KPI Lift Identified", value: 38, suffix: "%", color: "var(--flame)" },
  { label: "Dashboards Shipped", value: 6, suffix: "", color: "var(--mint)" },
  { label: "Stakeholders Aligned", value: 12, suffix: "", color: "var(--citrus)" },
];

const chapters = [
  { tag: "Problem", title: "Spend was up. Clarity wasn't.", body: "Marketing was running multi-channel campaigns with overlapping creatives and no shared truth on what was actually working — only fragmented exports per channel." },
  { tag: "Analysis", title: "One data model, six lenses.", body: "Consolidated channel exports into a unified Power BI model, normalized cost and conversion metrics, and built attribution-aware comparisons across campaigns, regions, and time." },
  { tag: "Dashboard", title: "Insight before scroll.", body: "Designed a single-screen executive view with drill-throughs — channel ROAS, funnel drop-off, audience overlap, and time-of-day patterns surfaced without filters." },
  { tag: "Outcome", title: "Cleaner spend, sharper decisions.", body: "Identified the top under-performing creatives, reallocated budget toward high-intent windows, and gave stakeholders a weekly source of truth they actually opened." },
];

export function Project() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dashboardY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const dashboardRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section id="work" className="relative border-t border-ink/10 py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-16 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">04 — Case Study</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Featured Work</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
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
            ref={ref}
            style={{ y: dashboardY, rotate: dashboardRotate }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-2xl border border-ink/15 bg-ink p-6 text-paper shadow-2xl">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-paper/50">
                <span className="flex items-center gap-2"><BarChart3 size={12} style={{ color: "var(--citrus)" }} /> Campaign · ROAS</span>
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

        {/* KPI strip */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-4">
          {kpis.map((k) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-paper p-8"
            >
              <div className="font-display text-5xl font-light tracking-tight" style={{ color: k.color }}>
                <Counter to={k.value} suffix={k.suffix} />
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mist">{k.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Chapters */}
        <div className="mt-24 space-y-20">
          {chapters.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 border-t border-ink/10 pt-10 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">0{i + 1} · {c.tag}</div>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-3xl font-light leading-tight md:text-5xl text-balance">{c.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-20 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-mist">
          <span className="h-px flex-1 bg-ink/15" />
          <span className="inline-flex items-center gap-2">More case studies on request <ArrowUpRight size={14} /></span>
        </Reveal>
      </div>
    </section>
  );
}
