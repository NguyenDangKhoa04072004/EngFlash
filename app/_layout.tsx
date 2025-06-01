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
    fade: true
})

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAuth, setIsAuth] = useState(false);
  const [onBoarding, setOnBoarding] = useState(false);
  const [isCheckingState, setIsCheckingState] = useState(false);
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

  const checkOnBoarding = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      if (hasSeenOnboarding == "true") {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    if (loaded && isCheckingState) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isCheckingState]);

  useEffect(() => {
    const initAuth = async () => {
      const authCheck = await checkAuth();
      const onBoardingCheck = await checkOnBoarding();
      setIsAuth(authCheck);
      setOnBoarding(onBoardingCheck);
      setIsCheckingState(true);
    };
    initAuth();
  }, []);

  if (!loaded || !isCheckingState) {
    return null;
  }

  return (
    <AuthProvider initAuth={isAuth}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <RootNavigator onBoarding={onBoarding} />
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

interface Props {
  onBoarding: boolean;
}

const RootNavigator = ({ onBoarding }: Props) => {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!onBoarding) {
      router.replace("/");
    } else {
      if (!isAuth) {
        router.replace("/(auth)");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [isAuth]);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
      <Stack.Protected guard={!isAuth}>
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
