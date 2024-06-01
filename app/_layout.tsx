import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider ,useAuth } from "@clerk/clerk-expo";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (e) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (e) {
      return null;
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}> 
            <RootLayoutNav/>
          </ClerkProvider>);
}

function RootLayoutNav() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const {isLoaded, isSignedIn} = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('home')
    }
  }, [isLoaded])

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none'
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none'
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none'
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none'
        }}
      />
      </Stack>
    </ThemeProvider>
  );
}