import { useEffect } from "react";

export function ClickSound() {
  useEffect(() => {
    let context: AudioContext | null = null;

    const play = () => {
      context ??= new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(520, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(760, context.currentTime + 0.045);
      gain.gain.setValueAtTime(0.035, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.06);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.06);
    };

    document.addEventListener("click", play, { passive: true });
    return () => document.removeEventListener("click", play);
  }, []);

  return null;
}
