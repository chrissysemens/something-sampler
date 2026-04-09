import { Indicator } from 'components/device/indicator/Indicator';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useButtonState } from 'state/useButtonState';

type PadProps = {
  id: number | string;
  active?: boolean;
  label?: string;
  onPress?: () => void;
  onPressInAction?: () => void;
  enableHold?: boolean;
  width?: number;
  height?: number;
  style?: ViewStyle;
  showIndicator?: boolean;
  indicatorOn?: boolean;
};

const TAP_MAX_DURATION_MS = 100000;

export function Pad({
  id,
  active = false,
  label,
  onPress,
  onPressInAction,
  enableHold = true,
  width = 72,
  height = 72,
  style,
  showIndicator = false,
  indicatorOn = false,
}: PadProps) {
  const { setPressed, setHeld, clearPressed, clearHeld } = useButtonState();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const didLongPress = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 80 });
    translateY.value = withTiming(2, { duration: 80 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 120 });
    translateY.value = withTiming(0, { duration: 120 });
  };

  const onPadPressIn = React.useCallback(() => {
    handlePressIn();
    setPressed(id);
    onPressInAction?.();
  }, [id, onPressInAction, setPressed]);

  const onPadPressOut = React.useCallback(() => {
    handlePressOut();
    clearPressed(id);
  }, [clearPressed, id]);

  const onPadLongPress = React.useCallback(() => {
    setHeld(id);
  }, [id, setHeld]);

  const onPadLongPressFinalize = React.useCallback(() => {
    clearHeld(id);
  }, [clearHeld, id]);

  const tapGesture = React.useMemo(
    () =>
      Gesture.Tap()
        .maxDuration(TAP_MAX_DURATION_MS)
        .onBegin(() => {
          didLongPress.value = false;
          runOnJS(onPadPressIn)();
        })
        .onEnd((_event, success) => {
          if (success && !didLongPress.value && onPress && !onPressInAction) {
            runOnJS(onPress)();
          }
        })
        .onFinalize(() => {
          didLongPress.value = false;
          runOnJS(onPadPressOut)();
        }),
    [didLongPress, onPadPressIn, onPadPressOut, onPress, onPressInAction],
  );

  const longPressGesture = React.useMemo(
    () =>
      Gesture.LongPress()
        .enabled(enableHold)
        .minDuration(150)
        .onStart(() => {
          didLongPress.value = true;
          runOnJS(onPadLongPress)();
        })
        .onFinalize(() => {
          runOnJS(onPadLongPressFinalize)();
        }),
    [didLongPress, enableHold, onPadLongPress, onPadLongPressFinalize],
  );

  const padGesture = React.useMemo(
    () => Gesture.Simultaneous(tapGesture, longPressGesture),
    [tapGesture, longPressGesture],
  );

  return (
    <View style={styles.container}>
      <View style={styles.indicator}>
        {showIndicator && (
          <Indicator size={4} on={indicatorOn} colour="#38BDF8" />
        )}
      </View>
      <View style={styles.shadow}>
        <GestureDetector gesture={padGesture}>
          <Animated.View
            style={[
              styles.pad,
              active ? styles.padActive : styles.padIdle,
              { width, height },
              animatedStyle,
              style,
            ]}
          >
            {active && <View style={styles.activeOverlay}></View>}
            <Text style={[styles.label, active && styles.labelActive]}>
              {label}
            </Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const overlayTop = Math.random() * 0.3 + 0.1;
const overlayRight = Math.random() * 0.3 + 0.1;
const overlayOpacity = Math.random() * 0.1 + 0.05;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 3,
  },
  shadow: {
    backgroundColor: 'rgba(218, 218, 218, 0.1)',
    borderRadius: 5,
  },
  pad: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  indicator: {
    marginLeft: 'auto',
    marginRight: 5,
    minHeight: 12,
    justifyContent: 'center',
  },
  activeOverlay: {
    height: '98%',
    width: '97%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    zIndex: 2,
    position: 'absolute',
    opacity: overlayOpacity,
    top: `${overlayTop * 100}%`,
    right: `${overlayRight * 100}%`,
  },
  padIdle: {
    backgroundColor: '#FCFCFD',
    borderColor: '#E7E7EE',
    shadowColor: '#2D2342',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  padActive: {
    backgroundColor: 'rgb(232, 244, 255)',
    borderColor: '#dbeafe',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#36395A',
    letterSpacing: 0.4,
    textShadowColor: 'rgba(25, 28, 48, 0.3)',
    textShadowOffset: { width: 0.1, height: 0.8 },
    textShadowRadius: 1.2,
    includeFontPadding: false,
    opacity: 0.7,
  },
  labelActive: {
    color: '#2E2F45',
    textShadowColor: 'rgba(44, 20, 27, 0.12)',
  },
});
