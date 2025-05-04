import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";

export default function LoadingScreen() {
    const [loadingText, setLoadingText] = useState("Loading.");
    const rotateValue = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current; // giá trị opacity

    // Tạo hiệu ứng Loading... bằng cách thay đổi text
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prev) => {
                if (prev === "Loading...") return "Loading.";
                else if (prev === "Loading.") return "Loading..";
                else return "Loading...";
            });
        }, 500); // thay đổi sau mỗi 500ms

        // Chạy animation xoay liên tục
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 2000, // 1 vòng quay trong 2 giây
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Hiệu ứng làm mờ dần và hiện rõ chữ "Loading"
        Animated.loop(
            Animated.sequence([
                Animated.delay(500), // delay 500ms trước khi bắt đầu
                Animated.timing(fadeAnim, {
                    toValue: 0.3, // Làm mờ
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1, // Làm rõ
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        return () => clearInterval(interval); // dọn dẹp khi component bị unmount
    }, []);

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
                source={require("../assets/images/auth/loading.png")} // icon loading bạn tự chọn
                style={[styles.image, animatedStyle]}
                resizeMode="contain"
            />
            <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
                {loadingText}
            </Animated.Text>
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
        width: '100%',
        resizeMode: "contain",
    },
    loadingText: {
        position: "absolute",
        fontSize: 20,
        lineHeight: 24,
        color: "#EC4899",
        fontFamily: "Bold",
        textAlign: "center",
    },
});
