'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Navbar is a normal import: it renders on the server, so it is visible
// immediately instead of popping in after hydration.
import Nav from './Navbar';

// Client-only (three.js / window access)
const BG = dynamic(() => import('./ParticleBackground'), { ssr: false });
const Hero = dynamic(() => import('./Hero'), { ssr: false });
const ChatWidget = dynamic(() => import('./Chatwidget'), { ssr: false });
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), { ssr: false });
const VoiceAgent = dynamic(() => import('./VoiceAgent'), { ssr: false });

// Below-the-fold sections
const Abt = dynamic(() => import('./About'));
const Prj = dynamic(() => import('./Projects'));
const Svc = dynamic(() => import('./Services'));
const Tech = dynamic(() => import('./Technologies'));
const Contact = dynamic(() => import('./Contact'));

/*
  Section ids used by the Navbar (scroll-spy + smooth scroll):
  about · projects · services · techstack · contact
  The ids live ONLY on the wrappers below (not inside the section
  components), so no id is ever repeated on the page.
  Page order below matches the navbar order.
*/
export default function HomeClient() {
  return (
    <main className="relative min-h-screen w-full bg-canvas text-ink">
      {/* Background */}
      <BG />

      {/* Navigation */}
      <Nav />

      <div className="relative z-10 flex w-full flex-col">
        {/* HERO */}
        <div id="home" className="w-full">
          <Hero />
        </div>

        {/* ABOUT */}
        <section id="about" className="w-full">
          <Abt />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="w-full">
          <Prj />
        </section>

        {/* SERVICES */}
        <section id="services" className="w-full">
          <Svc />
        </section>

        {/* TECHNOLOGIES (id stays "techstack" so the Navbar link keeps working) */}
        <section id="techstack" className="w-full">
          <Tech />
        </section>

        {/* VOICE AGENT: centered box right below Tech Stack */}
        <div className="w-full">
          <VoiceAgent />
        </div>

        {/* CONTACT */}
        <section id="contact" className="w-full">
          <Contact />
        </section>
      </div>

      {/* Floating buttons */}
      <WhatsAppButton />
      <ChatWidget />
    </main>
  );
}