import { View, Text, StyleSheet } from 'react-native';
import { useSequencerStore } from 'state/useSequencerState';

const Display = () => {
  return (
    <View style={styles.display}>
      <VolBpmDisplay />
      <View style={styles.innerShadowTop} pointerEvents="none" />
      <View style={styles.innerShadowLeft} pointerEvents="none" />
    </View>
  );
};

const VolBpmDisplay = () => {
  const { bpm, volume } = useSequencerStore();
  const volumePct = Math.round(volume * 100);

  return (
    <View style={styles.volBpm}>
      <View style={styles.vol}>
        <View style={styles.title}>
          <Text style={styles.titleText}>VOL</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>{volumePct}</Text>
        </View>
      </View>
      <View style={styles.bpm}>
        <View style={styles.title}>
          <Text style={styles.titleText}>BPM</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>{bpm}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    width: 370,
    height: 125,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#ede7df',
    overflow: 'hidden',
    borderTopWidth: 1.5,
    borderLeftWidth: 1.4,
    borderBottomWidth: 1.4,
    borderRightWidth: 1.4,
    borderTopColor: '#a09a96',
    borderLeftColor: '#aba5a1',
    borderBottomColor: '#c8c2bc',
    borderRightColor: '#c2bcb8',
  },
  displayText: {
    fontFamily: 'OrbitronRegular',
    fontSize: 28,
    color: '#3a3530',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  innerShadowTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: 'rgba(80, 60, 40, 0.02)',
  },
  innerShadowLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 7,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    opacity: 0.8,
    backgroundColor: 'rgba(80, 60, 40, 0.02)',
  },
  volBpm: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 2,
    width: 80,
    height: 40,
  },
  vol: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    borderRightColor: 'lightgrey',
    borderRightWidth: 1,
  },
  bpm: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  value: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    fontSize: 8,
    color: 'darkgrey',
    fontFamily: 'OrbitronMedium',
    textAlign: 'center',
  },
  valueText: {
    fontSize: 12,
    color: '#555555',
    fontFamily: 'OrbitronMedium',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export { Display };
