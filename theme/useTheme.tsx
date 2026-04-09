import { useColorScheme } from 'react-native';
import { useAppStore } from '../state/useAppStore';
import { darkColors, lightColors } from './colours';
import { spacing, radii, sizes } from './tokens';
import { typography } from './typography';

export type ResolvedTheme = 'light' | 'dark';

export function useTheme() {
  const system = useColorScheme();
  const themeMode = useAppStore((s) => s.themeMode);

  const resolved: ResolvedTheme =
    themeMode === 'system' ? (system === 'dark' ? 'dark' : 'light') : themeMode;

  const colours = resolved === 'dark' ? darkColors : lightColors;
  const isDark = resolved === 'dark';

  const elevation = {
    sm: {
      shadowColor: colours.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.26 : 0.08,
      shadowRadius: 6,
      elevation: 1,
    },
    md: {
      shadowColor: colours.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 12,
      elevation: 2,
    },
  } as const;

  const theme = {
    mode: resolved,
    colours,
    spacing,
    radii,
    sizes,
    typography,
    elevation,
    sequencer: {
      panelBg: colours.surface,
      panelBorder: colours.border,
      bankDivider: colours.border,
      stepBgOff: colours.surface2,
      stepBgOn: colours.text,
      stepTextOff: colours.text,
      stepTextOn: colours.white,
      stepBorder: colours.border,
      stepPlayheadBorder: colours.primary,
    },
    components: {
      controlHeight: sizes.controlMd,
      controlRadius: radii.md,
      borderWidth: 1,
      button: {
        variants: {
          primary: {
            backgroundColor: colours.primary,
            borderColor: 'transparent',
            borderWidth: 0,
            textColor: colours.white,
          },
          secondary: {
            backgroundColor: colours.surface2,
            borderColor: colours.border,
            borderWidth: 1,
            textColor: colours.text,
          },
          ghost: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0,
            textColor: colours.primary,
          },
          danger: {
            backgroundColor: colours.danger,
            borderColor: 'transparent',
            borderWidth: 0,
            textColor: colours.white,
          },
        },
        disabled: {
          backgroundColor: colours.surface2,
          borderColor: colours.border,
          borderWidth: 1,
          textColor: colours.muted,
        },
      },
      input: {
        backgroundColor: colours.surface,
        backgroundColorFocused: colours.surface2,
        textColor: colours.text,
        placeholderColor: colours.muted,
        borderDefault: colours.border,
        borderFocused: colours.primary,
        borderError: colours.danger,
      },
      card: {
        elevated: {
          backgroundColor: colours.surface,
          borderWidth: 0,
          borderColor: 'transparent',
        },
        outlined: {
          backgroundColor: colours.surface,
          borderWidth: 1,
          borderColor: colours.border,
        },
        flat: {
          backgroundColor: colours.surface2,
          borderWidth: 0,
          borderColor: 'transparent',
        },
      },
    },
  } as const;

  return { themeMode, resolved, theme };
}
