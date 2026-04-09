import {
  AudioBuffer,
  AudioBufferSourceNode,
  AudioContext,
} from 'react-native-audio-api';

const audioContext = new AudioContext();
const audioBufferCache = new Map<string, AudioBuffer>();

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

export const playSampleFromUri = async (sampleUri: string) => {
  await ensureRunningContext();

  const audioBuffer = await getAudioBuffer(sampleUri);
  const sourceNode: AudioBufferSourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(audioContext.destination);
  sourceNode.start();
};
