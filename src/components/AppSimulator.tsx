"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Sparkles, User, ShieldCheck, MapPin, 
  DollarSign, CheckCircle2, Star, Mic, Send, RefreshCw 
} from "lucide-react";

interface QueryPreset {
  text: string;
  urgency: "High" | "Medium" | "Low";
  lang: string;
  service: string;
  provider: {
    name: string;
    rating: number;
    reviews: number;
    reason: string;
  };
  invoice: {
    base: number;
    distance: number;
    urgency: number;
    platform: number;
  };
}

const PRESETS: QueryPreset[] = [
  {
    text: "AC is leaking water in Bahria Town, please send an expert now.",
    urgency: "High",
    lang: "English-Urdu Bilingual",
    service: "AC Repair / Technician",
    provider: {
      name: "Siddique Electrical & AC Solutions",
      rating: 4.9,
      reviews: 128,
      reason: "Matched Siddique because they are located within 2.3 km (Bahria Town Sector C) and have a 100% attendance rate for emergency AC leaks, bypassing 4 alternative providers with longer arrival estimates."
    },
    invoice: {
      base: 1200,
      distance: 200,
      urgency: 400,
      platform: 100
    }
  },
  {
    text: "Plumber chahiye, kitchen ke sink ka valve repair karna hai.",
    urgency: "Medium",
    lang: "Romanized Urdu",
    service: "Plumbing / Sanitary",
    provider: {
      name: "Bahria Sanitary & Plumbing Experts",
      rating: 4.8,
      reviews: 94,
      reason: "Matched this provider due to specialized experience in under-sink hardware valve refitting and an immediate 15-minute dispatch readiness, scoring 92/100 on historical prompt attendance."
    },
    invoice: {
      base: 800,
      distance: 150,
      urgency: 100,
      platform: 50
    }
  },
  {
    text: "AC maintenance service schedule for tomorrow at 2 PM.",
    urgency: "Low",
    lang: "English Standard",
    service: "AC General Maintenance",
    provider: {
      name: "Green Solutions Maintenance Corp",
      rating: 4.7,
      reviews: 210,
      reason: "Matched due to availability matches for tomorrow's 2:00 PM slot and high general maintenance reviews. Their standard scheduling scores top among Bahria Town local technicians."
    },
    invoice: {
      base: 1000,
      distance: 100,
      urgency: 0,
      platform: 50
    }
  }
];

export default function AppSimulator() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0);
  const [stage, setStage] = useState<"idle" | "typing" | "nlp" | "matching" | "provider" | "pricing" | "tracking" | "completed">("idle");
  const [typedText, setTypedText] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const preset = PRESETS[selectedPresetIdx];

  const runSimulation = async () => {
    // Stage 1: Typing
    setStage("typing");
    setTypedText("");
    setLogs([]);
    setCurrentStepIdx(0);

    const fullText = preset.text;
    for (let i = 0; i <= fullText.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 15));
      setTypedText(fullText.slice(0, i));
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Stage 2: NLP Intent Parsing
    setStage("nlp");
    setLogs((prev) => [...prev, "Initializing bilingual NLP intent parser..."]);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLogs((prev) => [
      ...prev,
      `Resolved Service: ${preset.service}`,
      `Resolved Urgency: ${preset.urgency.toUpperCase()}`,
      `Resolved Language: ${preset.lang}`
    ]);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Stage 3: Multi-Agent Match & Score
    setStage("matching");
    setLogs((prev) => [...prev, "Querying Google Sheets provider directory..."]);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLogs((prev) => [...prev, "Running Haversine distance algorithm..."]);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLogs((prev) => [...prev, "Running weighted scoring (Distance: 40%, Rating: 45%, Reliability: 15%)..."]);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Stage 4: Selected Provider Card
    setStage("provider");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Stage 5: Pricing Breakdown
    setStage("pricing");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Stage 6: Simulated Tracking Stepper
    setStage("tracking");
    const steps = ["Confirmed", "En Route", "Arrived", "Working", "Completed"];
    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIdx(i);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    setStage("completed");
  };

  const resetSimulation = () => {
    setStage("idle");
    setTypedText("");
    setLogs([]);
    setCurrentStepIdx(0);
  };

  const totalInvoice = preset.invoice.base + preset.invoice.distance + preset.invoice.urgency + preset.invoice.platform;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-5xl mx-auto">
      {/* Preset Control Panel */}
      <div className="flex-1 flex flex-col justify-between gap-6 p-6 glass-container rounded-3xl">
        <div>
          <span className="inline-block text-xs font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Interactive sandbox
          </span>
          <h3 className="font-heading font-bold text-2xl text-cyprus dark:text-sand mb-4">
            Test the AI Orchestration
          </h3>
          <p className="font-sans text-sm text-cyprus/70 dark:text-sand/70 mb-6 leading-relaxed">
            Select a custom local service query below. Watch how the Serviq client maps location GPS markers and executes n8n multi-agent loops to book your expert.
          </p>

          <div className="flex flex-col gap-3">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPresetIdx(idx);
                  resetSimulation();
                }}
                disabled={stage !== "idle" && stage !== "completed"}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                  selectedPresetIdx === idx
                    ? "bg-cyprus/5 dark:bg-sand/10 border-cyprus dark:border-teal-highlight shadow-sm"
                    : "bg-transparent border-cyprus/10 dark:border-sand/10 hover:border-cyprus/30 dark:hover:border-sand/30"
                } disabled:opacity-50`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full uppercase ${
                    p.urgency === "High" 
                      ? "bg-red-500/10 text-red-600 dark:text-red-400" 
                      : p.urgency === "Medium"
                      ? "bg-mustard/10 text-cyprus dark:text-mustard"
                      : "bg-green-500/10 text-green-600 dark:text-green-400"
                  }`}>
                    {p.urgency} Urgency
                  </span>
                  <span className="text-[10px] font-sans text-cyprus/50 dark:text-sand/50">
                    {p.lang}
                  </span>
                </div>
                <p className="font-sans font-medium text-xs text-cyprus dark:text-sand truncate">
                  "{p.text}"
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          {stage === "idle" || stage === "completed" ? (
            <button
              onClick={runSimulation}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-cyprus to-cyprus-light dark:from-teal-highlight dark:to-cyprus-light text-white dark:text-cyprus-dark rounded-2xl font-heading font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-cyprus/10"
              id="run-sim-btn"
            >
              <Play size={16} fill="currentColor" />
              {stage === "completed" ? "Restart Simulation" : "Start Simulation"}
            </button>
          ) : (
            <button
              onClick={resetSimulation}
              className="flex-1 flex items-center justify-center gap-2 py-4 border border-cyprus/20 dark:border-sand/20 hover:bg-cyprus/5 dark:hover:bg-sand/5 text-cyprus dark:text-sand rounded-2xl font-heading font-bold text-sm transition-all duration-300"
              id="reset-sim-btn"
            >
              <RefreshCw size={16} className="animate-spin" />
              Reset View
            </button>
          )}
        </div>
      </div>

      {/* Interactive Mobile Frame */}
      <div className="w-full max-w-[320px] h-[600px] mx-auto bg-[#002E2C] dark:bg-[#001D1C] rounded-[48px] p-3 border-4 border-cyprus-light/30 shadow-2xl relative flex flex-col overflow-hidden select-none">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[22px] bg-[#002E2C] dark:bg-[#001D1C] rounded-b-2xl z-20 flex justify-center items-center">
          <div className="w-12 h-1 bg-white/10 rounded-full" />
        </div>

        {/* Screen */}
        <div className="flex-1 bg-sand dark:bg-cyprus-dark rounded-[36px] overflow-hidden relative flex flex-col pt-6 font-sans text-cyprus dark:text-sand">
          {/* Header */}
          <div className="px-4 py-2 flex justify-between items-center border-b border-cyprus/5 dark:border-sand/10">
            <span className="font-heading font-extrabold text-sm tracking-tight">
              SERVIQ
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-cyprus/50 dark:text-sand/50">
                Live location active
              </span>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col relative">
            <AnimatePresence mode="wait">
              {/* Stage: Idle */}
              {stage === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col justify-between py-6"
                >
                  <div className="text-center">
                    <div className="w-14 h-14 bg-cyprus/5 dark:bg-sand/10 rounded-2xl flex items-center justify-center mx-auto mb-4 glow-effect">
                      <Sparkles size={24} className="text-mustard" />
                    </div>
                    <h4 className="font-heading font-extrabold text-lg mb-2">
                      Need a home expert?
                    </h4>
                    <p className="text-xs text-cyprus/60 dark:text-sand/60 px-4 leading-relaxed">
                      Type your problem in Urdu or English. No search forms, no filters, no hassle.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Mock Textarea */}
                    <div className="p-3 bg-white dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10 text-left relative min-h-[80px]">
                      <span className="text-[11px] text-cyprus/40 dark:text-sand/40">
                        Try saying: "Kitchen sink is blocked..."
                      </span>
                    </div>

                    <div className="flex gap-2 justify-center">
                      <div className="w-10 h-10 rounded-full bg-cyprus/5 dark:bg-sand/10 flex items-center justify-center text-cyprus/60 dark:text-sand/60">
                        <Mic size={16} />
                      </div>
                      <div className="flex-1 h-10 rounded-full bg-gradient-to-r from-cyprus to-cyprus-light dark:from-teal-highlight dark:to-cyprus-light text-white dark:text-cyprus-dark font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                        Submit Request
                        <Send size={12} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage: Typing */}
              {stage === "typing" && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-end"
                >
                  <div className="p-4 bg-white dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10 mb-4 text-xs font-medium text-left leading-relaxed">
                    {typedText}
                    <span className="w-1.5 h-3.5 bg-cyprus dark:bg-sand inline-block ml-1 animate-pulse" />
                  </div>

                  <div className="flex gap-2 justify-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-cyprus/5 dark:bg-sand/10 flex items-center justify-center text-cyprus/60 dark:text-sand/60">
                      <Mic size={16} />
                    </div>
                    <div className="flex-1 h-10 rounded-full bg-cyprus/30 dark:bg-sand/20 font-heading font-bold text-xs flex items-center justify-center gap-1.5 text-white/50 cursor-not-allowed">
                      Submit Request
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage: NLP Parsing and Multi-Agent logs */}
              {(stage === "nlp" || stage === "matching") && (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-center text-left py-4"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <RefreshCw className="animate-spin text-mustard" size={16} />
                    <span className="font-heading font-bold text-xs tracking-wider uppercase text-cyprus/50 dark:text-sand/50">
                      {stage === "nlp" ? "AI Understanding" : "AI Provider Matching"}
                    </span>
                  </div>

                  <div className="bg-cyprus-dark text-emerald-400 p-4 rounded-2xl font-mono text-[10px] space-y-2 border border-emerald-500/20 overflow-y-auto max-h-[300px]">
                    {logs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        &gt; {log}
                      </motion.div>
                    ))}
                    <div className="w-2 h-3 bg-emerald-400 inline-block animate-pulse ml-1" />
                  </div>
                </motion.div>
              )}

              {/* Stage: Provider List */}
              {stage === "provider" && (
                <motion.div
                  key="provider"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col justify-between py-2 text-left"
                >
                  <div>
                    <span className="text-[10px] font-heading font-bold text-cyprus/50 dark:text-sand/50 uppercase tracking-widest block mb-3">
                      Best Match Found
                    </span>

                    <div className="p-4 bg-white dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10 shadow-sm space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyprus-light/20 flex items-center justify-center font-heading font-extrabold text-sm text-cyprus dark:text-teal-highlight">
                          {preset.provider.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-heading font-bold text-xs text-cyprus dark:text-sand">
                            {preset.provider.name}
                          </h5>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star size={10} className="fill-mustard text-mustard" />
                            <span className="text-[10px] font-bold">
                              {preset.provider.rating}
                            </span>
                            <span className="text-[9px] text-cyprus/40 dark:text-sand/40">
                              ({preset.provider.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 bg-cyprus/5 dark:bg-sand/5 rounded-xl border border-cyprus/5 dark:border-sand/5">
                        <span className="text-[9px] font-heading font-bold uppercase text-mustard block mb-1">
                          AI Reasoning
                        </span>
                        <p className="text-[10px] text-cyprus/80 dark:text-sand/80 leading-relaxed font-sans font-medium">
                          "{preset.provider.reason}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full h-11 bg-gradient-to-r from-cyprus to-cyprus-light dark:from-teal-highlight dark:to-cyprus-light text-white dark:text-cyprus-dark rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm mt-4">
                    Review Pricing
                  </button>
                </motion.div>
              )}

              {/* Stage: Pricing */}
              {stage === "pricing" && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col justify-between py-2 text-left"
                >
                  <div>
                    <span className="text-[10px] font-heading font-bold text-cyprus/50 dark:text-sand/50 uppercase tracking-widest block mb-3">
                      Pricing Breakdown
                    </span>

                    <div className="p-4 bg-white dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-cyprus/5 dark:border-sand/10">
                        <div className="w-8 h-8 rounded-full bg-cyprus-light/20 flex items-center justify-center font-heading font-extrabold text-xs text-cyprus dark:text-teal-highlight">
                          {preset.provider.name.charAt(0)}
                        </div>
                        <h6 className="font-heading font-bold text-xs truncate">
                          {preset.provider.name}
                        </h6>
                      </div>

                      <div className="space-y-2 text-xs font-sans font-medium">
                        <div className="flex justify-between">
                          <span className="text-cyprus/60 dark:text-sand/60">Base Service Fee</span>
                          <span>Rs. {preset.invoice.base}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cyprus/60 dark:text-sand/60">Distance Cost (2.3 km)</span>
                          <span>Rs. {preset.invoice.distance}</span>
                        </div>
                        {preset.invoice.urgency > 0 && (
                          <div className="flex justify-between text-mustard">
                            <span>Emergency Urgency Fee</span>
                            <span>Rs. {preset.invoice.urgency}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-cyprus/60 dark:text-sand/60">Platform Fee</span>
                          <span>Rs. {preset.invoice.platform}</span>
                        </div>
                        <div className="h-px bg-cyprus/10 dark:bg-sand/10 my-1" />
                        <div className="flex justify-between font-heading font-extrabold text-sm pt-1">
                          <span>Grand Total</span>
                          <span className="text-cyprus dark:text-teal-highlight">Rs. {totalInvoice}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full h-11 bg-gradient-to-r from-cyprus to-cyprus-light dark:from-teal-highlight dark:to-cyprus-light text-white dark:text-cyprus-dark rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm mt-4">
                    Confirm & Book Service
                  </button>
                </motion.div>
              )}

              {/* Stage: Tracking */}
              {stage === "tracking" && (
                <motion.div
                  key="tracking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-between py-2 text-left"
                >
                  <div>
                    <span className="text-[10px] font-heading font-bold text-cyprus/50 dark:text-sand/50 uppercase tracking-widest block mb-4">
                      Real-Time Tracking
                    </span>

                    {/* Progress Stepper */}
                    <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-cyprus/10 dark:before:bg-sand/10">
                      {["Confirmed", "En Route", "Arrived", "Working", "Completed"].map((step, idx) => {
                        const isCurrent = idx === currentStepIdx;
                        const isPassed = idx < currentStepIdx;

                        return (
                          <div key={step} className="relative flex items-center gap-3">
                            {/* Bullet */}
                            <div className={`absolute -left-6 z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                              isPassed 
                                ? "bg-cyprus border-cyprus dark:bg-teal-highlight dark:border-teal-highlight text-white dark:text-cyprus-dark"
                                : isCurrent
                                ? "bg-sand dark:bg-cyprus-dark border-mustard scale-110"
                                : "bg-sand dark:bg-cyprus-dark border-cyprus/20 dark:border-sand/20"
                            }`}>
                              {isPassed && <CheckCircle2 size={10} className="stroke-[3]" />}
                              {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-mustard animate-pulse" />}
                            </div>

                            <span className={`text-[11px] font-heading font-bold transition-all duration-300 ${
                              isPassed
                                ? "text-cyprus/40 dark:text-sand/40 line-through"
                                : isCurrent
                                ? "text-cyprus dark:text-sand scale-105"
                                : "text-cyprus/20 dark:text-sand/20"
                            }`}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10 flex items-center gap-3 shadow-sm mt-4">
                    <div className="w-8 h-8 rounded-full bg-cyprus/5 dark:bg-sand/10 flex items-center justify-center text-cyprus dark:text-teal-highlight font-heading font-extrabold text-xs">
                      {preset.provider.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-heading font-bold">{preset.provider.name}</p>
                      <p className="text-[9px] text-cyprus/50 dark:text-sand/50">Status: {["Confirmed", "En Route", "Arrived", "Working", "Completed"][currentStepIdx]}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage: Completed (Feedback) */}
              {stage === "completed" && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col justify-center text-center py-6"
                >
                  <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="font-heading font-extrabold text-base mb-1">
                    Service Completed!
                  </h4>
                  <p className="text-[11px] text-cyprus/60 dark:text-sand/60 mb-6 px-4">
                    Your plumbing/AC issue was resolved. Rate your matched professional:
                  </p>

                  <div className="flex gap-2 justify-center mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={20} className="fill-mustard text-mustard cursor-pointer scale-100 hover:scale-110 transition-transform" />
                    ))}
                  </div>

                  <button
                    onClick={resetSimulation}
                    className="w-[120px] mx-auto py-2.5 border border-cyprus/10 dark:border-sand/10 hover:bg-cyprus/5 dark:hover:bg-sand/5 text-cyprus dark:text-sand rounded-xl font-heading font-semibold text-xs transition-all duration-300"
                  >
                    Back to Start
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
