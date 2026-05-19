"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, Mic, ShieldAlert, KeyRound, Cpu, Lock } from "lucide-react";

export default function TechnicalDashboard() {
  const [activeTab, setActiveTab] = useState<"formula" | "security" | "speech">("formula");

  const tabs = [
    { id: "formula", label: "Location Scoring Formula", icon: Percent },
    { id: "security", label: "Security & Token Isolation", icon: Lock },
    { id: "speech", label: "Bilingual Speech Abstraction", icon: Mic },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 glass-container rounded-xl p-5 sm:p-6 md:p-8 text-left border border-cyprus/10 dark:border-sand/10">
      {/* Heading */}
      <div className="mb-8">
        <span className="inline-block text-xs font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          Developer portal
        </span>
        <h3 className="font-heading font-bold text-2xl text-cyprus dark:text-sand">
          Technical Architecture & Integrity
        </h3>
        <p className="font-sans text-sm text-cyprus/70 dark:text-sand/70 mt-1 max-w-2xl leading-relaxed">
          Explore the mathematical formulas, database relational schemes, and cross-platform compilation abstractions driving Serviq's backend and frontend nodes.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2 border-b border-cyprus/10 dark:border-sand/10 pb-4 mb-6">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-heading font-semibold text-xs transition-all duration-300 ${
                isActive
                  ? "bg-cyprus dark:bg-teal-highlight text-white dark:text-cyprus-dark shadow-sm"
                  : "bg-transparent hover:bg-cyprus/5 dark:hover:bg-sand/5 text-cyprus/70 dark:text-sand/70 hover:text-cyprus dark:hover:text-sand"
              }`}
              id={`tech-tab-${tab.id}`}
            >
              <TabIcon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab viewport */}
      <div className="min-h-[350px] relative">
        <AnimatePresence mode="wait">
          {activeTab === "formula" && (
            <motion.div
              key="formula"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Formula Block */}
              <div className="p-6 bg-cyprus-dark text-white rounded-2xl border border-cyprus-light/20 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-heading font-bold text-mustard uppercase tracking-widest block mb-2">
                  Matching and Decision scoring formula
                </span>
                <div className="font-heading font-extrabold text-lg md:text-2xl py-4 overflow-x-auto max-w-full tracking-wide">
                  {"Score = (0.40 × S_d) + (0.45 × S_r) + (0.15 × S_rel)"}
                </div>
                <p className="text-[10px] text-teal-highlight font-sans max-w-lg mt-2">
                  * Dynamic weights adjust matching results based on client urgency and live travel vectors.
                </p>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
                <div className="p-4 bg-white/40 dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10">
                  <h5 className="font-heading font-extrabold text-sm text-cyprus dark:text-sand mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyprus dark:bg-teal-highlight" />
                    {"Distance Weight (S_d - 40%)"}
                  </h5>
                  <p className="text-cyprus/80 dark:text-sand/80 leading-relaxed font-medium">
                    Calculated using the **Great-Circle Haversine Formula** over GPS coordinates. Yields 1.0 for close targets (&lt;3 km) and drops off exponentially for longer distances.
                  </p>
                </div>

                <div className="p-4 bg-white/40 dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10">
                  <h5 className="font-heading font-extrabold text-sm text-cyprus dark:text-sand mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyprus dark:bg-teal-highlight" />
                    {"Rating Score (S_r - 45%)"}
                  </h5>
                  <p className="text-cyprus/80 dark:text-sand/80 leading-relaxed font-medium">
                    Combines average review stars (scaled proportionally 0.0 to 5.0) and cumulative feedback counts. Ensures high-trust, established technicians are prioritized.
                  </p>
                </div>

                <div className="p-4 bg-white/40 dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10">
                  <h5 className="font-heading font-extrabold text-sm text-cyprus dark:text-sand mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyprus dark:bg-teal-highlight" />
                    {"Reliability Weight (S_rel - 15%)"}
                  </h5>
                  <p className="text-cyprus/80 dark:text-sand/80 leading-relaxed font-medium">
                    Tracks historical client check-in times and attendance rates. Technicians who cancel or check in late have their reliability scoring penalized.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Security Advisory Banner */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3">
                <div className="p-1.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <KeyRound size={16} />
                </div>
                <div>
                  <h5 className="font-heading font-bold text-xs text-cyprus dark:text-sand">
                    Secure JWT Authorization Boundary
                  </h5>
                  <p className="font-sans text-[11px] text-cyprus/70 dark:text-sand/70 mt-0.5 leading-normal">
                    Client requests are filtered through an SSL/TLS 1.3 gateway. Supabase authentication validates user identity tokens client-side, isolating database transactions using Row-Level Security.
                  </p>
                </div>
              </div>

              {/* Security Protocol Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                <div className="p-5 bg-white/40 dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10 space-y-2">
                  <h5 className="font-heading font-extrabold text-sm text-cyprus dark:text-sand flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-mustard" />
                    Token Encapsulation
                  </h5>
                  <p className="text-cyprus/80 dark:text-sand/80 leading-relaxed font-medium">
                    Requests bypass direct database access and authenticate through a secure Railway backend webhook. Raw table structures, indexing properties, and administrative spreadsheet links are hidden behind gateway-only access.
                  </p>
                </div>

                <div className="p-5 bg-white/40 dark:bg-cyprus rounded-2xl border border-cyprus/10 dark:border-sand/10 space-y-2">
                  <h5 className="font-heading font-extrabold text-sm text-cyprus dark:text-sand flex items-center gap-1.5">
                    <Lock size={14} className="text-teal-highlight" />
                    Transaction Security Schema
                  </h5>
                  <div className="bg-cyprus-dark p-3 rounded-xl border border-cyprus-light/20 font-mono text-[10px] text-emerald-400 space-y-1">
                    <div>{"{"}</div>
                    <div className="pl-4">{"\"auth_scope\": \"session_user_jwt\","}</div>
                    <div className="pl-4">{"\"isolation_level\": \"row_isolation\","}</div>
                    <div className="pl-4">{"\"ssl_cipher\": \"TLS_AES_256_GCM_SHA384\""}</div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "speech" && (
            <motion.div
              key="speech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Block */}
                <div className="bg-cyprus-dark p-4 sm:p-5 rounded-2xl border border-cyprus-light/20 font-mono text-[10px] sm:text-[11px] overflow-x-auto text-emerald-400">
                  <pre className="whitespace-pre overflow-x-auto">{`// app_speech_helper.dart
// Conditional compile-directives mapping abstraction
import 'speech_helper_stub.dart'
    if (dart.library.html) 'speech_helper_web.dart'
    if (dart.library.io) 'speech_helper_mobile.dart';

abstract class AppSpeechHelper {
  static AppSpeechHelper? _instance;
  
  static AppSpeechHelper get instance {
    _instance ??= getSpeechHelperInstance();
    return _instance!;
  }

  Future<void> initialize();
  void startListening(Function(String) onResult);
  void stopListening();
}`}</pre>
                </div>

                {/* Explanation */}
                <div className="flex flex-col justify-center space-y-4 font-sans text-xs">
                  <h4 className="font-heading font-extrabold text-sm text-cyprus dark:text-sand flex items-center gap-2">
                    <Cpu size={16} className="text-mustard" />
                    Conditional Import Abstraction Pattern
                  </h4>
                  <p className="text-cyprus/80 dark:text-sand/80 leading-relaxed font-medium">
                    Serviq supports native speech recognition on iOS/Android device emulators and standard Web Speech APIs on browser builds.
                  </p>
                  <p className="text-cyprus/80 dark:text-sand/80 leading-relaxed font-medium">
                    To prevent browser-specific packages (`dart:html`) from crashing mobile builds during packing, the Dart compiler resolves imports at compile-time. This abstraction checks the platform libraries and loads the appropriate platform backend dynamically.
                  </p>
                  <div className="flex items-center gap-2 text-mustard font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-mustard" />
                    Brings compile-time stability across iOS, Android, and Web platforms.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
