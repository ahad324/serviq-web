"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, AppWindow, Cpu, Award } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  tag: string;
  avatarInitials: string;
  gradient: string;
  icon: any;
  techStack: string[];
  contributions: string[];
  github: string;
  linkedin: string;
}

const MEMBERS: TeamMember[] = [
  {
    name: "AbdulAhad",
    role: "Lead Mobile Architect & DevOps Engineer",
    tag: "Flutter & CI/CD",
    avatarInitials: "AA",
    gradient: "from-cyprus to-teal-highlight",
    icon: AppWindow,
    techStack: ["Flutter", "Riverpod State", "GitHub Actions", "Build Pipelines", "Geolocator API"],
    contributions: [
      "Engineered the responsive cross-platform Flutter mobile client application.",
      "Configured automatic Android APK packaging and CI/CD GitHub Actions release workflows.",
      "Integrated location-aware matching telemetry and speech recording modules."
    ],
    github: "https://github.com/ahad324",
    linkedin: "https://www.linkedin.com/in/abdul-ahad-a08263273"
  },
  {
    name: "Moeez Nadeem",
    role: "Lead AI & Systems Engineer",
    tag: "Workflows & Agentic AI",
    avatarInitials: "MN",
    gradient: "from-cyprus-light to-mustard",
    icon: Cpu,
    techStack: ["n8n Workflows", "Gemini 1.5 Flash", "Supabase DB", "Railway API", "JSON Schema"],
    contributions: [
      "Designed the 5-agent n8n orchestrator intent mapping pipeline.",
      "Constructed secure Row-Level Security rules and Supabase relational schemas.",
      "Established stateless Railway hosting gateways and webhook triggers."
    ],
    github: "https://github.com/moeez5251",
    linkedin: "https://www.linkedin.com/in/moeez-sheikh/"
  }
];

export default function TeamSection() {
  return (
    <section id="meet-team" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center relative scroll-mt-24">
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

                {/* Contributions List */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-heading font-bold text-[11px] text-cyprus/90 dark:text-sand/90 uppercase tracking-wider">
                    Key Contributions
                  </h4>
                  <ul className="space-y-2">
                    {member.contributions.map((contrib, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-xs font-sans text-cyprus/70 dark:text-sand/75 leading-relaxed font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-highlight/80 dark:bg-teal-highlight mt-1.5 shrink-0" />
                        <span>{contrib}</span>
                      </li>
                    ))}
                  </ul>
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
