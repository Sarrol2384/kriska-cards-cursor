"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const THEME_SRC = "/audio/eyethu-theme.mp3";
const VOLUME = 0.5;

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(THEME_SRC);
    audio.loop = true;
    audio.volume = VOLUME;
    audio.preload = "metadata";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [playing]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Turn off theme music" : "Play theme music"}
      aria-pressed={playing}
      title={playing ? "Music on" : "Music off"}
      className="fixed bottom-4 left-4 z-50 flex size-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-primary shadow-md transition-colors hover:border-primary hover:bg-[#f0f7ff]"
    >
      {playing ? (
        <Volume2 className="size-5" />
      ) : (
        <VolumeX className="size-5 opacity-60" />
      )}
    </button>
  );
}
