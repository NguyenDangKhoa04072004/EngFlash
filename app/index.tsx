import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import Onboarding from "react-native-onboarding-swiper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "hasSeenOnboarding";

const { width, height } = Dimensions.get("window");

export const unstable_settings = {
  initialRouteName: "index",
};

export const screenOptions = {
  headerShown: false,
};

const dotComponent = ({ selected }) => {
  return (
    <View
      style={{
        width: selected ? 40 : 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
        backgroundColor: selected ? "#737373" : "#a3a3a3",
        opacity: selected ? 1 : 0.3,
      }}
    />
  );
};

const nextButton = ({ ...props }) => (
  <Button
    title={<MaterialIcons name="navigate-next" size={24} color="white" />}
    buttonStyle={{
      backgroundColor: "#ec4899",
      borderRadius: 25,
      marginRight: 20,
      padding: 10,
      width: 50,
      height: 50,
    }}
    {...props}
  />
);

const skipButton = ({ ...props }) => (
  <Button
    title={"Skip"}
    buttonStyle={{ backgroundColor: "transparent", marginLeft: 15 }}
    titleStyle={{ color: "#ec4899", fontWeight: "500", fontSize: 18 }}
    {...props}
  />
);

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const onboardingRef = useRef<Onboarding>(null);
  const router = useRouter(); 
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value === "true") {
          router.replace("/(tabs)");
        } else {
          setShowOnboarding(true);
        }
      } catch (e) {
        console.error("Failed to load onboarding status", e);
      } finally {
        setLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, "true");
    router.replace("/(auth)");
  };

  if (loading) {
    return (
      <View style={[styles.logoScreen]}>
        <ActivityIndicator size="large" color="#ec4899" />
      </View>
    );
  }

  if (!showOnboarding) {
    return (
      <TouchableWithoutFeedback onPress={() => setShowOnboarding(true)}>
        <LinearGradient
          colors={["#FFF7AD", "#FFA9F9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.logoScreen}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImage}
          />
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Onboarding
      DotComponent={dotComponent}
      NextButtonComponent={nextButton}
      SkipButtonComponent={skipButton}
      bottomBarColor={"white"}
      bottomBarHighlight={false}
      containerStyles={{ padding: 20 }}
      titleStyles={{ fontWeight: "600", fontSize: 40, marginBottom: 20 }}
      subTitleStyles={{ fontWeight: "300", fontSize: 20 }}
      ref={onboardingRef}
      // onSkip={() => router.replace("/(tabs)")}
      // onDone={() => router.replace("/(tabs)")}
      onSkip={handleFinishOnboarding}
      onDone={handleFinishOnboarding}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/images/onboarding1.png")}
              style={styles.onboardingImage}
            />
          ),
          title: "Ôn tập thông minh",
          subtitle:
            "Áp dụng kỹ thuật spaced repetition giúp việc ôn tập hiệu quả, đưa từ vựng vào trí nhớ dài hạn.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/images/onboarding2.png")}
              style={styles.onboardingImage}
            />
          ),
          title: "Tạo thẻ tự động",
          subtitle:
            "Tiết kiệm thời gian bằng cách tự động tạo flashcard từ văn bản hoặc tài liệu.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/images/onboarding3.png")}
              style={styles.onboardingImage}
            />
          ),
          title: "Thông báo ôn tập",
          subtitle:
            "Luôn nhắc nhở bạn học đúng lúc với các thông báo thông minh.",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  logoScreen: {
    width,
    height,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
  onboardingImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 30,
  },
});
