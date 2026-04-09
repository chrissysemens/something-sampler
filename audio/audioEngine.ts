import {
  AudioBuffer,
  AudioBufferSourceNode,
  AudioContext,
} from 'react-native-audio-api';

const audioContext = new AudioContext();
const audioBufferCache = new Map<string, AudioBuffer>();

// Master gain node — all sources connect here before destination.
// Kept at 0.7 to leave headroom and prevent clipping when multiple
// samples fire simultaneously. Adjust with setMasterGain() at runtime.
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.7;
masterGain.connect(audioContext.destination);

const getAudioBuffer = async (sampleUri: string) => {
  const cachedBuffer = audioBufferCache.get(sampleUri);

  if (cachedBuffer) {
    return cachedBuffer;
  }

  const decodedBuffer = await audioContext.decodeAudioData(sampleUri);
  audioBufferCache.set(sampleUri, decodedBuffer);

  return decodedBuffer;
};

const ensureRunningContext = async () => {
  if (audioContext.state !== 'running') {
    await audioContext.resume();
  }
};

/**
 * Play a sample immediately (e.g. preview on PLAY+pad).
 */
export const playSampleFromUri = async (sampleUri: string) => {
  await ensureRunningContext();

  const audioBuffer = await getAudioBuffer(sampleUri);
  const sourceNode: AudioBufferSourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(masterGain);
  sourceNode.start();
};

/**
 * Schedule a sample to play at an exact AudioContext clock time.
 * The buffer must already be cached; call preloadSampleUri() before
 * starting the sequencer to avoid async decode during playback.
 */
export const scheduleSampleAtTime = (sampleUri: string, when: number) => {
  const audioBuffer = audioBufferCache.get(sampleUri);

  if (!audioBuffer) {
    return;
  }

  const sourceNode: AudioBufferSourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(masterGain);
  sourceNode.start(when);
};

/**
 * Set master output gain (0–1). Useful for the volume knob.
 * Stays under 1.0 to preserve headroom.
 */
export const setMasterGain = (value: number) => {
  masterGain.gain.value = Math.max(0, Math.min(0.9, value));
};

/**
 * Preload (decode + cache) a sample so scheduleSampleAtTime() can use it
 * synchronously without any async gap.
 */
export const preloadSampleUri = async (sampleUri: string) => {
  await ensureRunningContext();
  await getAudioBuffer(sampleUri);
};

/**
 * Returns the AudioContext's hardware-clocked current time in seconds.
 * Use this as the reference clock for the sequencer lookahead scheduler.
 */
export const getAudioContextCurrentTime = () => audioContext.currentTime;
