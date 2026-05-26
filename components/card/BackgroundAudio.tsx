"use client";

import { useCallback, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Soft ambient pad (no external file — works offline and on Vercel). */
function startAmbientPad(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.value = 0.055;
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 800;
  filter.connect(master);

  const oscs: OscillatorNode[] = [];
  const notes = [146.83, 185, 220, 277.18];

  for (const freq of notes) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = 0.2;
    osc.connect(g);
    g.connect(filter);
    osc.start();
    oscs.push(osc);
  }

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.08;
  lfoGain.gain.value = 0.015;
  lfo.connect(lfoGain);
  lfoGain.connect(master.gain);
  lfo.start();

  return () => {
    lfo.stop();
    oscs.forEach((o) => o.stop());
    master.disconnect();
  };
}

export function BackgroundAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(async () => {
    if (playing) {
      stopRef.current?.();
      stopRef.current = null;
      await ctxRef.current?.close();
      ctxRef.current = null;
      setPlaying(false);
      return;
    }

    try {
      const ctx = new AudioContext();
      await ctx.resume();
      ctxRef.current = ctx;
      stopRef.current = startAmbientPad(ctx);
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [playing]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Turn off ambient sound" : "Turn on ambient sound"}
      aria-pressed={playing}
      title={playing ? "Sound on" : "Sound off"}
      className="fixed bottom-4 left-4 z-50 flex size-11 items-center justify-center rounded-full border border-primary/40 bg-[#0c0c0c]/90 text-primary shadow-lg backdrop-blur-sm transition-colors hover:border-primary hover:bg-[#1a1a1a]"
    >
      {playing ? (
        <Volume2 className="size-5" />
      ) : (
        <VolumeX className="size-5 opacity-70" />
      )}
    </button>
  );
}
