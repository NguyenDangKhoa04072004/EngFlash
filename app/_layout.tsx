import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth, AuthProvider } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuth, setIsAuth] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Regular: require("../assets/fonts/BeVietnamPro-Regular.ttf"),
    Medium: require("../assets/fonts/BeVietnamPro-Medium.ttf"),
    Bold: require("../assets/fonts/BeVietnamPro-Bold.ttf"),
    Light: require("../assets/fonts/BeVietnamPro-Light.ttf"),
    Thin: require("../assets/fonts/BeVietnamPro-Thin.ttf"),
    Italic: require("../assets/fonts/BeVietnamPro-Italic.ttf"),
    Semibold: require("../assets/fonts/BeVietnamPro-SemiBold.ttf"),
  });

  const checkAuth = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      return !!accessToken;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    if (loaded && isCheckingAuth) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isCheckingAuth]);

  useEffect(() => {
    const initAuth = async () => {
      const result = await checkAuth();
      console.log(result);
      setIsAuth(result);
      setIsCheckingAuth(true);
    };
    initAuth();
  }, []);

  if (!loaded || !isCheckingAuth) {
    return null;
  }

  return (
    <AuthProvider initAuth={isAuth}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <RootNavigator />
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const RootNavigator = () => {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [isAuth]);
  return (
    <Stack>
      <Stack.Protected guard={!isAuth}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, navigationBarHidden: true }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack.Protected>
      <Stack.Protected guard={isAuth}>
        <Stack.Screen name="(create_card)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};
