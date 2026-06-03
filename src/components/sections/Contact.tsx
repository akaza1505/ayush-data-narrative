import { motion } from "motion/react";
import { Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react";
import { Magnetic } from "../Magnetic";
import { Reveal, SplitText } from "../Reveal";

const cards = [
  { label: "Email", value: "kumarayush1115@gmail.com", href: "mailto:kumarayush1115@gmail.com", Icon: Mail, color: "var(--flame)" },
  { label: "LinkedIn", value: "/in/rajputayushsingh", href: "https://linkedin.com/in/rajputayushsingh", Icon: Linkedin, color: "var(--iris)" },
  { label: "Phone", value: "+91 6236 014 435", href: "tel:+916236014435", Icon: Phone, color: "var(--mint)" },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-ink/10 bg-ink text-paper">
      <div className="absolute inset-0 grid-noise opacity-[0.08]" />
      {/* Marquee */}
      <div className="marquee-mask relative border-b border-paper/10 py-10">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap font-display text-7xl font-light italic md:text-9xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-16">
              {["Let's build something", "·", "Data into decisions", "·", "Open to opportunities", "·"].map((t, i) => (
                <span key={i} className={i % 2 === 1 ? "text-flame" : ""}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 py-32 lg:px-12 md:py-44">
        <div className="mb-12 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/50">07 — Contact</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/50">Say hello</span>
        </div>

        <h2 className="font-display text-[clamp(2.8rem,9vw,10rem)] font-light leading-[0.92] tracking-[-0.04em]">
          <SplitText text="Have a problem" />
          <br />
          <span className="italic">
            <SplitText text="worth solving?" delay={0.2} />
          </span>
        </h2>

        <Reveal delay={0.3} className="mt-10 max-w-xl text-base text-paper/70">
          Currently completing my MBA and open to analytics, business consulting, and operations
          roles. The quickest way to reach me is email — I read everything.
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((c, i) => (
            <Magnetic key={c.label} strength={0.2}>
              <motion.a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                data-cursor={c.label.toLowerCase()}
                className="group block rounded-2xl border border-paper/15 bg-paper/[0.03] p-6 transition-colors hover:bg-paper/[0.08]"
              >
                <div className="flex items-start justify-between">
                  <c.Icon size={22} style={{ color: c.color }} strokeWidth={1.5} />
                  <ArrowUpRight size={18} className="text-paper/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-paper" />
                </div>
                <div className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">{c.label}</div>
                <div className="mt-2 font-display text-xl">{c.value}</div>
              </motion.a>
            </Magnetic>
          ))}
        </div>

        <div className="mt-20">
          <Magnetic>
            <a
              href="mailto:kumarayush1115@gmail.com"
              data-cursor="email"
              className="inline-flex items-center gap-4 rounded-full bg-paper px-8 py-5 text-ink transition-transform"
            >
              <span className="text-base">kumarayush1115@gmail.com</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </Magnetic>
        </div>

        <footer className="mt-32 flex flex-col gap-6 border-t border-paper/10 pt-10 font-mono text-[11px] uppercase tracking-widest text-paper/40 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Ayush Kumar Singh</div>
          <div className="flex gap-6">
            <span>Bhubaneswar · IN</span>
            <span>Available for hire</span>
          </div>
          <div>Crafted with care</div>
        </footer>
      </div>
    </section>
  );
}
