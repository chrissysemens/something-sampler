# something-sampler

A personal Expo starter kit with a lightweight design system, Expo Router, Zustand state, Storybook, and Jest tests. Designed as a clean, opinionated base for future apps.

---

## What’s included

### Tech stack

- Expo SDK 54 + Expo Router
- TypeScript
- Zustand (with AsyncStorage persistence)
- Light / Dark / System theming
- i18n via i18next and react-i18next
- Storybook for React Native
- Jest + @testing-library/react-native
- Prettier + Husky
- React query

### Design system

- Theme tokens: spacing, radii, sizes
- Typography variants
- Components:
  - Text
  - Button
  - Input
  - Dropdown
  - Card
  - Divider
  - Spinner
- Layout primitives:
  - AppLayout
  - Screen
  - Stack
  - Row
  - Section

---

## Getting started

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm run start
```

Platform shortcuts:

```bash
npm run android
npm run ios
npm run web
```

If you encounter adb reverse or device offline issues:

```bash
npx expo start --tunnel
```

---

## Storybook

Storybook runs the app behind a feature flag.

```bash
npm run storybook
```

This sets:

```
EXPO_PUBLIC_STORYBOOK_ENABLED=true
```

Use this flag to conditionally render Storybook instead of the normal Expo Router entry.

---

## Tests

Watch mode:

```bash
npm test
```

CI mode:

```bash
npm run test:ci
```

---

## Formatting

```bash
npm run format
npm run format:check
```

---

## Theming

Theme mode is stored in Zustand and persisted to AsyncStorage.

Available modes:

- system
- light
- dark

Usage:

```ts
import { useTheme } from '../theme/useTheme';

const { theme, resolved } = useTheme();
```

Examples:

- theme.colors.bg
- theme.spacing[4]
- theme.radii.md
- theme.typography.body

---

## Design system rules

- No raw spacing values in features (use theme.spacing)
- No ad-hoc font sizes (use Text variants)
- AppLayout owns background, safe area, and horizontal padding
- Stack and Row own spacing (avoid margin chains)

---

## Imports

Components are re-exported from components/index.ts:

```ts
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Input,
  Spinner,
  Text,
} from '../components';
```

Layout helpers:

```ts
import { AppLayout } from '../layout/AppLayout';
import { Screen } from '../layout/Screen';
import { Stack } from '../layout/Stack';
import { Row } from '../layout/Row';
import { Section } from '../layout/Section';
```

---

## Project structure

```
app/                 # expo-router routes
components/          # UI components
layout/              # layout primitives
theme/               # tokens and useTheme
state/               # zustand stores
storybook-app/       # storybook entry
assets/              # fonts and images
i18n/                # translations
api/                 # react query api folder
queries/             # react query queries folder
```

---

## Using this template

1. Copy or scaffold from this repo
2. Update app name and identifiers
3. Remove or adapt the playground screen
4. Build your first real feature
5. Extract new components only when patterns repeat

---

## EAS (optional)

This template includes a minimal `eas.json` for convenience.

Profiles:

- `development` – dev-client builds
- `preview` – internal distribution
- `production` – store builds (no auto-submit)

Before using EAS:

- Update app identifiers (bundle ID / package name)
- Configure credentials via `eas build`
- Adjust profiles as needed for your app

## License

Personal starter kit — free to use across personal projects.
