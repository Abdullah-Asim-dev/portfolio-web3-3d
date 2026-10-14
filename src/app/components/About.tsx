import { Download } from 'lucide-react';

/* =========================================================
   CONTENT: edit everything here
   Items marked TODO are placeholders until you send real details.
========================================================= */

// TODO: put your resume in /public and make sure the name matches
const CV_URL = '/cv.pdf';

const ABOUT = {
  headline: 'I build web products with AI built in.',
  paragraphs: [
    "I'm a full-stack and AI developer based in Lahore. Over the past year I've worked remotely across web development, AI features and data analysis, and I've built more than 10 projects, from full-stack web apps to AI-powered tools and automations.",
    // TODO: replace the second sentence with how you really work
    "I studied Computer Science through Matric and Intermediate (ICS), then trained in NexSkill's Web with AI course. I work in small, clear steps: understand the problem first, ship something working early, and keep clients updated along the way.",
  ],
};

const FACTS: { label: string; value: string }[] = [
  { label: 'Based in', value: 'Lahore, Pakistan' },
  { label: 'Experience', value: '1 year, remote' },
  { label: 'Projects', value: '10+' },
  { label: 'Languages', value: 'English' }, // TODO: add Urdu if you like
  { label: 'Open to', value: 'Remote jobs and freelance projects' },
];

type Job = {
  role: string;
  meta: string;
  summary?: string;
  points?: string[];
};

// Newest first
const EXPERIENCE: Job[] = [
  {
    role: 'Freelance Developer',
    meta: 'Lahore, remote · Present',
    summary:
      'Building web and AI projects for local clients, and growing my Upwork and Fiverr profiles.',
  },
  {
    // TODO: add company name and exact dates, and a number or result per point
    role: 'Full-Stack Developer, AI Developer & Data Analyst',
    meta: 'Remote · 1 year',
    points: [
      'Built and shipped full-stack web applications, from interface to database.',
      'Added AI features and automation workflows to products.',
      'Cleaned and analysed data to support day-to-day decisions.',
    ],
  },
];

type Study = { title: string; detail?: string; year?: string };

// TODO: add years if you want them shown
const EDUCATION: Study[] = [
  { title: 'Web with AI', detail: 'NexSkill' },
  { title: 'Intermediate in Computer Science (ICS)' },
  { title: 'Matric (Computer Science)' },
];

/* =========================================================
   ABOUT
========================================================= */

export default function About() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:pl-28 lg:pr-10">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
        {/* Left: story, facts, actions */}
        <div>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            {ABOUT.headline}
          </h2>

          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {ABOUT.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <dl className="glass mt-10 grid max-w-xl gap-x-8 gap-y-5 rounded-2xl p-6 sm:grid-cols-2">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-1 font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={"Abdullah_Asim.pdf"}
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary to-primary-deep px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-shadow duration-300 hover:shadow-[0_0_34px_rgba(139,92,246,0.7)] motion-reduce:transition-none"
            >
              <Download size={16} strokeWidth={2.5} />
              Download CV
            </a>

            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-accent/60 hover:text-accent motion-reduce:transition-none"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>

        {/* Right: experience timeline + education */}
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">
            Experience
          </h3>

          <ol className="relative mt-8 space-y-10 border-l border-line pl-8">
            {EXPERIENCE.map((job) => (
              <li key={job.role} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-canvas shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                />

                <h4 className="font-display text-lg font-semibold text-ink">
                  {job.role}
                </h4>
                <p className="mt-1 text-sm text-primary-soft">{job.meta}</p>

                {job.summary && (
                  <p className="mt-3 leading-relaxed text-muted">
                    {job.summary}
                  </p>
                )}

                {job.points && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-primary-soft">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          <h3 className="mt-16 font-display text-2xl font-semibold text-ink">
            Education and training
          </h3>

          <ul className="mt-6 divide-y divide-line border-y border-line">
            {EDUCATION.map((study) => (
              <li
                key={study.title}
                className="flex items-baseline justify-between gap-4 py-4"
              >
                <div>
                  <p className="font-medium text-ink">{study.title}</p>
                  {study.detail && (
                    <p className="mt-0.5 text-sm text-muted">{study.detail}</p>
                  )}
                </div>
                {study.year && (
                  <span className="shrink-0 text-sm text-primary-soft">
                    {study.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}