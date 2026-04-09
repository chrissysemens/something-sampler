import React from 'react';
import { View, useWindowDimensions } from 'react-native';

import { AppLayout } from '../layout/AppLayout';
import { Screen } from '../layout/Screen';
import { Device } from 'components/device/device';
import { InfoPanel } from 'components/info-panel/InfoPanel';

export default function HomeRoute() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const isCompact = height < 760;
  const shouldScroll = isLandscape || isCompact;

  return (
    <AppLayout safe padded>
      <Screen
        scroll={shouldScroll}
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <Device />
        <InfoPanel />
      </Screen>
    </AppLayout>
  );
}
