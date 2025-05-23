import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import SuccessModal from "@/components/SuccessModel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from "@/components/LoadingScreen";


const LoginScreen = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [redWarning, setWarning] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://engflash-system.onrender.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                setLoading(false)
                setWarning(true);
                setModalVisible(true);
            }
            else {
                const data = await response.json();
                await AsyncStorage.setItem('accessToken', data.access_token);
                setLoading(false);
                router.replace("/(tabs)")
            }
        } catch (error) {
            setLoading(false);
            setModalVisible(true);
        }
    };

    if (loading) {
        return <LoadingScreen />
    }
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
                    style={[styles.input, redWarning && styles.inputError]}
                    placeholder="Tên tài khoản"
                    placeholderTextColor="#404040"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setWarning(false);
                    }}
                />
            </View>
            <View style={styles.inputContainer}>
                <Image
                    source={require("../../assets/images/auth/password.png")} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput
                    style={[styles.input, redWarning && styles.inputError]}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    placeholderTextColor="#404040"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setWarning(false);
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={() => router.replace("/(auth)/forgot-password")}
            >
                <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin()}
            >
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <SuccessModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                type={"fail"}
                title={"Đăng nhập thất bại!"}
                message={"Tên đăng nhập hoặc mật khẩu\nkhông đúng. Vui lòng thử lại."}
            />

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
    inputError: {
        color: "#7F1D1D",
    }
    ,
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
