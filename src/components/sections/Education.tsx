import { motion } from "motion/react";
import { GraduationCap, BookOpen } from "lucide-react";
import { Reveal } from "../Reveal";

const items = [
  {
    year: "2024 — 2026",
    title: "Master of Business Administration",
    school: "Sikkim Manipal Institute of Technology",
    focus: "Business Analytics & Marketing",
    research: "Research: Consumer Satisfaction in E-Commerce Platforms in Sikkim.",
    Icon: GraduationCap,
    color: "var(--iris)",
  },
  {
    year: "2020 — 2023",
    title: "Bachelor of Business Administration",
    school: "Trident Academy of Creative Technology",
    focus: "Management · Project Management · Business Operations",
    research: "Foundation in management principles and operations.",
    Icon: BookOpen,
    color: "var(--mint)",
  },
];

export function Education() {
  return (
    <section id="education" className="relative border-t border-ink/10 py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-16 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">05 — Education</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Journey</span>
        </div>

        <h2 className="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,5rem)] font-light leading-[1.02] tracking-[-0.03em]">
          Studied to <span className="italic">think</span> — before tools.
        </h2>

        <div className="mt-20 space-y-16">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-1 gap-6 border-t border-ink/10 pt-10 transition-colors hover:bg-ink/[0.02] md:grid-cols-12"
            >
              <div className="md:col-span-3 flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition-transform group-hover:scale-110" style={{ color: it.color }}>
                  <it.Icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">{it.year}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: it.color }}>{it.focus}</div>
                </div>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-3xl font-light leading-tight md:text-5xl text-balance">{it.title}</h3>
                <p className="mt-2 text-charcoal">{it.school}</p>
                <p className="mt-4 max-w-2xl text-sm italic text-mist">{it.research}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
