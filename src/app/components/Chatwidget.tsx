'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

const WHATSAPP = 'https://wa.me/923716386114';
const GREETING =
  "Hi! I'm Abdullah's assistant. Ask me about his services, projects or how to hire him.";
const SUGGESTIONS = [
  'What services do you offer?',
  'Can you build an n8n automation?',
  'How do I hire Abdullah?',
];

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json().catch(() => ({}));
      const reply =
        res.ok && data.reply
          ? data.reply
          : data.error || 'Something went wrong. Please try WhatsApp.';
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'No connection. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat assistant"
          className="flex h-[min(600px,calc(100dvh-7rem))] min-h-[360px] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-[#8B5CF6]/40 bg-[#14142A] shadow-[0_0_40px_rgba(139,92,246,0.3)]"
        >
          <div className="flex items-center justify-between border-b border-[#8B5CF6]/20 bg-gradient-to-r from-[#8B5CF6]/25 to-[#22D3EE]/15 px-4 py-3">
            <div>
              <p className="text-sm font-bold text-[#F1F1F8]">Ask about Abdullah</p>
              <p className="text-xs text-[#9A9AB5]">AI assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-[#C4B5FD] hover:text-[#22D3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm [scrollbar-width:thin] [scrollbar-color:#8B5CF6_transparent]">
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#0B0B14] px-3.5 py-2.5 text-[#C9C9DD]">
              {GREETING}
            </div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-[#8B5CF6]/30 px-3 py-1.5 text-xs text-[#C4B5FD] transition-colors hover:border-[#22D3EE]/60 hover:text-[#22D3EE]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-gradient-to-r from-[#8B5CF6] to-[#6D4AE0] px-3.5 py-2.5 text-white'
                    : 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-[#0B0B14] px-3.5 py-2.5 text-[#C9C9DD]'
                }
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="flex w-fit items-center gap-2 rounded-2xl bg-[#0B0B14] px-3.5 py-2.5 text-[#9A9AB5]">
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-[#8B5CF6]/20 p-3">
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Type your question..."
                aria-label="Your question"
                className="min-w-0 flex-1 rounded-xl border border-[#8B5CF6]/25 bg-[#0B0B14] px-3.5 py-2.5 text-sm text-[#F1F1F8] placeholder:text-[#9A9AB5]/70 focus:border-[#22D3EE]/70 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D4AE0] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[#9A9AB5] hover:text-[#22D3EE]"
            >
              <FaWhatsapp size={14} /> Prefer a human? Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] text-white shadow-[0_0_28px_rgba(139,92,246,0.6)] transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}