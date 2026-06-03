import { motion } from "motion/react";
import { Reveal, SplitText } from "../Reveal";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "9+", label: "Core Capabilities" },
  { value: "6", label: "Languages Spoken" },
  { value: "∞", label: "Curiosity" },
];

const keywords = [
  "Requirement Gathering",
  "Stakeholder Coordination",
  "Data Analysis",
  "SQL",
  "Power BI",
  "Excel",
  "Workflow Docs",
  "Process Optimization",
  "AI-Assisted Analytics",
];

export function About() {
  return (
    <section id="about" className="relative border-t border-ink/10 py-16 md:py-24">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-16 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">01 — About</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Profile</span>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-balance">
              <SplitText text="A business analyst who bridges" />{" "}
              <span className="italic">
                <SplitText text="messy questions" delay={0.15} />
              </span>{" "}
              <SplitText text="with data-shaped answers." delay={0.3} />
            </h2>

            <Reveal delay={0.4} className="mt-10 max-w-2xl text-base leading-relaxed text-charcoal">
              <p>
                I work at the intersection of business needs and analytical thinking — gathering
                requirements, coordinating stakeholders, and turning raw operational data into
                dashboards, decisions, and documented workflows. Currently pursuing my MBA in
                Business Analytics while shipping real consulting and analysis work.
              </p>
            </Reveal>

            <Reveal delay={0.5} className="mt-10 flex flex-wrap gap-2">
              {keywords.map((k) => (
                <motion.span
                  key={k}
                  whileHover={{ y: -3, backgroundColor: "var(--ink)", color: "var(--paper)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex cursor-default items-center rounded-full border border-ink/15 bg-paper px-4 py-2 text-xs"
                >
                  {k}
                </motion.span>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pl-10">
            <Reveal className="space-y-3 border-l border-ink/10 pl-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Operating system</span>
              <p className="font-display text-2xl italic leading-snug">
                Ask sharper questions. Build cleaner data. Ship calmer decisions.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/10 pt-10">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="font-display text-5xl font-light tracking-tight">{s.value}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mist">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
