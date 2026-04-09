import React from 'react';
import { View } from 'react-native';

type LedProps = {
  on?: boolean;
  size?: number;
  colour?: string;
};

const Indicator = ({ on = false, size = 20, colour = '#38BDF8' }: LedProps) => {
  const coreSize = Math.max(2, Math.round(size));
  const variation = React.useMemo(
    () => ({
      glowScale: 0.92 + Math.random() * 0.16,
      outerAlpha: 0.15 + Math.random() * 0.1,
      innerAlpha: 0.26 + Math.random() * 0.1,
      borderAlpha: 0.8 + Math.random() * 0.18,
    }),
    [],
  );

  const glowSize = Math.round(coreSize * 2.2 * variation.glowScale);
  const innerGlowSize = Math.round(coreSize * 1.6 * variation.glowScale);

  return (
    <View
      style={{
        width: glowSize,
        height: glowSize,
        borderRadius: glowSize / 2,
        backgroundColor: on
          ? hexToRgba(colour, variation.outerAlpha)
          : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: innerGlowSize,
          height: innerGlowSize,
          borderRadius: innerGlowSize / 2,
          backgroundColor: on
            ? hexToRgba(colour, variation.innerAlpha)
            : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: coreSize,
            height: coreSize,
            borderRadius: coreSize / 2,
            backgroundColor: on ? colour : '#2a2d31',
            opacity: on ? 1 : 0.22,
            borderWidth: 1,
            borderColor: on
              ? hexToRgba(colour, variation.borderAlpha)
              : '#3a3d42',
            transform: [{ translateY: on ? 0 : 1 }],
            overflow: 'hidden',
          }}
        />
      </View>
    </View>
  );
};

function hexToRgba(hex: string, alpha: number) {
  const cleaned = hex.replace('#', '');

  const fullHex =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned;

  const bigint = parseInt(fullHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export { Indicator };
