import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type KnobProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  size?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  style?: ViewStyle;
};

const KNOB_MIN_ANGLE = 20;
const KNOB_MAX_ANGLE = 340;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

function valueToAngle(value: number, min: number, max: number) {
  const t = (value - min) / (max - min);
  return KNOB_MIN_ANGLE + t * (KNOB_MAX_ANGLE - KNOB_MIN_ANGLE);
}

function angleToValue(angle: number, min: number, max: number) {
  const t = (angle - KNOB_MIN_ANGLE) / (KNOB_MAX_ANGLE - KNOB_MIN_ANGLE);
  return min + t * (max - min);
}

export function Knob({
  label,
  value,
  min,
  max,
  size = 76,
  onChange,
  formatValue,
  style,
}: KnobProps) {
  const knobRef = useRef<View>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const rotation = useSharedValue(valueToAngle(value, min, max));

  useEffect(() => {
    rotation.value = withTiming(valueToAngle(value, min, max), {
      duration: 60,
    });
  }, [value, min, max, rotation]);

  const updateFromTouch = (pageX: number, pageY: number) => {
    const dx = pageX - center.x;
    const dy = pageY - center.y;

    // atan2: 0° points right, so shift by +90° to make top = 0 reference.
    // We keep angles in 0..360 so the sweep can span almost a full turn.
    const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    const shiftedAngle = normalizeAngle(rawAngle + 90);

    const clampedAngle = clamp(shiftedAngle, KNOB_MIN_ANGLE, KNOB_MAX_ANGLE);

    rotation.value = clampedAngle;

    const nextValue = angleToValue(clampedAngle, min, max);
    onChange(nextValue);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          updateFromTouch(evt.nativeEvent.pageX, evt.nativeEvent.pageY);
        },
        onPanResponderMove: (evt) => {
          updateFromTouch(evt.nativeEvent.pageX, evt.nativeEvent.pageY);
        },
      }),
    [center.x, center.y, min, max],
  );

  const measureCenter = () => {
    requestAnimationFrame(() => {
      knobRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setCenter({
          x: pageX + width / 2,
          y: pageY + height / 2,
        });
      });
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>

      <View
        ref={knobRef}
        onLayout={measureCenter}
        style={[
          styles.knobShell,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={[
            styles.knobFace,
            {
              width: size - 8,
              height: size - 8,
              borderRadius: (size - 8) / 2,
            },
            animatedStyle,
          ]}
        >
          <View
            style={[
              styles.indicator,
              {
                top: 8,
                height: size * 0.24,
              },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#8B8E98',
  },
  knobShell: {
    backgroundColor: '#D5D2CB',
    borderWidth: 1,
    borderColor: '#BEB9B0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2D2342',
    shadowOpacity: 0.14,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  knobFace: {
    backgroundColor: '#F4F1EB',
    borderWidth: 1,
    borderColor: '#E4DED4',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  indicator: {
    position: 'absolute',
    width: 4,
    borderRadius: 999,
    backgroundColor: '#5B6170',
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: '#44485A',
  },
});
