"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, AppWindow, Cpu, Code2, Terminal } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  tag: string;
  avatarInitials: string;
  gradient: string;
  icon: any;
  techStack: string[];
  consoleTitle: string;
  consoleCode: string;
  github: string;
  linkedin: string;
}

const MEMBERS: TeamMember[] = [
  {
    name: "AbdulAhad",
    role: "Lead Mobile Architect & Co-Founder",
    tag: "Flutter & State Expert",
    avatarInitials: "AA",
    gradient: "from-cyprus to-teal-highlight",
    icon: AppWindow,
    techStack: ["Flutter", "Riverpod", "Geolocator API", "GoRouter", "Dart SDK"],
    consoleTitle: "mobile_client_controller.dart",
    consoleCode: `class SpeechNotifier extends StateNotifier<SpeechState> {
  final GeolocatorPlatform _gps = GeolocatorPlatform.instance;

  Future<void> dispatchIntent(String transcript) async {
    final pos = await _gps.getCurrentPosition();
    state = SpeechState.analyzing();
    final res = await _client.post('/webhook', {
      'query': transcript,
      'lat': pos.latitude,
      'lng': pos.longitude
    });
    state = SpeechState.success(res.data);
  }
}`,
    github: "https://github.com/ahad324",
    linkedin: "https://www.linkedin.com/in/abdul-ahad-a08263273"
  },
  {
    name: "Moeez Nadeem",
    role: "Lead AI & Systems Engineer & Co-Founder",
    tag: "Workflow & Database Expert",
    avatarInitials: "MN",
    gradient: "from-cyprus-light to-mustard",
    icon: Cpu,
    techStack: ["n8n core", "Gemini 1.5 Flash", "Supabase", "Railway", "PostgreSQL"],
    consoleTitle: "n8n_agent_orchestrator.json",
    consoleCode: `{
  "nodes": [
    { "type": "n8n-nodes-base.webhook", "name": "HTTPS Gateway" },
    { "type": "n8n-nodes-base.googleSheets", "name": "Fetch Providers" },
    { "type": "n8n-nodes-base.googleGemini", "name": "Intent Model" },
    { "type": "n8n-nodes-base.supabase", "name": "Sync Bookings" }
  ],
  "connections": {
    "Gateway": [ { "node": "Intent Model", "index": 0 } ]
  }
}`,
    github: "https://github.com/moeez5251",
    linkedin: "https://www.linkedin.com/in/moeez-sheikh/"
  }
];

export default function TeamSection() {
  return (
    <section id="meet-team" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-highlight/5 blur-3xl pointer-events-none" />
      
      <div className="mb-16">
        <span className="inline-block text-xs font-heading font-extrabold text-mustard bg-cyprus/5 dark:bg-sand/10 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          Behind the platform
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-cyprus dark:text-sand">
          Meet the Engineering Creators
        </h2>
        <p className="font-sans text-sm text-cyprus/70 dark:text-sand/70 mt-2 max-w-lg mx-auto leading-relaxed">
          The two-member team driving the mobile client-side interface and backend multi-agent cognitive architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {MEMBERS.map((member, idx) => {
          const MemberIcon = member.icon;

          return (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-6 sm:p-8 glass-container rounded-[32px] text-left flex flex-col justify-between hover:border-cyprus/20 dark:hover:border-teal-highlight/40 hover:shadow-xl hover:shadow-cyprus/5 transition-all duration-300 group relative overflow-hidden"
            >
              <div>
                {/* Profile Header */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {/* Initials Avatar */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${member.gradient} flex items-center justify-center font-heading font-extrabold text-lg text-white select-none shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    {member.avatarInitials}
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-heading font-bold text-mustard uppercase mb-0.5">
                      <MemberIcon size={10} />
                      {member.tag}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-cyprus dark:text-sand leading-none">
                      {member.name}
                    </h3>
                    <p className="font-sans text-xs text-cyprus/60 dark:text-sand/65 mt-1 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {member.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-cyprus/5 dark:bg-sand/10 text-cyprus/80 dark:text-sand/80 font-mono text-[9px] font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Developer Terminal Box */}
                <div className="w-full bg-cyprus-dark rounded-2xl border border-cyprus-light/10 overflow-hidden mb-6 flex flex-col">
                  {/* Title Bar */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-cyprus-light/10 bg-cyprus-darker">
                    <span className="font-mono text-[9px] text-cyprus-light dark:text-teal-highlight flex items-center gap-1.5 font-bold">
                      <Code2 size={10} />
                      {member.consoleTitle}
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                    </div>
                  </div>
                  {/* Code Panel */}
                  <div className="p-4 font-mono text-[10px] text-emerald-400 overflow-x-auto leading-relaxed select-text">
                    <pre className="whitespace-pre overflow-x-auto">{member.consoleCode}</pre>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="flex items-center gap-3 border-t border-cyprus/10 dark:border-sand/10 pt-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cyprus/5 dark:bg-sand/5 text-cyprus/70 dark:text-sand/70 hover:text-cyprus dark:hover:text-teal-highlight hover:bg-cyprus/10 dark:hover:bg-sand/10 transition-colors"
                  aria-label={`${member.name} Github`}
                >
                  <Github size={16} />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cyprus/5 dark:bg-sand/5 text-cyprus/70 dark:text-sand/70 hover:text-cyprus dark:hover:text-teal-highlight hover:bg-cyprus/10 dark:hover:bg-sand/10 transition-colors"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
