"use client";

// Synthesize premium UI sound effects using Web Audio API (zero file assets required)
export const playUISound = (type: "click" | "success" | "hover" | "flicker") => {
  if (typeof window === "undefined") return;

  // Check if audio is enabled in localStorage
  const soundMuted = localStorage.getItem("ui_sound_muted") === "true";
  if (soundMuted) return;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Resume context if suspended (browser security)
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === "click") {
      // Soft tactile mechanical click
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } 
    else if (type === "success") {
      // High-end dual tone chime
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.08); // G5
      osc2.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.25); // C6

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      gain2.gain.setValueAtTime(0.02, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } 
    else if (type === "hover") {
      // Very short, quiet interface tick
      osc.type = "sine";
      osc.frequency.setValueAtTime(1500, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    }
  } catch (e) {
    console.warn("Web Audio failed to execute:", e);
  }
};
