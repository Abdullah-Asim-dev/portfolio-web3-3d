'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

/* =========================================================
   THEME (Neon Violet)
   bg #0B0B14 | surface #14142A | violet #8B5CF6 | cyan #22D3EE
   text #F1F1F8 | muted #9A9AB5
========================================================= */

const TABS = ['All', 'Development', 'Tools', 'SaaS'] as const;
type Tab = (typeof TABS)[number];

/* =========================================================
   PROJECTS DATA (same as before, categories kept)
========================================================= */
const PROJECTS_DATA = [
  {
    title: 'Full-Ecommerce App',
    description:
      'A production-ready architecture featuring secure checkout logic, product dashboards, and complete MERN CRUD integration layers.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    category: 'Development',
    liveLink: 'https://mern-ecommerce-app-alpha-henna.vercel.app/',
    githubLink: 'https://github.com/Abdullah-Asim-dev/Mern-Ecommerce-App.git',
  },
  {
    title: 'Chat Application',
    description:
      'Real-time communication engine leveraging secure web socket instances, persistent history layers, and typing synchronizations.',
    tech: ['React.js', 'Node.js', 'Socket.io', 'MongoDB'],
    category: 'Development',
    liveLink: 'https://gleaming-fairy-e0fcdc.netlify.app/',
    githubLink: 'https://github.com/Abdullah-Asim-dev/Websocket-App.git',
  },
  {
    title: 'JWT Authentication',
    description:
      'Advanced cryptographic authentication module structured around atomic access tokens, refresh tracking, and protected routing shields.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    category: 'Development',
    liveLink: 'https://jwt-authicatication-xvlc.vercel.app/',
    githubLink: 'https://github.com/Abdullah-Asim-dev/JWT-Authicatication.git',
  },
  {
    title: 'React Todo App',
    description:
      'A highly optimized, performant state monitoring utility application engineered with global state hooks and fluid dark glassmorphism.',
    tech: ['React.js', 'Redux Toolkit', 'Tailwind CSS'],
    category: 'Development',
    liveLink: 'https://redux-tool-kit-l7rk-mu.vercel.app/',
    githubLink: 'https://github.com/Abdullah-Asim-dev/Redux-Tool-Kit.git',
  },
  {
    title: 'Password Generator',
    description:
      'Cryptographic micro-tool utilizing secure random parameters, custom length configurations, and native copy-to-clipboard interactions.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    category: 'Development',
    liveLink: 'https://statuesque-zabaione-a8d6d4.netlify.app/',
    githubLink: 'https://github.com/Abdullah-Asim-dev/Password-Generator.git',
  },
  {
    title: 'Weather Radar Station',
    description:
      'A comprehensive atmospheric observation interface pulling real-time coordinates and parsing meteorological JSON layers.',
    tech: ['React.js', 'JavaScript', 'Weather API'],
    category: 'Development',
    // NOTE: this live link is the same as JWT Authentication. Replace with the real weather app URL.
    liveLink: 'https://jwt-authicatication-xvlc.vercel.app/',
    githubLink: 'https://github.com/Abdullah-Asim-dev/React-Weather-App.git',
  },
    {
    title: 'Nexora AI – Full-StackChatbot Application',
    description:
      'A full-stack AI workspace featuring Gemini-powered chat, JWT authentication, conversation history, and Free & Pro subscription plans.',
    tech: ['Google Gemini AI','TypeScript','REST API','JWT Authentication'],
    category: 'SaaS',
    // NOTE: this live link is the same as JWT Authentication. Replace with the real weather app URL.
    liveLink: 'https://ai-chatbot-application-teal.vercel.app/',
    githubLink: 'https://github.com/Abdullah-Asim-dev/Nexora-AI-Application.git',
  },
  {
    title: 'AI SEO Audit Engine',
    description:
      'An AI-powered SEO audit tool that analyzes websites, identifies optimization opportunities, and helps improve technical SEO and search visibility.',
    tech: ['Next.js','AI Integration','Technical SEO','API Integration','Qwen AI'],
    category: 'Tools',
    // NOTE: this live link is the same as JWT Authentication. Replace with the real weather app URL.
    liveLink: 'https://seo-audit-tool-five-tau.vercel.app/',
    githubLink: 'https://github.com/Abdullah-Asim-dev/AI-SEO-Audit-.git',
  },

  
];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<Tab>('All');

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(
      (p) => p.category.toLowerCase() === activeTab.toLowerCase()
    );
  }, [activeTab]);

  const openLink = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <MotionConfig reducedMotion="user">
    <section
      id="work"
      className="relative mx-auto block w-full max-w-7xl px-4 py-20 md:px-8"
    >
      {/* 1. HEADER */}
      <div className="relative z-20 mb-10 flex w-full flex-col items-center text-center">
        <h2 className="select-none bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
          Projects
        </h2>
        <p className="mt-3 max-w-md text-sm text-[#9A9AB5]">
          Apps, tools and SaaS builds I have shipped. Pick a category to filter.
        </p>
        <div className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[0_0_14px_rgba(139,92,246,0.7)]" />
      </div>

      {/* 2. FILTER TABS */}
      <div
        role="tablist"
        aria-label="Filter projects"
        className="relative z-20 mb-14 flex flex-wrap items-center justify-center gap-2"
      >
        {TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-xl border px-5 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                active
                  ? 'border-transparent text-white'
                  : 'border-[#8B5CF6]/20 bg-[#14142A]/60 text-[#9A9AB5] hover:border-[#8B5CF6]/60 hover:text-[#F1F1F8]'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="activeTabPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-0 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D4AE0] shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* 3. GRID */}
      <motion.div
        layout
        className="relative z-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              role="link"
              tabIndex={0}
              aria-label={`Open ${project.title} live demo`}
              onClick={() => openLink(project.liveLink)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') openLink(project.liveLink);
              }}
              className="group relative flex min-h-[340px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-[#8B5CF6]/25 bg-[#14142A] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#22D3EE]/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.18),0_18px_40px_rgba(139,92,246,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            >
              {/* Ambient glow + top accent line */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 via-transparent to-[#22D3EE]/0 transition-all duration-500 group-hover:from-[#8B5CF6]/10 group-hover:to-[#22D3EE]/5" />
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent transition-all duration-500 group-hover:via-[#22D3EE]/70" />

              <div className="relative">
                {/* Category */}
                <span className="mb-4 inline-block rounded-md border border-[#8B5CF6]/30 bg-[#8B5CF6]/15 px-2.5 py-1 text-xs font-semibold text-[#C4B5FD]">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-[#F1F1F8] transition-colors duration-200 group-hover:text-[#22D3EE]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-[#9A9AB5] transition-colors group-hover:text-[#C9C9DD]">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-[#9A9AB5] transition-all group-hover:border-[#22D3EE]/20 group-hover:bg-[#22D3EE]/10 group-hover:text-[#F1F1F8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer actions */}
              <div className="relative mt-auto flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLink(project.liveLink);
                  }}
                  className="rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 px-4 py-2 text-xs font-bold text-[#C4B5FD] transition-all duration-300 hover:bg-[#8B5CF6] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                >
                  Live demo
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLink(project.githubLink);
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#9A9AB5] transition-all duration-300 hover:border-[#22D3EE]/40 hover:bg-white/10 hover:text-[#22D3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                >
                  GitHub code
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
    </MotionConfig>
  );
}