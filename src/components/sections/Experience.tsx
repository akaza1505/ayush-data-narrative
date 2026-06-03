import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Briefcase, TrendingUp } from "lucide-react";

const items = [
  {
    role: "Junior Consultant",
    company: "Codup Technologies Pvt. Ltd.",
    period: "Jun 2023 — Jul 2024",
    Icon: Briefcase,
    color: "var(--iris)",
    points: [
      "Business requirement gathering & stakeholder coordination",
      "Cross-functional collaboration across teams",
    ],
  },
  {
    role: "Sales & Marketing Intern",
    company: "Varun Beverages Pvt. Ltd.",
    period: "Jun 2025 — Aug 2025",
    Icon: TrendingUp,
    color: "var(--flame)",
    points: [
      "Sales, distribution & KPI tracking analysis",
      "Market trend & campaign performance evaluation",
      "Translated raw data into actionable insights",
    ],
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.3"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative border-t border-ink/10 bg-ink py-32 text-paper md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-20 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/50">02 — Experience</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/50">Timeline</span>
        </div>

        <h2 className="font-display text-[clamp(2.2rem,6vw,6rem)] font-light leading-[0.95] tracking-[-0.03em]">
          Where I've <span className="italic">built things.</span>
        </h2>

        <div ref={ref} className="relative mt-24">
          <div className="absolute left-3 top-0 h-full w-px bg-paper/15 md:left-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 top-0 w-px bg-paper md:left-1/2"
          />

          <div className="space-y-28">
            {items.map((it, idx) => (
              <motion.div
                key={it.company}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 ${
                  idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Node */}
                <div className="absolute left-3 top-2 -translate-x-1/2 md:left-1/2">
                  <div className="relative">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: it.color }} />
                    <span
                      className="relative block h-3 w-3 rounded-full border-2 border-ink"
                      style={{ background: it.color }}
                    />
                  </div>
                </div>

                <div className={`pl-10 md:pl-0 ${idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className={`inline-flex items-center gap-3 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <it.Icon size={18} style={{ color: it.color }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60">{it.period}</span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">{it.role}</h3>
                  <p className="mt-2 text-paper/60">{it.company}</p>
                </div>

                <div className={`pl-10 md:pl-12 ${idx % 2 === 0 ? "" : "md:pr-12"}`}>
                  <ul className="space-y-3 text-sm leading-relaxed text-paper/80">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2 h-px w-4 shrink-0 bg-paper/40" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
