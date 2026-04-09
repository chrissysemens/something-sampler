import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type CardVariant = 'elevated' | 'outlined' | 'flat';
type CardPadding = 'sm' | 'md' | 'lg';

type Props = {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  style?: ViewStyle;
  testID?: string;
};

export function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  style,
  testID,
}: Props) {
  const { theme } = useTheme();

  const pad: Record<CardPadding, number> = {
    sm: theme.spacing[3], // 12
    md: theme.spacing[4], // 16
    lg: theme.spacing[6], // 24
  };

  const cardTheme = theme.components.card;

  const variantStyle = (() => {
    switch (variant) {
      case 'outlined':
        return {
          ...cardTheme.outlined,
          borderWidth: StyleSheet.hairlineWidth,
          shadowOpacity: 0,
          elevation: 0,
        } as const;

      case 'flat':
        return {
          ...cardTheme.flat,
          shadowOpacity: 0,
          elevation: 0,
        } as const;

      case 'elevated':
      default:
        return {
          ...cardTheme.elevated,
          ...theme.elevation.md,
        } as const;
    }
  })();

  return (
    <View
      testID={testID || 'card'}
      accessibilityLabel={testID || 'card'}
      style={[
        styles.base,
        {
          borderRadius: theme.radii.lg,
          padding: pad[padding],
        },
        variantStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
    width: '100%',
  },
});
