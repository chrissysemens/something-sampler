export default ({ config }) => {
  const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

  return {
    ...config,

    name: 'Something sampler',
    slug: 'something-sampler',
    scheme: 'something-sampler',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    newArchEnabled: true,

    icon: './assets/icon.png',

    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    ios: {
      bundleIdentifier: 'com.cse.app',
      supportsTablet: true,
    },

    android: {
      package: 'com.cse.app',
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },

    web: {
      favicon: './assets/favicon.png',
    },

    extra: {
      ...(config.extra ?? {}),
      eas: {
        ...(config.extra?.eas ?? {}),
        projectId: '8980c975-43e3-4f66-a063-ac3a87a392ce',
      },
    },

    plugins: [
      ['expo-router', storybookEnabled ? { root: './src/storybook-app' } : {}],
      'expo-localization',
      '@react-native-community/datetimepicker',
      'react-native-audio-api',
    ],
  };
};
