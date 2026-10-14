'use client';

import { FaWhatsapp } from 'react-icons/fa6';

const WHATSAPP_NUMBER = '923716386114'; // country code + number, no + or spaces
const MESSAGE = 'Hi Abdullah, I saw your portfolio and would like to talk.';

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="group fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_28px_rgba(37,211,102,0.5)] transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:animate-none"
      />
      <FaWhatsapp size={28} className="relative" />
    </a>
  );
}