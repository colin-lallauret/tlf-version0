import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (isAuthenticated === undefined) return;
    if (!rootNavigationState?.key) return;

    const inLogin = segments[0] === 'login';

    if (!isAuthenticated && !inLogin) {
      // Redirect to the sign-in page.
      setTimeout(() => {
        router.replace('/login');
      }, 0);
    } else if (isAuthenticated && inLogin) {
      // Redirect to the home page.
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 0);
    }
  }, [isAuthenticated, segments, rootNavigationState]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

import { Fustat_400Regular, Fustat_700Bold } from '@expo-google-fonts/fustat';
import { Unbounded_400Regular, Unbounded_700Bold, useFonts } from '@expo-google-fonts/unbounded';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Unbounded_700Bold,
    Unbounded_400Regular,
    Fustat_400Regular,
    Fustat_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
