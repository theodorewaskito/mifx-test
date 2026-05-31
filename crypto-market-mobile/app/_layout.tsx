import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
   <SafeAreaProvider>
      {/* <KeyboardProvider> */}
        {/* <AuthProvider> */}
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#F7F8FA" },
              animation: "fade",
            }}
          />
        {/* </AuthProvider> */}
      {/* </KeyboardProvider> */}
    </SafeAreaProvider>
  );
}
