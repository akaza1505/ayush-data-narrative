import { motion, useScroll, useSpring } from "motion/react";
import { Magnetic } from "./Magnetic";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-ink"
      />
      <header className="fixed inset-x-0 top-0 z-40 px-6 py-6 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <Magnetic strength={0.2}>
            <a href="#top" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-paper font-display text-sm italic">a</span>
              <span className="hidden sm:inline">Ayush K. Singh</span>
            </a>
          </Magnetic>
          <nav className="hidden items-center gap-1 rounded-full border border-ink/10 bg-paper/70 px-2 py-2 backdrop-blur-md md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-charcoal transition-colors hover:bg-ink hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              data-cursor="hi"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-paper"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Available
            </a>
          </Magnetic>
        </div>
      </header>
    </>
  );
}
