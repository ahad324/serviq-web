"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MapPin, Cpu, Sparkles } from "lucide-react";

interface IntroAnimationProps {
  onComplete?: () => void;
}

const FLOATING_TAGS = [
  { text: "AC Leak", x: -150, y: -70, delay: 0.1, color: "text-teal-highlight" },
  { text: "پنکھا خراب ہے", x: 140, y: -90, delay: 0.3, color: "text-mustard" },
  { text: "Plumbing", x: -160, y: 80, delay: 0.5, color: "text-teal-highlight" },
  { text: "نل کی مرمت", x: 130, y: 60, delay: 0.7, color: "text-mustard" },
  { text: "Haversine Radar", x: -30, y: -160, delay: 0.9, color: "text-teal-highlight" },
  { text: "Geofencing Active", x: 50, y: 140, delay: 1.1, color: "text-teal-highlight" },
];

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<"loading" | "intro" | "complete">("loading");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    // Progress counter for Loading phase
    const duration = 1800; // 1.8s load
    const intervalTime = 25;
    const increment = 100 / (duration / intervalTime);

    const progressTimer = setInterval(() => {
      setPercent((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => {
      clearInterval(progressTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (percent === 100) {
      const introTimeout = setTimeout(() => {
        setPhase("intro");
      }, 400);

      const finishTimeout = setTimeout(() => {
        setPhase("complete");
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      }, 2500);

      return () => {
        clearTimeout(introTimeout);
        clearTimeout(finishTimeout);
      };
    }
  }, [percent]);

  if (!mounted) return null;

  const getTelemetryLog = (pct: number) => {
    if (pct < 25) return "GPS TELEMETRY: RESOLVING DEVICE COORDINATES...";
    if (pct < 55) return "SPEECH INTENT: CATEGORIZING URDU/ENGLISH SEMANTICS...";
    if (pct < 80) return "HAVERSINE MATRIX: CALCULATING SPREAD DISTANCES...";
    if (pct < 98) return "DISPATCH PIPELINE: OPTIMIZING CANDIDATE ROUTE...";
    return "ORCHESTRATOR SYNCHRONIZED. DEPLOYING.";
  };

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ 
            y: "0%", 
            borderBottomLeftRadius: "0%", 
            borderBottomRightRadius: "0%" 
          }}
          exit={{ 
            y: "-100%",
            borderBottomLeftRadius: "60% 15%",
            borderBottomRightRadius: "60% 15%",
            transition: { duration: 1.25, ease: [0.85, 0, 0.15, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#001413] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle tech lines & scanning effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-highlight/2 to-transparent pointer-events-none animate-pulse" />

          <AnimatePresence mode="wait">
            {/* PHASE 1: AUDIO RADAR SCANNER */}
            {phase === "loading" && (
              <motion.div
                key="radar-loading"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                className="relative flex flex-col items-center justify-center w-full max-w-lg h-[450px]"
              >
                {/* Outer Radar Rings */}
                <div className="absolute w-72 h-72 rounded-full border border-teal-highlight/10 flex items-center justify-center">
                  <div className="absolute w-52 h-52 rounded-full border border-teal-highlight/15 flex items-center justify-center">
                    <div className="absolute w-36 h-36 rounded-full border border-teal-highlight/25 flex items-center justify-center" />
                  </div>
                </div>

                {/* Pulse wave animation nodes */}
                <motion.div 
                  animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
                  className="absolute w-32 h-32 rounded-full border border-teal-highlight/40"
                />
                <motion.div 
                  animate={{ scale: [1, 2.6], opacity: [0.3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeOut" }}
                  className="absolute w-32 h-32 rounded-full border border-teal-highlight/20"
                />
                <motion.div 
                  animate={{ scale: [1, 2.6], opacity: [0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 2, ease: "easeOut" }}
                  className="absolute w-32 h-32 rounded-full border border-teal-highlight/10"
                />

                {/* Central Microphone Scanner Node */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-cyprus-dark border border-teal-highlight/30 flex items-center justify-center shadow-lg shadow-teal-highlight/10">
                  <div className="absolute inset-1.5 rounded-full bg-gradient-to-b from-[#002b28] to-[#001413] flex items-center justify-center">
                    <Mic className="w-8 h-8 text-teal-highlight animate-pulse" />
                  </div>
                </div>

                {/* Floating Keywords (Speech-to-Text Parsing Emulation) */}
                {FLOATING_TAGS.map((tag, idx) => {
                  // Only display tags based on percent progress to simulate parsing over time
                  const active = percent > (idx * 15);
                  return (
                    <AnimatePresence key={idx}>
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, x: tag.x * 0.7, y: tag.y * 0.7 }}
                          animate={{ 
                            opacity: [0, 0.9, 0.4], 
                            scale: 1, 
                            x: tag.x, 
                            y: tag.y,
                            transition: { duration: 2.2, repeat: Infinity, repeatType: "reverse" }
                          }}
                          className={`absolute font-heading font-extrabold text-[10px] sm:text-xs tracking-wider bg-cyprus-dark/85 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded-full shadow-sm ${tag.color}`}
                        >
                          {tag.text}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}

                {/* Telemetry log output at bottom */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
                  <div className="font-mono text-[9px] text-teal-highlight/70 uppercase tracking-widest text-center h-4 select-none px-4">
                    {getTelemetryLog(percent)}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-black text-xl text-sand tracking-tight tabular-nums">
                      {percent}%
                    </span>
                    <div className="w-20 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-teal-highlight transition-all duration-200 ease-out" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PHASE 2: CINETIC DISSOLVE LOGO REVEAL */}
            {phase === "intro" && (
              <motion.div
                key="cinematic-intro"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } }}
                className="flex flex-col items-center gap-6 z-10"
              >
                {/* Logo with clean glowing backdrop */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.15 }}
                  className="relative"
                >
                  <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-teal-highlight to-mustard opacity-20 blur-3xl" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-3 rounded-full border border-dashed border-teal-highlight/25"
                  />
                  <img
                    src="/logo.png"
                    alt="Serviq Logo"
                    className="w-24 h-24 rounded-3xl object-cover shadow-2xl relative border border-white/10"
                  />
                </motion.div>

                {/* Staggered SERVIQ text */}
                <div className="flex gap-2.5 font-heading font-black text-4xl sm:text-5xl tracking-widest text-sand uppercase mt-2">
                  {Array.from("SERVIQ").map((char, index) => (
                    <motion.span 
                      key={index}
                      initial={{ opacity: 0, y: 25, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 110, 
                        damping: 12, 
                        delay: 0.3 + index * 0.08 
                      }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-sand drop-shadow-md"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="font-mono text-[9px] sm:text-[10px] text-teal-highlight font-extrabold uppercase tracking-[0.25em] text-center max-w-xs leading-relaxed"
                >
                  Bilingual Voice Orchestration
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
