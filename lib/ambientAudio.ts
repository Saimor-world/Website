import type { AmbientScene } from './ambientScene';

/** Original sound generated locally. AudioParam automation runs on the audio
 * thread; no audio downloads, timers for notes, or rendering-frame work. */
export function createAmbientAudio(context: AudioContext) {
  const master = context.createGain(); master.gain.value = 0;
  master.connect(context.destination);
  const pad = context.createGain(); pad.gain.value = .018;
  const tone = context.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 720; tone.Q.value = .35;
  pad.connect(tone); tone.connect(master);
  const sources: (OscillatorNode | AudioBufferSourceNode)[] = [];
  const voices = [130.81, 196, 246.94, 293.66].map((frequency, i) => {
    const voice = context.createOscillator(); voice.type = 'sine';
    voice.frequency.value = frequency; voice.detune.value = [-4, 3, -2, 4][i];
    voice.connect(pad); voice.start(); sources.push(voice); return voice;
  });
  const drift = context.createOscillator(); drift.frequency.value = .045;
  const detune = context.createGain(); detune.gain.value = 3;
  drift.connect(detune); voices.forEach(voice => detune.connect(voice.detune)); drift.start(); sources.push(drift);

  // A reusable coloured-noise bed, rather than a short audible sample loop.
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * 8), context.sampleRate);
  const samples = buffer.getChannelData(0);
  let brown = 0, pink = 0;
  for (let i = 0; i < samples.length; i++) {
    const white = Math.random() * 2 - 1;
    brown = (brown + white * .025) / 1.025;
    pink = pink * .97 + white * .03;
    samples[i] = brown * 2 + pink * .8;
  }
  // Close both value and slope at the join, without scheduling JS callbacks.
  const seam = Math.min(4096, Math.floor(samples.length / 8));
  for (let i = 0; i < seam; i++) {
    const t = i / (seam - 1), blend = .5 - Math.cos(t * Math.PI) * .5;
    samples[samples.length - seam + i] = samples[samples.length - seam + i] * (1 - blend) + samples[i] * blend;
  }
  const noise = context.createBufferSource(); noise.buffer = buffer; noise.loop = true; noise.loopStart = seam / context.sampleRate;
  const windFilter = context.createBiquadFilter(); windFilter.type = 'lowpass'; windFilter.frequency.value = 420;
  const waterFilter = context.createBiquadFilter(); waterFilter.type = 'bandpass'; waterFilter.frequency.value = 1550; waterFilter.Q.value = .45;
  const wind = context.createGain(); wind.gain.value = .026;
  const water = context.createGain(); water.gain.value = 0;
  noise.connect(windFilter); windFilter.connect(wind); wind.connect(master);
  noise.connect(waterFilter); waterFilter.connect(water); water.connect(master);
  noise.start(); sources.push(noise);
  const tide = context.createOscillator(); tide.frequency.value = .11;
  const ripple = context.createGain(); ripple.gain.value = 230;
  tide.connect(ripple); ripple.connect(waterFilter.frequency); tide.start(); sources.push(tide);

  let volume = .35, disposed = false, suspendTimer: ReturnType<typeof setTimeout> | undefined;
  const target = (parameter: AudioParam, value: number, seconds = 1.8) => {
    parameter.cancelScheduledValues(context.currentTime);
    parameter.setTargetAtTime(value, context.currentTime, seconds);
  };
  const setVolume = (value: number) => {
    volume = Math.max(0, Math.min(1, value));
    if (!disposed && context.state === 'running') target(master.gain, volume * 1.6, .18);
  };
  return {
    context,
    setVolume,
    setScene(scene: AmbientScene) {
      const nature = scene === 'forest' || scene === 'clearing';
      target(water.gain, scene === 'clearing' ? .16 : scene === 'forest' ? .055 : 0, 2.2);
      target(wind.gain, nature ? .065 : .026, 2.2);
      target(pad.gain, scene === 'encounter' ? .023 : nature ? .009 : .018, 2.2);
      target(tone.frequency, scene === 'studio' ? 1100 : nature ? 520 : 720, 2.2);
      const chord = scene === 'studio' ? [130.81, 164.81, 196, 261.63] : nature ? [146.83, 196, 220, 293.66] : [130.81, 196, 246.94, 293.66];
      voices.forEach((voice, i) => target(voice.frequency, chord[i], 2.2));
    },
    async resume() {
      if (disposed) return;
      clearTimeout(suspendTimer);
      await context.resume();
      if (!disposed) target(master.gain, volume * 1.6, .4);
    },
    suspend() {
      if (disposed) return;
      target(master.gain, 0, .045);
      clearTimeout(suspendTimer);
      suspendTimer = setTimeout(() => { if (!disposed) void context.suspend().catch(() => {}); }, 240);
    },
    async dispose() {
      if (disposed) return;
      disposed = true; clearTimeout(suspendTimer);
      if (context.state === 'running') {
        target(master.gain, 0, .025);
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      sources.forEach(source => { try { source.stop(); } catch { /* already stopped */ } });
      if (context.state !== 'closed') await context.close();
    },
  };
}

export type AmbientAudio = ReturnType<typeof createAmbientAudio>;
