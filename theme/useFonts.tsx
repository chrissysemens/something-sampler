import { useFonts } from 'expo-font';

export function useAppFonts() {
  return useFonts({
    InterRegular: require('../assets/fonts/Inter-18pt-Regular.ttf'),
    InterMedium: require('../assets/fonts/Inter-18pt-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-18pt-SemiBold.ttf'),
    InterBold: require('../assets/fonts/Inter-18pt-Bold.ttf'),
    OrbitronRegular: require('../assets/fonts/Orbitron-Regular.ttf'),
    OrbitronMedium: require('../assets/fonts/Orbitron-Medium.ttf'),
    OrbitronSemiBold: require('../assets/fonts/Orbitron-SemiBold.ttf'),
    OrbitronBold: require('../assets/fonts/Orbitron-Bold.ttf'),
  });
}
