import { Pad } from 'components/device/pad/pad';
import { View } from 'react-native';
import { useButtonState } from 'state/useButtonState';
import { useSequencerStore } from 'state/useSequencerState';

const Functions = () => {
  const { isPlaying, setPlaying } = useSequencerStore();
  const { held } = useButtonState();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
      }}
    >
      <Pad
        id={'play'}
        active={isPlaying || held === 'play'}
        label={'PLAY'}
        width={87}
        height={46}
        showIndicator={false}
        indicatorOn={false}
        onPress={() => setPlaying(!isPlaying)}
      />
      <Pad
        id={'record'}
        active={held === 'record'}
        label={'REC'}
        width={87}
        height={46}
        showIndicator={false}
        indicatorOn={false}
        onPress={() => console.log('REC')}
      />
      <Pad
        id={'fx'}
        active={held === 'fx'}
        label={'FX'}
        width={87}
        height={46}
        showIndicator={false}
        indicatorOn={false}
        onPress={() => console.log('Fx')}
      />
      <Pad
        id={'func'}
        active={held === 'func'}
        label={'FUNC'}
        width={87}
        height={46}
        showIndicator={false}
        indicatorOn={false}
        onPress={() => console.log('FUNC')}
      />
    </View>
  );
};

export { Functions };
