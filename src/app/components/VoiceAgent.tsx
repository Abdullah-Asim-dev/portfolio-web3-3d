'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Square, AudioLines, Loader2 } from 'lucide-react';

type Status = 'idle' | 'listening' | 'thinking' | 'speaking';
type Msg = { role: 'user' | 'assistant'; content: string };

const LANG = 'en-US';
const MAX_SILENCE = 3; // stop after this many empty turns in a row
const SILENCE_MS = 1800; // wait this long after you stop talking before sending

// Remove emojis, markdown and links so the voice reads clean text
const cleanForSpeech = (t: string) =>
  t
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/[*_`#>]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

// Pick the best installed English voice (prefers natural/online voices)
const pickVoice = (voices: SpeechSynthesisVoice[]) => {
  const en = voices.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith('en'));
  return en.find((v) => /natural|online/i.test(v.name)) || en[0];
};

export default function VoiceAgent() {
  const [status, setStatus] = useState<Status>('idle');
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');
  const [supported, setSupported] = useState(true);

  const recRef = useRef<any>(null);
  const activeRef = useRef(false);
  const historyRef = useRef<Msg[]>([]);
  const silenceRef = useRef(0);
  const listenRef = useRef<() => void>(() => {});

  useEffect(() => {
    const w = window as any;
    setSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => {
      activeRef.current = false;
      recRef.current?.abort?.();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stopAll = useCallback((message = '') => {
    activeRef.current = false;
    setActive(false);
    recRef.current?.abort?.();
    window.speechSynthesis?.cancel();
    setStatus('idle');
    if (message) setError(message);
  }, []);

  const speak = useCallback((text: string) => {
    const synth = window.speechSynthesis;
    const resume = () => {
      setStatus('idle');
      if (activeRef.current) listenRef.current();
    };
    if (!synth) {
      resume();
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(cleanForSpeech(text));
    u.lang = LANG;
    const voice = pickVoice(synth.getVoices());
    if (voice) u.voice = voice;
    u.onend = resume;
    u.onerror = resume;
    setStatus('speaking');
    synth.speak(u);
  }, []);

  const ask = useCallback(
    async (text: string) => {
      setStatus('thinking');
      const next: Msg[] = [...historyRef.current, { role: 'user', content: text }];
      historyRef.current = next;
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: next, lang: LANG }),
        });
        const data = await res.json().catch(() => ({}));
        if (!activeRef.current) return; // user pressed stop while waiting
        const ok = res.ok && data.reply;
        const answer: string = ok
          ? data.reply
          : data.error || 'Something went wrong. Please try WhatsApp.';
        const updated: Msg[] = [...next, { role: 'assistant', content: answer }];
        historyRef.current = updated.slice(-10);
        if (ok) speak(answer);
        else stopAll(answer);
      } catch {
        stopAll('No connection. Please try again.');
      }
    },
    [speak, stopAll]
  );

  const listen = useCallback(() => {
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR || !activeRef.current) return;

    window.speechSynthesis?.cancel();
    setError('');

    const rec = new SR();
    rec.lang = LANG;
    rec.interimResults = true;
    rec.continuous = true; // keep listening through short pauses
    rec.maxAlternatives = 1;
    recRef.current = rec;

    let heardText = '';
    let fatal = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    rec.onstart = () => setStatus('listening');
    rec.onresult = (e: any) => {
      let t = '';
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      heardText = t;
      // restart the silence timer on every new word
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          rec.stop();
        } catch {}
      }, SILENCE_MS);
    };
    rec.onerror = (e: any) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        fatal = true;
        stopAll('Microphone is blocked. Allow mic access in the browser address bar.');
      } else if (e.error === 'network') {
        fatal = true;
        stopAll('Voice service is not reachable. Check your internet.');
      }
      // 'no-speech' and 'aborted' are handled in onend
    };
    rec.onend = () => {
      clearTimeout(timer);
      if (fatal || !activeRef.current) return;
      const finalText = heardText.trim();
      if (finalText) {
        silenceRef.current = 0;
        ask(finalText);
        return;
      }
      silenceRef.current += 1;
      if (silenceRef.current >= MAX_SILENCE) {
        stopAll('Conversation ended because I did not hear anything. Tap the mic to start again.');
      } else {
        listenRef.current();
      }
    };

    try {
      rec.start();
    } catch {
      stopAll('Could not start the microphone. Please try again.');
    }
  }, [ask, stopAll]);

  useEffect(() => {
    listenRef.current = listen;
  }, [listen]);

  const onOrb = () => {
    if (active) {
      stopAll();
      return;
    }
    activeRef.current = true;
    silenceRef.current = 0;
    historyRef.current = [];
    setActive(true);
    setError('');
    listen();
  };

  const statusText: Record<Status, string> = {
    idle: active ? 'Getting ready...' : 'Tap the mic to start talking',
    listening: 'Listening... speak now',
    thinking: 'Thinking...',
    speaking: 'Speaking... tap to stop',
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8 lg:pl-28 lg:pr-10">
      <div className="mx-auto w-full max-w-4xl rounded-3xl bg-gradient-to-br from-[#8B5CF6]/60 via-[#8B5CF6]/10 to-[#22D3EE]/60 p-px shadow-[0_0_60px_rgba(139,92,246,0.18)]">
        <div className="rounded-[23px] bg-[#14142A] px-6 py-5 md:px-10 md:py-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <h2 className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text pb-1 text-2xl font-extrabold tracking-tight text-transparent md:text-3xl">
              Talk to my AI
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#9A9AB5]">
              Ask about my skills, services and how to hire me. Just speak, tap stop to end.
            </p>
          </div>

          {/* Orb */}
          <div className="mt-5 flex flex-col items-center gap-2">
            {supported ? (
              <button
                onClick={onOrb}
                aria-label={active ? 'Stop conversation' : 'Start talking'}
                className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] text-white shadow-[0_0_36px_rgba(139,92,246,0.6)] transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
              >
                {status === 'listening' && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-ping rounded-full bg-[#22D3EE] opacity-40 motion-reduce:animate-none"
                  />
                )}
                {status === 'speaking' && (
                  <span
                    aria-hidden="true"
                    className="absolute -inset-2 animate-pulse rounded-full border-2 border-[#22D3EE]/60 motion-reduce:animate-none"
                  />
                )}
                <span className="relative">
                  {!active && <Mic size={32} />}
                  {active && status === 'listening' && <AudioLines size={32} />}
                  {active && status === 'thinking' && (
                    <Loader2 size={32} className="animate-spin" />
                  )}
                  {active && (status === 'speaking' || status === 'idle') && (
                    <Square size={26} fill="currentColor" />
                  )}
                </span>
              </button>
            ) : (
              <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
                Voice is not supported in this browser. Please use Chrome or Edge.
              </p>
            )}

            <p aria-live="polite" className="text-sm font-medium text-[#C4B5FD]">
              {statusText[status]}
            </p>

            {error && (
              <p role="alert" className="max-w-md text-center text-xs text-red-300">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}