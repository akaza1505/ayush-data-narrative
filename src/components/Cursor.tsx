import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [data-cursor]");
      setHover(!!interactive);
      const l = interactive?.getAttribute("data-cursor");
      setLabel(l || null);
      
      const darkContainer = el.closest(".bg-ink");
      setIsDark(!!darkContainer);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hover ? 2.4 : 1,
            backgroundColor: isDark ? "var(--paper)" : "var(--ink)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="h-2 w-2 rounded-full"
        />
        {label && (
          <span className={`absolute left-4 top-4 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${isDark ? "bg-paper text-ink" : "bg-ink text-paper"}`}>
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hover ? 0 : 1,
            opacity: hover ? 0 : 0.4,
            borderColor: isDark ? "var(--paper)" : "var(--ink)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="h-10 w-10 rounded-full border"
        />
      </motion.div>
    </>
  );
}
