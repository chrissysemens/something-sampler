import { Pad } from 'components/device/pad/pad';
import { View } from 'react-native';

const Functions = () => {
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
        active={false}
        label={'PLAY'}
        width={87}
        height={46}
        showIndicator={false}
        indicatorOn={false}
        onPress={() => console.log('PLAY')}
      />
      <Pad
        id={'record'}
        active={false}
        label={'REC'}
        width={87}
        height={46}
        showIndicator={false}
        indicatorOn={false}
        onPress={() => console.log('REC')}
      />
      <Pad
        id={'fx'}
        active={false}
        label={'FX'}
        width={87}
        height={46}
        showIndicator={false}
        indicatorOn={false}
        onPress={() => console.log('Fx')}
      />
      <Pad
        id={'func'}
        active={false}
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
