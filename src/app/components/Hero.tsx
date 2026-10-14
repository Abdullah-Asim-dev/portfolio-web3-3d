'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { Mail } from 'lucide-react';

/* =========================================================
   CONTENT: edit everything here
========================================================= */

const PROFILE = {
  name: 'Abdullah Asim',
  // file must be: public/profile.webp  (all lowercase, same as here)
  image: '/profile.webp',
  // three words, one per line
  headline: ['Architecting', 'Intelligent', 'Systems'],
  bio: 'I build web applications on scalable cloud architecture, train ML and deep learning models that turn complex data into decisions, and design n8n automation pipelines that remove manual work. Every system I ship is production-ready and built to scale.',
};

const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Abdullah-Asim-dev',
    icon: <FaGithub size={20} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdullah-asim-dev/',
    icon: <FaLinkedinIn size={20} />,
  },
  {
    label: 'Email',
    href: 'mailto:abdullahasimoffical4737@gmail.com',
    icon: <Mail size={20} />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/923716386114',
    icon: <FaWhatsapp size={20} />,
  },
];

/*
  GALLERY
  position = which part of the photo stays visible when it is cropped to a square.
    'object-top'          -> keeps heads (use for people photos)
    'object-center'       -> middle of the photo
    'object-[50%_15%]'    -> fine tune: 15% from the top (0% = top, 100% = bottom)
    'object-[30%_10%]'    -> first number moves left/right, second moves up/down
*/
const GALLERY: { src: string; alt: string; position: string }[] = [
  { src: '/image1.webp', alt: 'Gallery photo 1', position: 'object-top' },
  // face was getting cut here: keep the top of the photo visible
  { src: '/image2.webp', alt: 'Gallery photo 2', position: 'object-top' },
  { src: '/imago1.webp', alt: 'Gallery photo 3', position: 'object-center' },
  { src: '/imago.webp', alt: 'Gallery photo 4', position: 'object-center' },
  { src: '/imago2.webp', alt: 'Gallery photo 5', position: 'object-center' },
  { src: '/imago3.webp', alt: 'Gallery photo 6', position: 'object-center' },
];

/* =========================================================
   MOTION: one entrance sequence on page load, nothing else
========================================================= */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================================================
   SOCIAL LINK
========================================================= */

function SocialLink({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith('http');

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="glass flex h-11 w-11 items-center justify-center rounded-xl text-ink/80 transition-colors duration-200 hover:border-accent/60 hover:text-accent motion-reduce:transition-none"
    >
      {children}
    </a>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Social rail: fixed on the left (desktop only) */}
      <div className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {SOCIALS.map((social) => (
          <SocialLink key={social.label} label={social.label} href={social.href}>
            {social.icon}
          </SocialLink>
        ))}
      </div>

      <section
        aria-label="Introduction"
        className="mx-auto w-full max-w-7xl px-6 pb-24 pt-28 lg:pl-28 lg:pr-10"
      >
        {/* Photo + text */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left (desktop) / bottom (mobile): punchline, name, bio */}
          <motion.div
            variants={container}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            className="order-2 lg:order-1"
          >
            <motion.h1
              variants={item}
              className="text-gradient w-fit pb-[0.12em] text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {PROFILE.headline.map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 font-display text-2xl font-semibold text-ink sm:text-3xl"
            >
              {PROFILE.name}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {PROFILE.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D4AE0] px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] motion-reduce:transition-none"
              >
                View Projects
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[#8B5CF6]/50 bg-transparent px-6 py-3.5 text-sm font-bold text-[#F1F1F8] transition-colors duration-300 hover:border-[#22D3EE]/70 hover:text-[#22D3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] motion-reduce:transition-none"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social row: mobile + tablet (the fixed rail is hidden there) */}
            <motion.div variants={item} className="mt-8 flex gap-3 lg:hidden">
              {SOCIALS.map((social) => (
                <SocialLink
                  key={social.label}
                  label={social.label}
                  href={social.href}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </motion.div>
          </motion.div>

          {/* Right (desktop) / top (mobile): square profile photo */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:order-2 lg:mx-0 lg:max-w-none lg:mt-3"
          >
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#8B5CF6]/40 to-[#22D3EE]/25 opacity-70 blur-3xl"
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#8B5CF6]/30 bg-[#14142A] shadow-[0_0_40px_rgba(139,92,246,0.25)]">
              <Image
                src={PROFILE.image}
                alt={PROFILE.name}
                fill
                priority
                sizes="(min-width: 1280px) 320px, (min-width: 1024px) 300px, (min-width: 640px) 280px, 240px"
                className="object-cover object-[85%_top]"
              />
            </div>
          </motion.div>
        </div>

        {/* Gallery: 2 columns on mobile, 3 on larger screens */}
        <ul className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-28 lg:gap-6">
          {GALLERY.map((photo) => (
            <li
              key={photo.src}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 28vw, (min-width: 640px) 30vw, 45vw"
                className={`object-cover ${photo.position} transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none`}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}