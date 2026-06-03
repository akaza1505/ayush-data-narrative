import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [data-cursor]");
      setHover(!!interactive);
      const l = interactive?.getAttribute("data-cursor");
      setLabel(l || null);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      {/* Dot cursor — mix-blend-mode:difference makes it always visible */}
      <motion.div
        style={{ x: sx, y: sy, mixBlendMode: "difference" }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hover ? 3 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="h-3 w-3 rounded-full bg-white"
        />
      </motion.div>

      {/* Ring cursor */}
      <motion.div
        style={{ x: sx, y: sy, mixBlendMode: "difference" }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hover ? 0 : 1,
            opacity: hover ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="h-10 w-10 rounded-full border border-white"
        />
      </motion.div>

      {/* Label tag — rendered outside blend mode layer so colors stay correct */}
      {label && (
        <motion.div
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 z-[101] translate-x-4 translate-y-4"
        >
          <span className="whitespace-nowrap rounded-full bg-black/80 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white backdrop-blur-sm">
            {label}
          </span>
        </motion.div>
      )}
    </>
  );
}
