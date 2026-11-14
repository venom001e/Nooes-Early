export interface SpriteAudioOptions {
  soundUrl?: string;
  configUrl?: string;
  simpleMode?: boolean;
}

export interface SpriteSfxInstance {
  setMuted: (muted: boolean) => void;
  resume: () => Promise<void>;
  ensureLoaded: () => Promise<void>;
  tick: (args: { kind: 'key' | 'enter'; ch?: string }) => void;
}

export function createTerminalSpriteSfx(options?: SpriteAudioOptions): SpriteSfxInstance {
  let isMuted = false;
  let audioCtx: AudioContext | null = null;
  let audioBuffer: AudioBuffer | null = null;
  let isLoading = false;

  const initAudio = () => {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    return audioCtx;
  };

  const playSynthesizedClick = (frequency = 800, duration = 0.015) => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx || ctx.state !== 'running') return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // safe fallback
    }
  };

  return {
    setMuted: (muted: boolean) => {
      isMuted = muted;
    },
    resume: async () => {
      const ctx = initAudio();
      if (ctx && ctx.state === 'suspended') {
        await ctx.resume();
      }
    },
    ensureLoaded: async () => {
      if (!options?.soundUrl || audioBuffer || isLoading) return;
      isLoading = true;
      try {
        const res = await fetch(options.soundUrl);
        const arrayBuf = await res.arrayBuffer();
        const ctx = initAudio();
        if (ctx) {
          audioBuffer = await ctx.decodeAudioData(arrayBuf);
        }
      } catch {
        // Fallback to synthesized audio if audio file is not found
      } finally {
        isLoading = false;
      }
    },
    tick: ({ kind }) => {
      if (isMuted) return;
      if (audioBuffer && audioCtx) {
        try {
          const source = audioCtx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioCtx.destination);
          source.start();
          return;
        } catch {
          // ignore
        }
      }
      // Play a subtle mechanical key click or enter thump
      if (kind === 'enter') {
        playSynthesizedClick(450, 0.03);
      } else {
        const jitter = (Math.random() - 0.5) * 80;
        playSynthesizedClick(750 + jitter, 0.012);
      }
    },
  };
}

