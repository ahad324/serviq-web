"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation() {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<"loading" | "intro" | "complete">("loading");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock scroll during the intro
    document.body.style.overflow = "hidden";

    // Progress counter for Stage 1: Loading
    const duration = 1600; // 1.6s loading phase
    const intervalTime = 30;
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

  // When loading reaches 100%, trigger Phase 2: Cinematic Intro
  useEffect(() => {
    if (percent === 100) {
      const introTimeout = setTimeout(() => {
        setPhase("intro");
      }, 300);

      // Complete and exit overlay after showing intro for 1.8 seconds
      const finishTimeout = setTimeout(() => {
        setPhase("complete");
        document.body.style.overflow = "";
      }, 2300);

      return () => {
        clearTimeout(introTimeout);
        clearTimeout(finishTimeout);
      };
    }
  }, [percent]);

  if (!mounted) return null;

  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 10,
        duration: 0.6
      }
    }
  };

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ 
            y: "0%", 
            borderBottomLeftRadius: "0px 0px", 
            borderBottomRightRadius: "0px 0px" 
          }}
          exit={{ 
            y: "-110%",
            borderBottomLeftRadius: "300px 100px",
            borderBottomRightRadius: "300px 100px",
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#002E2C] flex flex-col items-center justify-center select-none overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
        >
          {/* Futuristic Scanline Scan Animation overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(171,209,198,0.02)_50%,rgba(255,255,255,0))] bg-[size:100%_40px] pointer-events-none animate-[shimmer-anim_8s_linear_infinite]" />
          
          {/* Ambient tech grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

          {/* Dynamic background glow */}
          <motion.div 
            animate={{ 
              scale: phase === "intro" ? [1, 1.15, 1.05] : 1,
              opacity: phase === "intro" ? 0.25 : 0.15 
            }}
            className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-teal-highlight/30 to-mustard/15 rounded-full blur-3xl pointer-events-none" 
          />

          <AnimatePresence mode="wait">
            {/* STAGE 1: LOADING SCREEN */}
            {phase === "loading" && (
              <motion.div
                key="loading-screen"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
                className="flex flex-col items-center gap-6 z-10"
              >
                {/* Pulsing Logo Widget */}
                <div className="relative">
                  <div className="absolute -inset-2 rounded-3xl bg-teal-highlight/15 blur-lg animate-pulse" />
                  <img
                    src="/logo.png"
                    alt="Serviq Loading Logo"
                    className="w-20 h-20 rounded-3xl object-cover border border-white/5 shadow-xl"
                  />
                </div>

                {/* Percentage Counter */}
                <div className="flex flex-col items-center gap-1.5 mt-2">
                  <span className="font-mono text-xs tracking-widest text-teal-highlight uppercase opacity-85">
                    Orchestrator Initializing
                  </span>
                  <span className="font-heading font-black text-4xl text-sand tracking-tight tabular-nums">
                    {percent}%
                  </span>
                </div>

                {/* Micro linear track */}
                <div className="w-36 h-[2px] bg-white/5 rounded-full overflow-hidden relative mt-1">
                  <div 
                    className="h-full bg-teal-highlight transition-all duration-300 ease-out" 
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </motion.div>
            )}

            {/* STAGE 2: COOL AESTHETIC INTRO */}
            {phase === "intro" && (
              <motion.div
                key="intro-screen"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -30, transition: { duration: 0.4 } }}
                className="flex flex-col items-center gap-6 z-10"
              >
                {/* Logo with massive glow flash */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.15 }}
                  className="relative mb-2"
                >
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-teal-highlight to-mustard opacity-40 blur-2xl animate-pulse" />
                  <img
                    src="/logo.png"
                    alt="Serviq Logo"
                    className="w-24 h-24 rounded-3xl object-cover shadow-2xl relative border border-white/10"
                  />
                </motion.div>

                {/* Staggered Title Reveal */}
                <motion.div
                  variants={letterContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex gap-2 font-heading font-black text-4xl sm:text-5xl tracking-widest text-sand uppercase"
                >
                  {Array.from("SERVIQ").map((char, index) => (
                    <motion.span 
                      key={index} 
                      variants={letterVariants}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-sand drop-shadow-md"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Subtitle Tagline Reveal */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="font-mono text-[9px] sm:text-[10px] text-teal-highlight font-extrabold uppercase tracking-widest text-center max-w-xs leading-relaxed"
                >
                  Bilingual Voice-First Service Orchestration
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
