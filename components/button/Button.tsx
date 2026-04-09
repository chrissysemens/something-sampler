import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '../text/Text';
import { Spinner } from '../spinner/Spinner';
import { useTheme } from '../../theme/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  style?: ViewStyle;
  testID?: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  text,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  style,
  testID,
}: Props) => {
  const { theme } = useTheme();

  const pressed = useSharedValue(0);
  const isDisabled = disabled || loading;
  const isVisuallyDisabled = disabled;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - pressed.value * 0.02 }],
    opacity: 1 - pressed.value * 0.1,
  }));

  const heights: Record<ButtonSize, number> = {
    sm: theme.sizes.controlSm,
    md: theme.sizes.controlMd,
    lg: theme.sizes.controlLg,
  };

  const paddingsX: Record<ButtonSize, number> = {
    sm: theme.spacing[3],
    md: theme.spacing[4],
    lg: theme.spacing[5],
  };

  const paddingsY: Record<ButtonSize, number> = {
    sm: theme.spacing[2],
    md: theme.spacing[2],
    lg: theme.spacing[3],
  };

  const variantStyle = theme.components.button.variants[variant];
  const disabledStyle = theme.components.button.disabled;

  const resolvedStyle = isVisuallyDisabled ? disabledStyle : variantStyle;

  return (
    <AnimatedPressable
      testID={testID || 'button'}
      accessibilityLabel={testID || 'button'}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={[
        styles.buttonBase,
        animatedStyle,
        {
          height: heights[size],
          paddingHorizontal: paddingsX[size],
          paddingVertical: paddingsY[size],
          borderRadius: theme.components.controlRadius,
          backgroundColor: resolvedStyle.backgroundColor,
          borderColor: resolvedStyle.borderColor,
          borderWidth: resolvedStyle.borderWidth,
          minWidth: fullWidth ? undefined : 180,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: loading ? 0.8 : 1,
        },
        style,
      ]}
      onPress={() => {
        if (!isDisabled) onPress();
      }}
      onPressIn={() => {
        if (isDisabled) return;
        pressed.value = withTiming(1, { duration: 120 });
      }}
      onPressOut={() => {
        pressed.value = withTiming(0, { duration: 120 });
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Text variant="bodyStrong" style={{ color: resolvedStyle.textColor }}>
          {text}
        </Text>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});

export { Button };
