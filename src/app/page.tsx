"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AppSimulator from "@/components/AppSimulator";
import OrchestratorFlow from "@/components/OrchestratorFlow";
import TechnicalDashboard from "@/components/TechnicalDashboard";
import TeamSection from "@/components/TeamSection";
import IntroAnimation from "@/components/IntroAnimation";
import { 
  Languages, Cpu, LineChart, FileCheck2, 
  Smartphone, Eye, Layers, Sparkles, MapPin, CheckCircle2, ShieldCheck, Database, Mic, ArrowRight, Github
} from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [introCompleted, setIntroCompleted] = useState(false);
  
  // Track scroll position of the page for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform outputs for parallax offsets
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <IntroAnimation onComplete={() => setIntroCompleted(true)} />
      <motion.div
        initial={{ y: -70, opacity: 0 }}
        animate={introCompleted ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </motion.div>
      
      <main className="flex-1 flex flex-col pt-24">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] lg:min-h-[85vh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 text-center overflow-hidden">
          
          {/* Parallax Floating Tech Badges (hidden on small viewports for responsive cleanliness) */}
          <motion.div 
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={introCompleted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="hidden md:block absolute top-[15%] left-[8%] z-10"
          >
            <div className="animate-float-1 accelerated-floating-layer flex items-center gap-2 px-4 py-2.5 glass-container rounded-2xl border border-cyprus/10 dark:border-sand/15 shadow-md">
              <div className="p-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                <MapPin size={14} />
              </div>
              <span className="font-sans text-[10px] font-bold text-cyprus dark:text-sand">GPS Geolocator: Active</span>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={introCompleted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="hidden md:block absolute top-[25%] right-[10%] z-10"
          >
            <div className="animate-float-2 accelerated-floating-layer flex items-center gap-2 px-4 py-2.5 glass-container rounded-2xl border border-cyprus/10 dark:border-sand/15 shadow-md">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Cpu size={14} />
              </div>
              <span className="font-sans text-[10px] font-bold text-cyprus dark:text-sand">n8n Gateway: 200 OK</span>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y3 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={introCompleted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="hidden md:block absolute bottom-[18%] left-[12%] z-10"
          >
            <div className="animate-float-3 accelerated-floating-layer flex items-center gap-2 px-4 py-2.5 glass-container rounded-2xl border border-cyprus/10 dark:border-sand/15 shadow-md">
              <div className="p-1.5 rounded-lg bg-mustard/10 text-mustard">
                <Sparkles size={14} />
              </div>
              <span className="font-sans text-[10px] font-bold text-cyprus dark:text-sand">Gemini 1.5 Flash: 98% Conf</span>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y4 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={introCompleted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="hidden md:block absolute bottom-[22%] right-[15%] z-10"
          >
            <div className="animate-float-4 accelerated-floating-layer flex items-center gap-2 px-4 py-2.5 glass-container rounded-2xl border border-cyprus/10 dark:border-sand/15 shadow-md">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Database size={14} />
              </div>
              <span className="font-sans text-[10px] font-bold text-cyprus dark:text-sand">Supabase Relational Log: Sync</span>
            </div>
          </motion.div>

          {/* Radial Glowing Background Orbs */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-mustard/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-teal-highlight/5 blur-3xl pointer-events-none" />

          {/* Hero Content */}
          <motion.div style={{ opacity }}>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={introCompleted ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: 0.35 }}
              className="w-full max-w-4xl mx-auto space-y-8 relative z-20 px-2 sm:px-4"
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                <Sparkles size={12} className="animate-pulse" />
                AI-Native Local Service Discovery
              </span>
              
              <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-cyprus dark:text-sand leading-[0.95] max-w-4xl mx-auto text-balance">
                Say goodbye to <br className="hidden sm:inline" />
                search filters.<br />
                <span className="text-cyprus-light dark:text-teal-highlight">
                  Just tell us what you need.
                </span>
              </h1>
              
              <p className="font-sans text-sm sm:text-base md:text-lg text-cyprus/80 dark:text-sand/80 max-w-2xl mx-auto leading-relaxed text-balance">
                The first bilingual service matching engine that extracts intent from conversational English, Urdu, or Romanized Urdu voice prompts, connecting you with local technicians.
              </p>

              {/* Audio Wave Decorator */}
              <div className="flex items-center justify-center gap-1 h-8 pt-2">
                <span className="w-1 h-3 bg-teal-highlight/40 dark:bg-teal-highlight/20 rounded-full animate-bounce [animation-duration:1.2s]" />
                <span className="w-1 h-5 bg-teal-highlight/60 dark:bg-teal-highlight/45 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.1s]" />
                <span className="w-1 h-7 bg-teal-highlight dark:bg-teal-highlight rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.3s]" />
                <span className="w-1 h-4 bg-teal-highlight/80 dark:bg-teal-highlight/60 rounded-full animate-bounce [animation-duration:0.9s] [animation-delay:0.2s]" />
                <span className="w-1 h-2 bg-teal-highlight/30 dark:bg-teal-highlight/15 rounded-full animate-bounce [animation-duration:1.4s] [animation-delay:0.4s]" />
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center pt-6">
                <a
                  href="#live-demo"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyprus to-cyprus-light dark:from-teal-highlight dark:to-emerald-400 text-white dark:text-cyprus-dark rounded-full font-heading font-extrabold text-xs sm:text-sm shadow-lg shadow-cyprus/15 dark:shadow-teal-highlight/15 hover:shadow-xl hover:shadow-teal-highlight/25 dark:hover:shadow-emerald-400/20 active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-1.5">
                    Try the Live Sandbox <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 border border-cyprus/15 dark:border-sand/20 hover:bg-cyprus/5 dark:hover:bg-sand/5 text-cyprus dark:text-sand rounded-full font-heading font-bold text-xs sm:text-sm active:scale-95 transition-all duration-300"
                >
                  Explore Backend Architecture
                </a>
              </div>
          </motion.div>
        </motion.div>
        </section>

        {/* INTERACTIVE SIMULATOR */}
        <section id="live-demo" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-white/30 dark:bg-cyprus-dark/10 border-t border-cyprus/5 dark:border-sand/5 scroll-mt-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-highlight/5 blur-3xl pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-6xl mx-auto"
          >
            <div className="text-center max-w-lg mx-auto mb-16 space-y-3">
              <span className="inline-block text-[10px] font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Live Emulation
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-cyprus dark:text-sand text-balance">
                Test the Client Sandbox
              </h2>
              <p className="font-sans text-xs sm:text-sm text-cyprus/70 dark:text-sand/70 leading-relaxed">
                Click one of the query preset templates below to run the multi-agent geolocator loop and witness real-time candidate scoring.
              </p>
            </div>
            
            <AppSimulator />
          </motion.div>
        </section>

        {/* WHY SERVIQ: BENTO GRID */}
        <section id="why-serviq" className="py-24 px-4 sm:px-6 bg-cyprus/5 dark:bg-cyprus-dark/20 border-y border-cyprus/5 dark:border-sand/5 relative scroll-mt-24">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center max-w-lg mx-auto mb-16 space-y-3">
              <span className="inline-block text-xs font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3 py-1 rounded-full uppercase tracking-wider">
                The Serviq difference
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-cyprus dark:text-sand">
                The NLP Paradigm Shift
              </h2>
              <p className="font-sans text-xs sm:text-sm text-cyprus/70 dark:text-sand/70 leading-relaxed">
                Replacing traditional filters with a unified natural language layer to automate regional dispatch.
              </p>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Card 1: NLP Intent (col-span-2) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="p-6 bg-white dark:bg-cyprus rounded-3xl border border-cyprus/5 dark:border-sand/10 shadow-sm flex flex-col justify-between hover:border-cyprus/25 dark:hover:border-teal-highlight/30 transition-all duration-300 md:col-span-2 min-h-[220px]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-heading font-extrabold text-mustard uppercase tracking-wide">NLP Processing</span>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-cyprus dark:text-sand">Bilingual Intent Parsing</h4>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65 max-w-sm">Urdu, English, and Romanized Urdu conversational scripts are categorized instantly into system-valid tags.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-mustard/10 text-mustard shrink-0">
                    <Languages size={18} />
                  </div>
                </div>
                {/* Visual interface */}
                <div className="flex items-center gap-3 p-3 bg-cyprus-dark/5 dark:bg-sand/5 rounded-2xl border border-cyprus/5 dark:border-sand/5 mt-4">
                  <span className="font-mono text-[10px] text-cyprus dark:text-teal-highlight font-semibold">"ac leak ho raha hai"</span>
                  <ArrowRight size={12} className="text-cyprus/40 dark:text-sand/40" />
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Category: air_conditioner_repair (98%)</span>
                </div>
              </motion.div>

              {/* Card 2: Dynamic Surcharges (col-span-1) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
                className="p-6 bg-white dark:bg-cyprus rounded-3xl border border-cyprus/5 dark:border-sand/10 shadow-sm flex flex-col justify-between hover:border-cyprus/25 dark:hover:border-teal-highlight/30 transition-all duration-300 min-h-[220px]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-heading font-extrabold text-teal-highlight uppercase tracking-wide">Pricing model</span>
                    <h4 className="font-heading font-bold text-base text-cyprus dark:text-sand">Travel Decay</h4>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65">Dynamic distance scaling based on coordinates.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-teal-highlight/10 text-teal-highlight shrink-0">
                    <LineChart size={18} />
                  </div>
                </div>
                {/* Visual interface */}
                <div className="space-y-1.5 mt-4 text-left">
                  <div className="w-full h-1.5 bg-cyprus/10 dark:bg-sand/10 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-teal-highlight" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-bold text-cyprus/60 dark:text-sand/60">
                    <span>Distance: 2.34 km</span>
                    <span className="text-cyprus dark:text-teal-highlight">Rs. 200 Travel Fee</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Geolocator Radar (col-span-1) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
                className="p-6 bg-white dark:bg-cyprus rounded-3xl border border-cyprus/5 dark:border-sand/10 shadow-sm flex flex-col justify-between hover:border-cyprus/25 dark:hover:border-teal-highlight/30 transition-all duration-300 min-h-[220px]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-heading font-extrabold text-cyprus-light uppercase tracking-wide">Geofencing</span>
                    <h4 className="font-heading font-bold text-base text-cyprus dark:text-sand">GPS Matching</h4>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65">Haversine sorting mapping local pros within a 10km radius.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-cyprus-light/10 text-cyprus-light shrink-0">
                    <MapPin size={18} />
                  </div>
                </div>
                {/* Visual interface */}
                <div className="flex justify-center py-2 mt-2">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute w-full h-full rounded-full border border-cyprus-light/30 dark:border-teal-highlight/30 animate-ping" />
                    <div className="w-4 h-4 rounded-full bg-cyprus-light dark:bg-teal-highlight flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Stepper Pipeline (col-span-2) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                className="p-6 bg-white dark:bg-cyprus rounded-3xl border border-cyprus/5 dark:border-sand/10 shadow-sm flex flex-col justify-between hover:border-cyprus/25 dark:hover:border-teal-highlight/30 transition-all duration-300 md:col-span-2 min-h-[220px]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-heading font-extrabold text-mustard uppercase tracking-wide">Status tracking</span>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-cyprus dark:text-sand">Dynamic Stepper</h4>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65 max-w-sm">A real-time progression tracker syncing physical check-in status directly into database logs.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-mustard/10 text-mustard shrink-0">
                    <FileCheck2 size={18} />
                  </div>
                </div>
                {/* Visual interface */}
                <div className="grid grid-cols-5 gap-2 mt-4 text-[9px] font-heading font-extrabold text-center text-cyprus/30 dark:text-sand/30">
                  <span className="text-cyprus dark:text-teal-highlight">Confirmed</span>
                  <span className="text-cyprus dark:text-teal-highlight">En Route</span>
                  <span className="text-mustard animate-pulse">Arrived</span>
                  <span>Working</span>
                  <span>Done</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 relative scroll-mt-24">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center max-w-lg mx-auto mb-16 space-y-3">
              <span className="inline-block text-xs font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Agentic Pipeline
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-cyprus dark:text-sand">
                Inside the Orchestrator Brain
              </h2>
              <p className="font-sans text-xs sm:text-sm text-cyprus/70 dark:text-sand/70 leading-relaxed">
                Your conversational request flows asynchronously through a pipeline of five Google Gemini 1.5 Flash agents inside an n8n webhook workflow.
              </p>
            </div>

            <OrchestratorFlow />
          </div>
        </section>

        {/* HIGH-FIDELITY APP VIEWS: BENTO GRID */}
        <section className="py-24 px-4 sm:px-6 bg-cyprus/5 dark:bg-cyprus-dark/20 border-y border-cyprus/5 dark:border-sand/5 relative">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center max-w-lg mx-auto mb-16 space-y-3">
              <span className="inline-block text-xs font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Interface showcase
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-cyprus dark:text-sand">
                High-Fidelity Application Views
              </h2>
              <p className="font-sans text-xs sm:text-sm text-cyprus/70 dark:text-sand/70 leading-relaxed">
                Designed for maximum perceived performance, premium usability, and complete transparency.
              </p>
            </div>

            {/* Bento Grid 2 layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Card 1: Splash system (col-span-1) */}
              <div className="p-6 bg-white dark:bg-cyprus rounded-3xl border border-cyprus/5 dark:border-sand/10 shadow-sm flex flex-col justify-between hover:border-cyprus/25 dark:hover:border-teal-highlight/30 transition-all duration-300 min-h-[220px]">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-heading font-extrabold text-mustard uppercase tracking-wide">Initialization</span>
                    <h4 className="font-heading font-bold text-base text-cyprus dark:text-sand">System Check</h4>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65">Validating Geolocators and API endpoints.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-mustard/10 text-mustard shrink-0">
                    <Smartphone size={18} />
                  </div>
                </div>
                {/* Visual interface */}
                <div className="space-y-1.5 mt-4 text-[10px] font-sans text-left font-semibold">
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <CheckCircle2 size={10} /> GPS Location Resolved
                  </div>
                  <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <CheckCircle2 size={10} /> Backend API Operational
                  </div>
                </div>
              </div>

              {/* Card 2: Voice ripple (col-span-2) */}
              <div className="p-6 bg-white dark:bg-cyprus rounded-3xl border border-cyprus/5 dark:border-sand/10 shadow-sm flex flex-col justify-between hover:border-cyprus/25 dark:hover:border-teal-highlight/30 transition-all duration-300 md:col-span-2 min-h-[220px]">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-heading font-extrabold text-teal-highlight uppercase tracking-wide">Bilingual Speech</span>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-cyprus dark:text-sand">Urdu Speech Ripples</h4>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65 max-w-sm">Animated circular ripple wave overlays scaling outwards during voice transcription input.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-teal-highlight/10 text-teal-highlight shrink-0">
                    <Mic size={18} />
                  </div>
                </div>
                {/* Visual interface */}
                <div className="flex items-center justify-start gap-4 mt-4">
                  <div className="w-8 h-8 rounded-full bg-teal-highlight/20 flex items-center justify-center text-teal-highlight animate-pulse shrink-0">
                    <Mic size={14} />
                  </div>
                  <div className="flex items-end gap-1 h-5">
                    <span className="w-1 h-3 bg-teal-highlight/60 rounded-full animate-bounce" />
                    <span className="w-1 h-5 bg-teal-highlight rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-1 h-4 bg-teal-highlight/80 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-2 bg-teal-highlight/40 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>

              {/* Card 3: Checkout sheet (col-span-2) */}
              <div className="p-6 bg-white dark:bg-cyprus rounded-3xl border border-cyprus/5 dark:border-sand/10 shadow-sm flex flex-col justify-between hover:border-cyprus/25 dark:hover:border-teal-highlight/30 transition-all duration-300 md:col-span-2 min-h-[220px]">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-heading font-extrabold text-teal-highlight uppercase tracking-wide">Checkout UI</span>
                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-cyprus dark:text-sand">Checkout Invoices</h4>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65 max-w-sm">Itemized pricing layouts parsing distance travel surcharges cleanly before user checkout confirmation.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-teal-highlight/10 text-teal-highlight shrink-0">
                    <Sparkles size={18} />
                  </div>
                </div>
                {/* Visual interface */}
                <div className="flex gap-4 mt-4 font-mono text-[10px] font-bold text-cyprus/60 dark:text-sand/60">
                  <span>Base Fee: Rs.1,200</span>
                  <span>Travel (2.3km): Rs.200</span>
                  <span className="text-cyprus dark:text-teal-highlight">Total: Rs.1,400</span>
                </div>
              </div>

              {/* Card 4: Perceived check-in (col-span-1) */}
              <div className="p-6 bg-white dark:bg-cyprus rounded-3xl border border-cyprus/5 dark:border-sand/10 shadow-sm flex flex-col justify-between hover:border-cyprus/25 dark:hover:border-teal-highlight/30 transition-all duration-300 min-h-[220px]">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-heading font-extrabold text-cyprus-light uppercase tracking-wide">UX Psychology</span>
                    <h4 className="font-heading font-bold text-base text-cyprus dark:text-sand">Match Logs</h4>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65">Rotating status indicators mitigating user loading anxiety.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-cyprus-light/10 text-cyprus-light shrink-0">
                    <Eye size={18} />
                  </div>
                </div>
                {/* Visual interface */}
                <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-cyprus/50 dark:text-sand/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-mustard animate-pulse" />
                  <span>"Scanning 50+ providers…"</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* DEVELOPER DOCS */}
        <section id="tech-docs" className="py-20 px-4 sm:px-6 scroll-mt-24">
          <TechnicalDashboard />
        </section>

        {/* CREATORS TEAM */}
        <TeamSection />

        {/* CALL TO ACTION (CTA) */}
        <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-cyprus/5 dark:bg-cyprus-dark/20 border-t border-cyprus/5 dark:border-sand/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-cyprus-light/5 dark:bg-teal-highlight/5 blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto glass-container rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-16 text-center space-y-6 border border-cyprus/25 dark:border-teal-highlight/20 relative z-10">
            <span className="inline-block text-xs font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-cyprus dark:text-sand leading-tight">
              Experience the Future of<br />Local Services Today
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-cyprus/80 dark:text-sand/80 max-w-lg mx-auto leading-relaxed">
              Download the Serviq application bundle directly from GitHub Releases or launch the platform interface client in your browser.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center pt-4">
              <a
                href="https://github.com/ahad324/Serviq/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-cyprus dark:bg-sand text-white dark:text-cyprus-dark rounded-full font-heading font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
                id="cta-download-apk"
              >
                Download Android APK
              </a>
              <a
                href="https://ahad324.github.io/Serviq/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-cyprus/15 dark:border-sand/15 hover:bg-cyprus/5 dark:hover:bg-sand/5 text-cyprus dark:text-sand rounded-full font-heading font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all"
                id="cta-launch-webview"
              >
                Launch Web App Client
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-16 border-t border-cyprus/5 dark:border-sand/5 bg-white dark:bg-cyprus-dark px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-left mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Serviq Logo"
                className="w-8 h-8 rounded-lg object-cover shadow-md"
              />
              <span className="font-heading font-black text-xl tracking-wider text-cyprus dark:text-sand">
                SERVIQ
              </span>
            </div>
            <p className="font-sans text-xs text-cyprus/70 dark:text-sand/70 leading-relaxed max-w-xs">
              An AI-powered service orchestrator automating localized client-technician matching using bilingual NLP intent extraction and geofenced Haversine scoring filters.
            </p>
          </div>

          {/* Col 2: Repository Index */}
          <div className="space-y-3">
            <h5 className="font-heading font-extrabold text-xs text-cyprus dark:text-sand uppercase tracking-wider">
              Project Resources
            </h5>
            <ul className="space-y-2 font-sans text-xs text-cyprus/60 dark:text-sand/65">
              <li>
                <a 
                  href="https://github.com/ahad324/Serviq" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyprus dark:hover:text-teal-highlight transition-colors flex items-center gap-1.5"
                >
                  <Github size={12} />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/ahad324/Serviq/releases" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyprus dark:hover:text-teal-highlight transition-colors"
                >
                  Application Releases (APK)
                </a>
              </li>
              <li>
                <a 
                  href="https://ahad324.github.io/Serviq/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyprus dark:hover:text-teal-highlight transition-colors"
                >
                  Live Web Client
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Creators */}
          <div className="space-y-3">
            <h5 className="font-heading font-extrabold text-xs text-cyprus dark:text-sand uppercase tracking-wider">
              Engineering Creators
            </h5>
            <ul className="space-y-2 font-sans text-xs text-cyprus/60 dark:text-sand/65">
              <li>
                <a 
                  href="https://github.com/ahad324" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyprus dark:hover:text-teal-highlight transition-colors"
                >
                  AbdulAhad (Lead Mobile Architect)
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/moeez5251" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyprus dark:hover:text-teal-highlight transition-colors"
                >
                  Moeez Nadeem (Lead AI/Systems Engineer)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom footer text (No 'made with' or 'licensed under MIT' attribution block) */}
        <div className="max-w-6xl mx-auto border-t border-cyprus/5 dark:border-sand/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[11px] text-cyprus/40 dark:text-sand/40">
            &copy; {new Date().getFullYear()} Serviq.
          </p>
          <div className="font-sans text-[11px] text-cyprus/50 dark:text-sand/55">
            Developed for the{" "}
            <a 
              href="https://gdg.community.dev/events/details/google-gdg-live-pakistan-presents-ai-seekho-2026-kick-off-event/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyprus dark:text-teal-highlight hover:underline"
            >
              AI Seekho 2026 Hackathon (Round 1)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
