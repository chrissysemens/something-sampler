import { View, Text } from 'react-native';
import { useButtonState } from 'state/useButtonState';
import { useModeState } from 'state/useModeState';
import { useSequencerStore } from 'state/useSequencerState';

const InfoPanel = () => {
  const { pressed, held } = useButtonState();
  const { activeMode, activePad } = useModeState();
  const { pads } = useSequencerStore();

  const padsWithSamples = pads.filter((pad) => Boolean(pad.soundId));

  const getSampleName = (soundId: string | null) => {
    if (!soundId) {
      return 'none';
    }

    const segments = soundId.split('/');
    const lastSegment = segments[segments.length - 1] || soundId;

    return decodeURIComponent(lastSegment);
  };

  return (
    <View>
      <Text>{`HELD: ${held}`}</Text>
      <Text>{`PRESSED: ${pressed}`}</Text>
      <Text>{`ACTIVE MODE: ${activeMode}`}</Text>
      <Text>{`ACTIVE PAD: ${activePad}`}</Text>
      <Text>{`LOADED SAMPLES: ${padsWithSamples.length}`}</Text>
      {padsWithSamples.map((pad) => (
        <Text
          key={pad.id}
        >{`PAD ${pad.id + 1}: ${getSampleName(pad.soundId)}`}</Text>
      ))}
    </View>
  );
};

export { InfoPanel };
