import { motion } from "motion/react";
import { Reveal } from "../Reveal";

const langs = [
  { name: "English", native: "English" },
  { name: "Hindi", native: "हिन्दी" },
  { name: "Bhojpuri", native: "भोजपुरी" },
  { name: "Gujarati", native: "ગુજરાતી" },
  { name: "Bengali", native: "বাংলা" },
  { name: "Odia", native: "ଓଡ଼ିଆ" },
];

export function Languages() {
  return (
    <section className="relative overflow-hidden border-t border-ink/10 py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-12 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">06 — Languages</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">Six tongues</span>
        </div>

        <Reveal>
          <h2 className="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,5rem)] font-light leading-[1.02] tracking-[-0.03em]">
            I speak six. <span className="italic">Useful when stakeholders don't.</span>
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-4">
          {langs.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="group relative cursor-default overflow-hidden rounded-full border border-ink/15 bg-paper px-7 py-4 transition-colors hover:bg-ink hover:text-paper"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl italic">{l.native}</span>
                <span className="h-4 w-px bg-current opacity-30" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{l.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
