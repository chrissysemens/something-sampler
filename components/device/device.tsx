import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'theme/useTheme';
import { Display } from 'components/device/display/display';
import { Functions } from 'components/device/functions/functions';
import { Sequencer } from 'components/device/sequencer/sequencer';

const Device = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        flexDirection: 'column',
        gap: theme.spacing[4],
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#2D2342',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        margin: 20,
      }}
    >
      <View
        style={{
          backgroundColor: 'rgba(241,235,229,0.3)',
          borderRadius: 15,
          padding: 20,
        }}
      >
        <Display />
        <Sequencer />
        <Functions />
      </View>
    </View>
  );
};

export { Device };
