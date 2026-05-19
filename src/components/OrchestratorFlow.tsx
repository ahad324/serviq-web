"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Shield, Database, Compass, CheckSquare, 
  Tag, MapPin, Receipt, CalendarRange, ArrowRight, ArrowDown 
} from "lucide-react";

interface NodeData {
  id: string;
  step: string;
  name: string;
  type: "system" | "gemini-agent" | "database" | "client";
  icon: any;
  summary: string;
  description: string;
  input: string;
  output: string;
}

const NODES: NodeData[] = [
  {
    id: "client-request",
    step: "01",
    name: "POST /webhook/service-request",
    type: "client",
    icon: Terminal,
    summary: "Bilingual natural language payload + GPS coordinates.",
    description: "The Flutter mobile client issues an authenticated HTTPS POST request containing the raw transcription stream (English/Urdu mix) and Geolocator GPS latitude and longitude coordinates.",
    input: `{ "query": "ac leak kar raha hai in bahria town", "lat": 33.5684, "lng": 73.1254 }`,
    output: `HTTP 202 Accepted { "session_id": "req_8b2f9a" }`
  },
  {
    id: "n8n-webhook",
    step: "02",
    name: "n8n Gateway Router",
    type: "system",
    icon: Compass,
    summary: "Railway node verifying tokens & headers.",
    description: "The gateway router verifies Supabase-issued Bearer JWT authorization headers, sanitizes client inputs, and forwards parameters to the NLP intent sequencer.",
    input: `HTTPS Headers + Request payload JSON`,
    output: `Internal pipeline state context { "session_id": "req_8b2f9a" }`
  },
  {
    id: "intent-agent",
    step: "03",
    name: "Intent Extraction Agent",
    type: "gemini-agent",
    icon: Tag,
    summary: "Gemini 1.5 Flash query categorization.",
    description: "Extracts semantic service classification (e.g. mapping colloquial Urdu 'ac leak' to Google Places tag 'home_goods_store/electrician'), filters out garbage, and determines urgency.",
    input: `query: "ac leak kar raha hai..."`,
    output: `{ "service_category": "ac_repair", "urgency": "HIGH", "confidence": 0.98 }`
  },
  {
    id: "provider-db",
    step: "04",
    name: "Provider Spreadsheet Index",
    type: "database",
    icon: Database,
    summary: "Secure Google Sheets directory lookup.",
    description: "Queries the read-only Google Sheets directory to index technicians offering services matching the extracted category in the user's general geographic region.",
    input: `category: "ac_repair", region: "Rawalpindi/Islamabad"`,
    output: `Array of 15 candidate profiles { id, name, location, rating, base_rate }`
  },
  {
    id: "matching-agent",
    step: "05",
    name: "Geographic Sorting Agent",
    type: "gemini-agent",
    icon: MapPin,
    summary: "Haversine distance filter & ranker.",
    description: "Calculates ellipsoidal distance using the Haversine formula between the user GPS location and technician home coordinates, sorting candidates by travel time.",
    input: `user_gps, candidate_array`,
    output: `Sorted list of 5 closest candidate providers with computed distance (km)`
  },
  {
    id: "decision-agent",
    step: "06",
    name: "Cognitive Matching Agent",
    type: "gemini-agent",
    icon: Shield,
    summary: "Scoring engine picking the target expert.",
    description: "Calculates the weighted score based on distance (40%), rating (45%), and reliability (15%). Compiles the final 'reason_for_chosen' justification.",
    input: `Top 5 candidates with distance and review vectors`,
    output: `Selected technician object { id: "p_94", name: "Siddique AC", score: 94.6 }`
  },
  {
    id: "pricing-agent",
    step: "07",
    name: "Dynamic Invoice Agent",
    type: "gemini-agent",
    icon: Receipt,
    summary: "Itemized line-bill calculator.",
    description: "Computes base cost, distance surcharges (Rs. 80/km), urgency multipliers, and platform commission. Generates the final, non-negotiable quote.",
    input: `{ base: 1200, distance: 2.34, urgency: "HIGH" }`,
    output: `{ base: 1200, travel: 200, surcharge: 400, platform: 100, total: 1900 }`
  },
  {
    id: "booking-agent",
    step: "08",
    name: "Calendar & Payload Agent",
    type: "gemini-agent",
    icon: CalendarRange,
    summary: "Schedule validator & JSON packager.",
    description: "Validates provider calendars to verify scheduling slots, packages the unified service response payload, and issues the response payload.",
    input: `Selected provider details + Dynamic invoice JSON`,
    output: `Unified ServiceResponse { provider, invoice, tracker_id }`
  },
  {
    id: "supabase-sync",
    step: "09",
    name: "Supabase Relational Sync",
    type: "database",
    icon: CheckSquare,
    summary: "Authenticated database transaction log.",
    description: "Upon client confirmation, commits the session transaction to Supabase public.'Bookings' using row-level security tokens, triggering GoRouter tracking.",
    input: `Client-signed ServiceResponse payload`,
    output: `Supabase Insert transaction { status: 201 Created }`
  }
];

export default function OrchestratorFlow() {
  const [activeNodeId, setActiveNodeId] = useState<string>("intent-agent");

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6 items-stretch justify-center max-w-6xl mx-auto my-8 px-2 sm:px-4">
      {/* Node Grid Map */}
      <div className="flex-1 p-5 sm:p-6 glass-container rounded-3xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block text-[10px] font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
              System Pipeline
            </span>
            <span className="text-[10px] font-mono text-cyprus/40 dark:text-sand/40">
              Railway v1.4 • Supabase v2.3
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-cyprus dark:text-sand mb-6">
            Agentic n8n Webhook Pipeline
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NODES.map((node) => {
              const NodeIcon = node.icon;
              const isActive = node.id === activeNodeId;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "bg-cyprus dark:bg-teal-highlight/10 border-cyprus dark:border-teal-highlight shadow-md scale-[1.02] z-10"
                      : "bg-white/40 dark:bg-transparent border-cyprus/10 dark:border-sand/10 hover:border-cyprus/25 dark:hover:border-sand/25"
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <div className={`p-2 rounded-xl transition-colors duration-300 ${
                      isActive 
                        ? "bg-mustard text-cyprus-dark" 
                        : "bg-cyprus/5 dark:bg-sand/10 text-cyprus dark:text-sand group-hover:bg-cyprus/10 dark:group-hover:bg-sand/15"
                    }`}>
                      <NodeIcon size={16} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[8px] font-heading font-bold px-1.5 py-0.5 rounded-full uppercase ${
                        node.type === "gemini-agent"
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : node.type === "database"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : node.type === "system"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-green-500/10 text-green-600 dark:text-green-400"
                      }`}>
                        {node.type}
                      </span>
                      <span className="font-heading font-extrabold text-[10px] text-cyprus/30 dark:text-sand/30">
                        {node.step}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className={`font-heading font-extrabold text-xs sm:text-sm tracking-tight ${
                      isActive ? "text-white dark:text-sand" : "text-cyprus dark:text-sand"
                    }`}>
                      {node.name}
                    </h4>
                    <p className={`text-[10px] font-sans mt-0.5 leading-normal ${
                      isActive ? "text-white/60 dark:text-sand/65" : "text-cyprus/60 dark:text-sand/60"
                    }`}>
                      {node.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-[10px] font-sans text-cyprus/40 dark:text-sand/40 text-center mt-6">
          * Select any of the pipeline nodes above to trace the precise input/output payload interfaces.
        </p>
      </div>

      {/* Details Inspector Panel */}
      <div className="w-full xl:w-[350px] p-5 sm:p-6 glass-container rounded-3xl flex flex-col justify-between border-cyprus/10 dark:border-teal-highlight/20 relative overflow-hidden shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-cyprus/10 dark:border-sand/10">
              <div className="p-2.5 rounded-xl bg-cyprus-light/10 text-cyprus dark:text-teal-highlight">
                <activeNode.icon size={20} />
              </div>
              <div>
                <span className="text-[8px] font-heading font-bold text-mustard uppercase tracking-widest block">
                  Pipeline Step {activeNode.step}
                </span>
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-cyprus dark:text-sand">
                  {activeNode.name}
                </h4>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-[9px] font-heading font-extrabold text-cyprus/40 dark:text-sand/40 uppercase block mb-1">
                Node Specification
              </span>
              <p className="font-sans text-[11px] text-cyprus/80 dark:text-sand/80 leading-relaxed font-medium">
                {activeNode.description}
              </p>
            </div>

            {/* Inputs/Outputs */}
            <div className="space-y-3">
              <div className="p-3 bg-cyprus/5 dark:bg-sand/5 rounded-xl border border-cyprus/5 dark:border-sand/5">
                <span className="text-[8px] font-heading font-bold text-cyprus/50 dark:text-sand/50 uppercase block mb-1">
                  Expected Input Schema
                </span>
                <code className="font-mono text-[9px] text-cyprus-dark dark:text-teal-highlight block break-words whitespace-pre-wrap">
                  {activeNode.input}
                </code>
              </div>

              <div className="p-3 bg-cyprus/5 dark:bg-sand/5 rounded-xl border border-cyprus/5 dark:border-sand/5">
                <span className="text-[8px] font-heading font-bold text-cyprus/50 dark:text-sand/50 uppercase block mb-1">
                  Generated Output JSON
                </span>
                <code className="font-mono text-[9px] text-cyprus-dark dark:text-mustard block break-words whitespace-pre-wrap">
                  {activeNode.output}
                </code>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <activeNode.icon size={130} />
        </div>
      </div>
    </div>
  );
}
