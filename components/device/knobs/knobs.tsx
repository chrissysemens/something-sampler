import { View, StyleSheet } from 'react-native';
import { Knob } from './knob';
import { useSequencerStore } from 'state/useSequencerState';

const Knobs = () => {
  const { bpm, setBpm, volume, setVolume } = useSequencerStore();

  return (
    <View style={styles.knobs}>
      <View style={[styles.knob, { paddingBottom: 15 }]}>
        <Knob
          label={'BPM'}
          value={bpm}
          min={20}
          max={300}
          onChange={(value) => {
            setBpm(value);
          }}
        />
      </View>
      <View style={styles.knob}>
        <Knob
          label={'VOL'}
          value={volume}
          min={0}
          max={1}
          onChange={(value) => {
            setVolume(value);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  knobs: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  knob: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Knobs };
