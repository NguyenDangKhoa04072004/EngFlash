import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";

type LoadingScreenProps = {
  hiddenText?: boolean;
};

export default function LoadingScreen({
  hiddenText = false,
}: LoadingScreenProps) {
  const [loadingText, setLoadingText] = useState("Loading.");
  const rotateValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // useEffect xử lý mọi thứ liên quan đến text + animation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (!hiddenText) {
      interval = setInterval(() => {
        setLoadingText((prev) => {
          if (prev === "Loading...") return "Loading.";
          else if (prev === "Loading.") return "Loading..";
          else return "Loading...";
        });
      }, 500);

      // Chạy animation mờ hiện chữ
      Animated.loop(
        Animated.sequence([
          Animated.delay(500),
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    // Luôn chạy xoay icon (kể cả hiddenText là true)
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hiddenText]);

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/auth/loading.png")}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
      {!hiddenText && (
        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          {loadingText}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
  loadingText: {
    position: "absolute",
    fontSize: 20,
    color: "#EC4899",
    fontFamily: "Bold",
    textAlign: "center",
  },
});
