'use client';

import type { ReactNode } from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Bot,
  PhoneCall,
  Layers,
  Gamepad2,
  Server,
  Wrench,
  BrainCircuit,
  Palette,
  ArrowUpRight,
} from 'lucide-react';

/* =========================================================
   CONTENT: edit everything here
   Theme: bg #0B0B14 | surface #14142A | violet #8B5CF6 | cyan #22D3EE
========================================================= */

const SERVICES: {
  title: string;
  description: string;
  tags: string[];
  icon: ReactNode;
}[] = [
  {
    title: 'Website Development',
    description:
      'Fast, responsive websites for businesses and brands, built to load quickly and rank well.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    icon: <Globe size={22} />,
  },
  {
    title: 'App Development',
    description:
      'Mobile and web apps with clean interfaces and a solid backend behind them.',
    tags: ['React Native', 'Node.js', 'Firebase'],
    icon: <Smartphone size={22} />,
  },
  {
    title: 'Chatbot Development',
    description:
      'Chatbots that answer customers, capture leads and hand over to your team when needed.',
    tags: ['OpenAI', 'WhatsApp', 'Website chat'],
    icon: <Bot size={22} />,
  },
  {
    title: 'AI Voice and Call Agents',
    description:
      'Voice agents that answer calls, book appointments and follow up with customers around the clock.',
    tags: ['Voice AI', 'Speech to text', 'Phone calls'],
    icon: <PhoneCall size={22} />,
  },
  {
    title: 'SaaS Development',
    description:
      'Complete SaaS products with login, subscriptions, dashboards and an admin panel.',
    tags: ['Next.js', 'Auth', 'Payments'],
    icon: <Layers size={22} />,
  },
  {
    title: 'Game Development',
    description:
      'Playable games for web and mobile, from simple casual games to full gameplay systems.',
    tags: ['Unity', 'JavaScript', 'Web games'],
    icon: <Gamepad2 size={22} />,
  },
  {
    title: 'API and Backend Development',
    description:
      'Secure, well documented APIs and databases that your apps and tools can rely on.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    icon: <Server size={22} />,
  },
  {
    title: 'Tools Development',
    description:
      'Custom tools and utilities that solve one problem well and save your team time.',
    tags: ['Dashboards', 'Utilities', 'Browser tools'],
    icon: <Wrench size={22} />,
  },
  {
    title: 'AI Agents',
    description:
      'Agents that plan, use your tools and complete multi-step work without manual input.',
    tags: ['LLMs', 'n8n', 'Automation'],
    icon: <BrainCircuit size={22} />,
  },
  {
    title: 'Web Design',
    description:
      'Modern, conversion-focused interface design, delivered as a clean layout ready to build.',
    tags: ['UI design', 'Brand colors', 'Responsive'],
    icon: <Palette size={22} />,
  },
];

/* =========================================================
   MOTION: one reveal when the grid scrolls into view
========================================================= */

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================================================
   SERVICES
========================================================= */

export default function ServicesSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative mx-auto block w-full max-w-7xl px-4 py-20 md:px-8 lg:pl-28 lg:pr-10"
      >
        {/* Header */}
        <div className="mb-14 flex w-full flex-col items-center text-center">
          <h2 className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text pb-1 text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            Services
          </h2>
          <p className="mt-3 max-w-md text-sm text-[#9A9AB5]">
            Everything I can build for your business, from a website to an AI
            agent.
          </p>
          <div className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[0_0_14px_rgba(139,92,246,0.7)]" />
        </div>

        {/* Cards */}
        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6"
        >
          {SERVICES.map((service, index) => (
            <motion.li
              key={service.title}
              variants={card}
              className={index === SERVICES.length - 1 ? 'lg:col-start-2' : ''}
            >
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#8B5CF6]/25 bg-[#14142A] p-4 transition-all duration-300 hover:-translate-y-2 sm:p-5 hover:border-[#22D3EE]/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.18),0_18px_40px_rgba(139,92,246,0.15)]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 via-transparent to-[#22D3EE]/0 transition-all duration-500 group-hover:from-[#8B5CF6]/10 group-hover:to-[#22D3EE]/5" />
                <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent transition-all duration-500 group-hover:via-[#22D3EE]/70" />

                <div className="relative">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl sm:mb-4 sm:h-11 sm:w-11 border border-[#8B5CF6]/30 bg-[#8B5CF6]/15 text-[#C4B5FD] transition-colors duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-[#8B5CF6] group-hover:to-[#22D3EE] group-hover:text-white">
                    {service.icon}
                  </div>

                  <h3 className="mb-1.5 text-base font-bold leading-snug text-[#F1F1F8] sm:text-lg transition-colors duration-200 group-hover:text-[#22D3EE]">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-[#9A9AB5] transition-colors sm:text-sm group-hover:text-[#C9C9DD]">
                    {service.description}
                  </p>
                </div>

                <div className="relative mt-auto flex flex-col items-start gap-3 border-t border-white/5 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className={`${i > 1 ? 'hidden sm:inline-block' : ''} rounded border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-[#9A9AB5] transition-all sm:text-[11px] group-hover:border-[#22D3EE]/20 group-hover:bg-[#22D3EE]/10 group-hover:text-[#F1F1F8]`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C4B5FD] sm:text-sm transition-colors hover:text-[#22D3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                  >
                    Get a quote
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        {/* Closing call to action */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-[#9A9AB5]">
            Have something that is not on this list? Tell me what you need.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D4AE0] px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
          >
            Start a project
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </MotionConfig>
  );
}