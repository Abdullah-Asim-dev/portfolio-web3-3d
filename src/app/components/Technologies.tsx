'use client';

import type { ReactNode } from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { Monitor, Server, BrainCircuit, Workflow, Cloud } from 'lucide-react';

/* =========================================================
   CONTENT: edit everything here
   Add or remove any item in the lists below.
   Theme: bg #0B0B14 | surface #14142A | violet #8B5CF6 | cyan #22D3EE
========================================================= */

const GROUPS: {
  title: string;
  note: string;
  icon: ReactNode;
  items: string[];
}[] = [
  {
    title: 'Frontend',
    note: 'Interfaces people enjoy using',
    icon: <Monitor size={20} />,
    items: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Redux Toolkit',
      'Framer Motion',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Backend and Databases',
    note: 'APIs and data that hold up under load',
    icon: <Server size={20} />,
    items: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'Socket.io',
      'JWT Authentication',
    ],
  },
  {
    title: 'AI and Machine Learning',
    note: 'Models that turn data into decisions',
    icon: <BrainCircuit size={20} />,
    items: [
      'Python',
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Deep Learning',
      'OpenAI API',
    ],
  },
  {
    title: 'Automation',
    note: 'Workflows that remove manual work',
    icon: <Workflow size={20} />,
    items: ['n8n', 'Webhooks', 'API Integrations', 'AI Agents', 'Chatbots'],
  },
  {
    title: 'Cloud and Tools',
    note: 'Shipping and collaboration',
    icon: <Cloud size={20} />,
    items: ['Git', 'GitHub', 'Vercel', 'Netlify', 'VS Code', 'Postman'],
  },
];

/* =========================================================
   MOTION: one reveal when the panel scrolls into view
========================================================= */

const panel: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================================================
   TECHNOLOGIES
========================================================= */

export default function TechnologiesSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative mx-auto block w-full max-w-7xl px-4 py-20 md:px-8 lg:pl-28 lg:pr-10"
      >
        {/* Header */}
        <div className="mb-14 flex w-full flex-col items-center text-center">
          <h2 className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text pb-1 text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            Technologies
          </h2>
          <p className="mt-3 max-w-md text-sm text-[#9A9AB5]">
            The tools I use every day to design, build and ship.
          </p>
          <div className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[0_0_14px_rgba(139,92,246,0.7)]" />
        </div>

        {/* One panel, one row per group */}
        <motion.ul
          variants={panel}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-[#8B5CF6]/25 bg-[#14142A]"
        >
          {GROUPS.map((group) => (
            <motion.li
              key={group.title}
              variants={row}
              className="grid gap-5 p-6 transition-colors duration-300 hover:bg-[#8B5CF6]/[0.04] md:grid-cols-[260px_minmax(0,1fr)] md:gap-8 md:p-8"
            >
              {/* Group name */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/15 text-[#C4B5FD]">
                  {group.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F1F1F8]">
                    {group.title}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#9A9AB5]">
                    {group.note}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <ul className="flex flex-wrap content-start gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5 text-sm font-medium text-[#F1F1F8] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#22D3EE]/60 hover:bg-[#22D3EE]/10 hover:text-[#22D3EE] motion-reduce:transition-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </MotionConfig>
  );
}