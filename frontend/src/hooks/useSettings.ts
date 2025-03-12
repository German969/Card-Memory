import React, {useEffect, useRef, useState} from "react";
import backgroundMusic from "../assets/audio/background-music.mp3";
import buttonHoverSound from "../assets/audio/button-hover.mp3";
import buttonClickSound from "../assets/audio/button-click.mp3";

interface HoverAudioRef {
  currentTime: number;
  volume: number;
  play: Function;
}

interface BgAudioRef {
  loop: boolean;
  volume: number;
  play: Function;
  pause: Function;
  currentTime: number;
}

interface ClickAudioRef {
  volume: number;
  currentTime: number;
  play: Function;
}

export default function useSettings() {
  const [bgVolume, setBgVolume] = useState(
    localStorage.getItem("bgVolume") !== null ? parseInt(localStorage.getItem("bgVolume") as string, 10) : 50
  );
  const [sfxVolume, setSfxVolume] = useState(
    localStorage.getItem("sfxVolume") !== null ? parseInt(localStorage.getItem("sfxVolume") as string, 10) : 50
  );

  const [mutedBg, setMutedBg] = useState(false);
  const [mutedSfx, setMutedSfx] = useState(false);

  const [isCalmMode, setIsCalmMode] = useState(false);

  const bgAudioRef = useRef<BgAudioRef | null>(null);
  const hoverAudioRef = useRef<HoverAudioRef | null>(null);
  const clickAudioRef = useRef<ClickAudioRef | null>(null);

  useEffect(() => {
    bgAudioRef.current = new Audio(backgroundMusic);
    hoverAudioRef.current = new Audio(buttonHoverSound);
    clickAudioRef.current = new Audio(buttonClickSound);

    const bgAudio = bgAudioRef.current;
    bgAudio.loop = true;
    bgAudio.volume = bgVolume / 100;

    const startMusic = () => {
      bgAudio.play().catch((error: Error) => console.error("Autoplay failed:", error));
    };

    document.addEventListener("click", startMusic, { once: true });

    return () => {
      document.removeEventListener("click", startMusic);
      bgAudio.pause();
      bgAudio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = bgVolume / 100;
    }
    localStorage.setItem("bgVolume", bgVolume.toString());
  }, [bgVolume]);

  useEffect(() => {
    hoverAudioRef.current!.volume = sfxVolume / 100;
    clickAudioRef.current!.volume = sfxVolume / 100;
    localStorage.setItem("sfxVolume", sfxVolume.toString());
  }, [sfxVolume]);

  const handleBgVolumeChange = (event: React.ChangeEvent) => {
    const newVolume = parseInt((event.target as HTMLInputElement).value, 10);
    setBgVolume(newVolume);
    setMutedBg(newVolume === 0);
  };

  const handleSfxVolumeChange = (event: React.ChangeEvent) => {
    const newVolume = parseInt((event.target as HTMLInputElement).value, 10);
    setSfxVolume(newVolume);
    setMutedSfx(newVolume === 0);
  };

  const playClickSound = () => {
    clickAudioRef.current!.currentTime = 0;
    clickAudioRef.current!.play().catch((error: Error) =>
      console.error("Click sound playback failed:", error)
    );
  };

  const toggleCalmMode = () => {
    setIsCalmMode((prev) => !prev);
    playClickSound();
  };

  const playHoverSound = () => {
    hoverAudioRef.current!.currentTime = 0;
    hoverAudioRef.current!.play().catch((error: Error) =>
      console.error("Hover sound playback failed:", error)
    );
  };

  return {
    isCalmMode,
    mutedBg,
    mutedSfx,
    bgVolume,
    sfxVolume,
    playClickSound,
    playHoverSound,
    handleBgVolumeChange,
    handleSfxVolumeChange,
    toggleCalmMode,
  }
}
