import { replace } from "expo-router/build/global-state/routing";
import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { useRouter } from "expo-router";

const LoginScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/auth/two_block.png")} // Adjust the path to your logo image
                style={styles.block}
            />
            <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
            />
            <Text style={styles.title}>Đăng nhập vào tài khoản EngFlash của bạn</Text>

            <View style={styles.inputContainer}>
                <Image
                    source={require("../../assets/images/auth/username.png")} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput
                    style={styles.input}
                    placeholder="Tên tài khoản"
                    placeholderTextColor="#404040"
                />
            </View>
            <View style={styles.inputContainer}>
                <Image
                    source={require("../../assets/images/auth/password.png")} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    placeholderTextColor="#404040"
                />
            </View>

            <TouchableOpacity
                onPress={() => router.replace("/(auth)/forgot-password")}
            >
                <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/(tabs)/other")}
            >
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Chưa có tài khoản? </Text>
                <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
                    <Text style={styles.register}>Đăng ký ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    block: {
        position: "absolute",
        alignSelf: "center",
        top: -21,
        left: 0,
    },
    logo: {
        width: 258,
        height: 258,
        alignSelf: "center",
        position: "absolute",
        top: 75,
    },
    title: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 40,
        marginTop: 80,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputIcon: {
        zIndex: 1,
        position: "absolute",
        marginLeft: 30,
        top: 25,
    },
    input: {
        flex: 1,
        height: 68,
        width: "100%",
        paddingLeft: 75,
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    forgotPassword: {
        color: "#404040",
        textAlign: "right",
        marginBottom: 50,
        fontWeight: "bold",
    },
    button: {
        width: "55%",
        backgroundColor: "#DB2777",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    register: {
        color: "#404040",
        textAlign: "center",
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
    },
});

export default LoginScreen;
