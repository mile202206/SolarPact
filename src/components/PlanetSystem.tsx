import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import artPink from "@/assets/art-pink.gif";
import cosmicSphere from "@/assets/cosmic-sphere.gif";
import { useLanguage } from "@/contexts/LanguageContext";

const RING_TEXT = "SolarPact · 光合契约 · Growth · Invest · Proof · On-chain · SolarPact · 光合契约 · Growth · Invest · Proof · On-chain · ";

const PlanetSystem = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const rotateX = useTransform(smoothY, [-300, 300], [6, -6]);
  const rotateY = useTransform(smoothX, [-300, 300], [-6, 6]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const ringRadius = 210;

  return (
    <motion.div
      ref={containerRef}
      className="relative w-[520px] h-[520px] flex items-center justify-center"
      style={{ rotateX, rotateY, perspective: 900 }}
    >
      {/* Cosmic sphere as ambient background texture */}
      <div className="absolute w-[440px] h-[440px] rounded-full overflow-hidden opacity-[0.1] blur-[2px]">
        <img src={cosmicSphere} alt="" className="w-full h-full object-cover" draggable={false} />
      </div>

      {/* Soft ambient glow — intensifies on click */}
      <motion.div
        className="absolute w-[340px] h-[340px] rounded-full blur-[80px]"
        animate={{
          opacity: isActive ? 0.45 : 0.2,
          scale: isActive ? 1.15 : 1,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.2) 50%, transparent 80%)`,
        }}
      />

      {/* Planet sphere — click to activate */}
      <motion.div
        className="absolute w-[240px] h-[240px] rounded-full z-10 overflow-hidden cursor-pointer"
        style={{
          boxShadow: isActive
            ? `0 0 80px hsl(var(--primary) / 0.4), 0 0 160px hsl(var(--accent) / 0.15), inset 0 0 30px hsl(230 25% 5% / 0.3)`
            : `0 0 60px hsl(var(--primary) / 0.2), 0 0 120px hsl(var(--accent) / 0.08), inset 0 0 30px hsl(230 25% 5% / 0.5)`,
        }}
        animate={{ scale: isActive ? [1, 1.08, 1.04] : [1, 1.03, 1] }}
        transition={{ duration: isActive ? 0.5 : 8, repeat: isActive ? 0 : Infinity, ease: "easeInOut" }}
        onClick={() => setIsActive(true)}
        onMouseLeave={() => setTimeout(() => setIsActive(false), 2000)}
      >
        <img
          src={artPink}
          alt="Cosmic growth sphere"
          className="w-full h-full object-cover scale-[1.15]"
          draggable={false}
        />
        {/* Glass overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, hsl(0 0% 100% / 0.06), transparent 50%)",
          }}
        />
        {/* Rim light — brighter when active */}
        <motion.div
          className="absolute inset-[-2px] rounded-full pointer-events-none"
          animate={{
            boxShadow: isActive
              ? `inset 0 0 40px hsl(var(--primary) / 0.25), 0 0 30px hsl(var(--primary) / 0.15)`
              : `inset 0 0 25px hsl(var(--primary) / 0.12), 0 0 15px hsl(var(--primary) / 0.06)`,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* CTA that appears on planet click */}
      <motion.div
        className="absolute z-20"
        style={{ bottom: "80px" }}
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 15,
          scale: isActive ? 1 : 0.9,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/90 text-primary-foreground font-display font-semibold text-sm backdrop-blur-sm hover:bg-primary transition-colors"
          style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" }}
        >
          {language === "zh" ? "探索需求市场" : "Explore Market"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Rotating text ring — tilted 3D */}
      <div
        className="absolute w-full h-full"
        style={{ transform: "rotateX(12deg) rotateZ(-4deg)" }}
      >
        <svg
          className="w-full h-full animate-energy-ring"
          viewBox="0 0 520 520"
          style={{ animationDuration: "50s" }}
        >
          <defs>
            <path
              id="textCircle"
              d={`M 260,260 m -${ringRadius},0 a ${ringRadius},${ringRadius} 0 1,1 ${ringRadius * 2},0 a ${ringRadius},${ringRadius} 0 1,1 -${ringRadius * 2},0`}
              fill="none"
            />
          </defs>
          <text
            fill="hsl(40 20% 65%)"
            fontSize="10"
            fontFamily="'Space Grotesk', sans-serif"
            letterSpacing="3.5"
            opacity="0.35"
          >
            <textPath href="#textCircle" startOffset="0%">
              {RING_TEXT}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Thin orbit ring */}
      <div
        className="absolute w-[430px] h-[430px] rounded-full border border-border/8"
        style={{ transform: "rotateX(12deg) rotateZ(-4deg)" }}
      />

      {/* Second orbit */}
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full border border-primary/6"
        style={{ transform: "rotateX(72deg) rotateZ(18deg)" }}
        animate={{ rotateZ: [18, 378] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Orbiting dot */}
      <motion.div
        className="absolute w-[430px] h-[430px]"
        style={{ transform: "rotateX(12deg) rotateZ(-4deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
          style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
        />
      </motion.div>

      {/* Small satellite */}
      <motion.div
        className="absolute w-[320px] h-[320px]"
        style={{ transform: "rotateX(72deg) rotateZ(18deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary"
          style={{ boxShadow: "0 0 8px hsl(var(--secondary) / 0.4)" }}
        />
      </motion.div>

      {/* Data fragments */}
      {[
        { x: -220, y: -60, text: "SBT", delay: 0 },
        { x: 200, y: -80, text: "NFT", delay: 1.5 },
        { x: 200, y: 75, text: "DAO", delay: 3 },
      ].map((tag) => (
        <motion.div
          key={tag.text}
          className="absolute text-[9px] font-mono text-muted-foreground/25 tracking-widest"
          style={{ left: `calc(50% + ${tag.x}px)`, top: `calc(50% + ${tag.y}px)` }}
          animate={{ opacity: [0.12, 0.35, 0.12], y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: tag.delay, ease: "easeInOut" }}
        >
          {tag.text}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlanetSystem;
