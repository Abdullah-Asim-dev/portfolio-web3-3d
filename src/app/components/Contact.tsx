'use client';

import { useState, type ReactNode, type FormEvent } from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Variants,
} from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import {
  Mail,
  Download,
  Send,
  ArrowUpRight,
  ArrowUp,
  Loader2,
  Clock,
} from 'lucide-react';

/* =========================================================
   CONTENT: edit everything here
   Theme: bg #0B0B14 | surface #14142A | violet #8B5CF6 | cyan #22D3EE
========================================================= */

const NAME = 'Abdullah Asim';
const TAGLINE =
  'I build web apps, train ML models and design n8n automation pipelines for clients and teams.';
const EMAIL = 'abdullahasimoffical4737@gmail.com';
const WHATSAPP_NUMBER = '923716386114'; // country code + number, no + or spaces
const RESUME = '/Abdullah_Asim.pdf'; // put your file at public/resume.pdf
const RESPONSE_TIME = 'within 24 hours'; // only promise what you can keep

const CHANNELS: {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
}[] = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, icon: <Mail size={20} /> },
  {
    label: 'WhatsApp',
    value: '+92 371 6386114',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: <FaWhatsapp size={20} />,
  },
  {
    label: 'LinkedIn',
    value: 'abdullah-asim-dev',
    href: 'https://www.linkedin.com/in/abdullah-asim-dev/',
    icon: <FaLinkedinIn size={20} />,
  },
  {
    label: 'GitHub',
    value: 'Abdullah-Asim-dev',
    href: 'https://github.com/Abdullah-Asim-dev',
    icon: <FaGithub size={20} />,
  },
];

const TOPICS = [
  'Website Development',
  'App Development',
  'Chatbot Development',
  'AI Voice and Call Agents',
  'SaaS Development',
  'Game Development',
  'API and Backend Development',
  'Tools Development',
  'AI Agents',
  'Web Design',
  'Job opportunity',
  'Something else',
];

// Budget row is hidden for these topics
const NO_BUDGET_TOPICS = ['Job opportunity', 'Something else'];

const BUDGETS = [
  'Not sure yet',
  'Under $500',
  '$500 to $2,000',
  '$2,000 to $5,000',
  '$5,000+',
];

const STEPS = [
  { title: 'You send the details', text: 'Tell me what you want built and any deadline.' },
  { title: 'I reply with a plan', text: `I answer ${RESPONSE_TIME} with questions or a first plan.` },
  { title: 'We agree and start', text: 'We agree on scope and timeline, then I start building.' },
];

// href must match the ids set in HomeClient.tsx
const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Technologies', href: '#techstack' },
  { label: 'Contact', href: '#contact' },
];

const FOOTER_SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdullah-asim-dev/',
    icon: <FaLinkedinIn size={18} />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Abdullah-Asim-dev',
    icon: <FaGithub size={18} />,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: <FaWhatsapp size={18} />,
  },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: <Mail size={18} /> },
];

/* =========================================================
   MOTION: one reveal when the section scrolls into view
========================================================= */

const wrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const block: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const fieldClass =
  'w-full rounded-xl border border-[#8B5CF6]/25 bg-[#0B0B14] px-4 py-3 text-sm text-[#F1F1F8] placeholder:text-[#9A9AB5]/70 transition-colors duration-200 focus:border-[#22D3EE]/70 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30';

const footerLink =
  'text-sm text-[#9A9AB5] transition-colors duration-200 hover:text-[#22D3EE] focus:outline-none focus-visible:text-[#22D3EE] focus-visible:underline';

type Status = 'idle' | 'sending' | 'success' | 'error';

/* =========================================================
   CHIP (radio button that looks like a pill)
========================================================= */

function Chip({
  name,
  value,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span className="block rounded-full border border-[#8B5CF6]/25 bg-[#0B0B14] px-3.5 py-1.5 text-xs font-medium text-[#9A9AB5] transition-all duration-200 hover:border-[#22D3EE]/50 hover:text-[#F1F1F8] peer-checked:border-transparent peer-checked:bg-gradient-to-r peer-checked:from-[#8B5CF6] peer-checked:to-[#6D4AE0] peer-checked:text-white peer-checked:shadow-[0_0_16px_rgba(139,92,246,0.45)] peer-focus-visible:ring-2 peer-focus-visible:ring-[#22D3EE]">
        {value}
      </span>
    </label>
  );
}

/* =========================================================
   CONTACT + FOOTER
========================================================= */

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot: real people never see it
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const showBudget = !NO_BUDGET_TOPICS.includes(topic);
  const year = new Date().getFullYear();

  const whatsappUrl = () => {
    const text = [
      `Hi Abdullah, I am ${name.trim() || '...'}.`,
      `Topic: ${topic}`,
      showBudget ? `Budget: ${budget}` : '',
      '',
      message.trim(),
    ]
      .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
      .join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          topic,
          budget: showBudget ? budget : '',
          message,
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setError('No connection. Check your internet and try again.');
      setStatus('error');
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setTopic(TOPICS[0]);
    setBudget(BUDGETS[0]);
    setMessage('');
    setStatus('idle');
    setError('');
  };

  return (
    <MotionConfig reducedMotion="user">
      {/* =====================================================
          CONTACT
      ===================================================== */}
      <section className="relative mx-auto block w-full max-w-7xl px-4 py-20 md:px-8 lg:pl-28 lg:pr-10">
        {/* Header */}
        <div className="mb-14 flex w-full flex-col items-center text-center">
          <h2 className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text pb-1 text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            Contact
          </h2>
          <p className="mt-3 max-w-md text-sm text-[#9A9AB5]">
            Have a project in mind or a role to discuss? Send me a message.
          </p>
          <div className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[0_0_14px_rgba(139,92,246,0.7)]" />
        </div>

        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10"
        >
          {/* ---------- Left: info ---------- */}
          <motion.div variants={block} className="flex flex-col gap-5">
            <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#22D3EE]/25 bg-[#22D3EE]/10 px-3.5 py-1.5 text-xs font-semibold text-[#22D3EE]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22D3EE]" />
              </span>
              Open to projects and roles
            </p>

            <p className="text-sm leading-relaxed text-[#C9C9DD]">
              I work with clients and teams on web apps, AI and automation. The
              quickest way to reach me is WhatsApp.
            </p>

            <p className="flex items-center gap-2 text-sm text-[#C4B5FD]">
              <Clock size={16} />I reply {RESPONSE_TIME}.
            </p>

            <ul className="flex flex-col gap-3">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-[#8B5CF6]/25 bg-[#14142A] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#22D3EE]/60 hover:shadow-[0_0_24px_rgba(34,211,238,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/15 text-[#C4B5FD] transition-colors duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-[#8B5CF6] group-hover:to-[#22D3EE] group-hover:text-white">
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-[#F1F1F8]">{c.label}</span>
                      <span className="block truncate text-xs text-[#9A9AB5]">{c.value}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-[#9A9AB5] transition-colors group-hover:text-[#22D3EE]"
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* What happens next */}
            <div className="rounded-2xl border border-[#8B5CF6]/20 bg-[#14142A]/60 p-5">
              <h3 className="mb-4 text-sm font-bold text-[#F1F1F8]">What happens next</h3>
              <ol className="flex flex-col gap-4">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#F1F1F8]">{s.title}</p>
                      <p className="text-xs leading-relaxed text-[#9A9AB5]">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <a
              href={RESUME}
              download
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 px-5 py-3 text-sm font-bold text-[#C4B5FD] transition-all duration-300 hover:bg-[#8B5CF6] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            >
              <Download size={16} />
              Download resume
            </a>
          </motion.div>

          {/* ---------- Right: form or confirmation ---------- */}
          <motion.div variants={block} className="self-start">
            <div className="rounded-3xl bg-gradient-to-br from-[#8B5CF6]/60 via-[#8B5CF6]/10 to-[#22D3EE]/60 p-px shadow-[0_0_60px_rgba(139,92,246,0.18)]">
              <div className="rounded-[23px] bg-[#14142A] p-6 md:p-8">
                {status === 'success' ? (
                  <div
                    role="status"
                    className="flex min-h-[480px] flex-col items-center justify-center gap-4 text-center"
                  >
                    <motion.svg
                      viewBox="0 0 52 52"
                      fill="none"
                      className="h-20 w-20"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="okg" x1="0" y1="0" x2="1" y2="1">
                          <stop stopColor="#8B5CF6" />
                          <stop offset="1" stopColor="#22D3EE" />
                        </linearGradient>
                      </defs>
                      <circle cx="26" cy="26" r="24" stroke="url(#okg)" strokeWidth="2" />
                      <motion.path
                        d="M15 27l8 8 14-16"
                        stroke="#22D3EE"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                      />
                    </motion.svg>
                    <h3 className="text-2xl font-bold text-[#F1F1F8]">Message sent</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-[#9A9AB5]">
                      Thanks {name.trim().split(' ')[0]}. I will reply {RESPONSE_TIME}.
                      {email ? ' Check your inbox for my answer.' : ''}
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-2 rounded-xl border border-[#8B5CF6]/40 px-5 py-2.5 text-sm font-semibold text-[#C4B5FD] transition-colors hover:border-[#22D3EE]/60 hover:text-[#22D3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="mb-2 block text-sm font-semibold text-[#F1F1F8]">
                          Your name
                        </label>
                        <input
                          id="c-name"
                          type="text"
                          required
                          minLength={2}
                          maxLength={80}
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="c-email" className="mb-2 block text-sm font-semibold text-[#F1F1F8]">
                          Email (so I can reply)
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          maxLength={120}
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    {/* Topic chips */}
                    <fieldset>
                      <legend className="mb-3 text-sm font-semibold text-[#F1F1F8]">
                        What do you need?
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS.map((t) => (
                          <Chip key={t} name="topic" value={t} checked={topic === t} onChange={setTopic} />
                        ))}
                      </div>
                    </fieldset>

                    {/* Budget chips: only for project topics */}
                    <AnimatePresence initial={false}>
                      {showBudget && (
                        <motion.fieldset
                          key="budget"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="-m-1 overflow-hidden p-1"
                        >
                          <legend className="mb-3 text-sm font-semibold text-[#F1F1F8]">
                            Budget (optional)
                          </legend>
                          <div className="flex flex-wrap gap-2">
                            {BUDGETS.map((b) => (
                              <Chip key={b} name="budget" value={b} checked={budget === b} onChange={setBudget} />
                            ))}
                          </div>
                        </motion.fieldset>
                      )}
                    </AnimatePresence>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="c-message" className="text-sm font-semibold text-[#F1F1F8]">
                          Message
                        </label>
                        <span className="text-xs text-[#9A9AB5]">{message.length}/3000</span>
                      </div>
                      <textarea
                        id="c-message"
                        required
                        minLength={10}
                        maxLength={3000}
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your project, goals and timeline."
                        className={`${fieldClass} resize-y`}
                      />
                    </div>

                    {/* Honeypot: hidden from people, bots fill it in */}
                    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                      <label htmlFor="c-website">Website</label>
                      <input
                        id="c-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    {status === 'error' && (
                      <p
                        role="alert"
                        className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                      >
                        {error}
                      </p>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D4AE0] px-5 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send message
                          </>
                        )}
                      </button>
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#8B5CF6]/40 bg-[#14142A] px-5 py-3.5 text-sm font-bold text-[#F1F1F8] transition-colors duration-300 hover:border-[#22D3EE]/60 hover:text-[#22D3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                      >
                        <FaWhatsapp size={18} />
                        Use WhatsApp instead
                      </a>
                    </div>
                  </form>
                )}

                {/* Copyright: inside the contact box, bottom center */}
                <div className="mt-8 flex flex-col items-center gap-1 border-t border-[#8B5CF6]/25 pt-6 text-center text-xs font-medium text-[#C9C9DD]">
                  <p>
                    © {year} {NAME}. All rights reserved.
                  </p>
                  <p className="text-[#9A9AB5]">Built with Next.js, React and Tailwind CSS.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="relative overflow-hidden border-t border-[#8B5CF6]/20 bg-[#0B0B14]/80 backdrop-blur-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent"
        />

        <div className="mx-auto w-full max-w-7xl px-4 pt-14 md:px-8 lg:pl-28 lg:pr-10">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {/* Brand */}
            <div>
              <a
                href="#home"
                className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-xl font-extrabold tracking-tight text-transparent focus:outline-none focus-visible:underline"
              >
                {NAME}
              </a>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#9A9AB5]">{TAGLINE}</p>
            </div>

            {/* Navigation */}
            <nav aria-label="Footer">
              <h2 className="mb-4 text-sm font-bold text-[#F1F1F8]">Explore</h2>
              <ul className="flex flex-col gap-2.5">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={footerLink}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Get in touch */}
            <div>
              <h2 className="mb-4 text-sm font-bold text-[#F1F1F8]">Get in touch</h2>
              <a href={`mailto:${EMAIL}`} className={`${footerLink} break-all`}>
                {EMAIL}
              </a>
              <ul className="mt-5 flex items-center gap-2">
                {FOOTER_SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={s.label}
                      title={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8B5CF6]/25 bg-[#14142A] text-[#C4B5FD] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22D3EE]/60 hover:text-[#22D3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] motion-reduce:transition-none"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex justify-center border-t border-white/5 pt-6 text-xs text-[#9A9AB5]">
            <a
              href="#home"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#8B5CF6]/25 bg-[#14142A] px-4 py-2 font-semibold text-[#C4B5FD] transition-colors duration-300 hover:border-[#22D3EE]/60 hover:text-[#22D3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            >
              Back to top
              <ArrowUp size={14} />
            </a>
          </div>
        </div>

        {/* Large faded wordmark */}
        <div
          aria-hidden
          className="pointer-events-none mt-6 select-none overflow-hidden whitespace-nowrap bg-gradient-to-b from-[#8B5CF6]/30 to-transparent bg-clip-text text-center font-extrabold leading-[0.9] tracking-tighter text-transparent"
          style={{ fontSize: 'clamp(3rem, 11vw, 10rem)' }}
        >
          {NAME}
        </div>
      </footer>
    </MotionConfig>
  );
}