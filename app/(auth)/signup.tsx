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
import LoadingScreen from "@/components/LoadingScreen";

const LoginScreen = () => {
    const router = useRouter();
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);
    const [modalFailVisible, setModalFailVisible] = useState(false);
    const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");


    const handleSignUp = async () => {

        if (!email.trim() || !password.trim() || !name.trim() || !username.trim()) {
            setMessage("Vui lòng điền hết các trường.")
            setModalFailVisible(true)
            return
        }
        if (password != repassword) {
            setMessage("Mật khẩu không khớp")
            setModalFailVisible(true)
            return
        }
        setLoading(true);
        try {
            const response = await fetch("https://engflash-system.onrender.com/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            if (!response.ok) {
                setLoading(false)
                setMessage("Email đã tồn tại. Vui lòng sử\ndụng email khác.");
                setModalFailVisible(true)
            }
            else {
                setLoading(false);
                setMessage("Hãy đăng nhập và bắt đầu trải\nnghiệm dịch vụ của chúng tôi")
                setModalSuccessVisible(true)
            }

        }
        catch (error) {
            setLoading(false);
            setMessage("Lỗi hệ thông, vui lòng thử lại sau.");
            setModalFailVisible(true)
        }
        // setMessage("Email đã tồn tại. Vui lòng sử\ndụng email khác.");
        // setMessage("Hãy đăng nhập và bắt đầu trải\nnghiệm dịch vụ của chúng tôi");
    }


    if (loading) {
        return <LoadingScreen />
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title0}>Hãy bắt đầu nào!</Text>
            <Text style={styles.title1}>
                Tạo tài khoản trên EngFlash để sử dụng{"\n"} tất cả các tính năng nhé !
            </Text>

            <View style={styles.inputContainer}>
                <Image
                    source={require("../../assets/images/auth/username.png")} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput
                    style={styles.input}
                    placeholder="Họ và tên"
                    placeholderTextColor="#404040"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Image
                    source={require("../../assets/images/auth/username.png")} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput
                    style={styles.input}
                    placeholder="Tên tài khoản"
                    placeholderTextColor="#404040"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style={styles.inputContainer}>
                <Image
                    source={require("../../assets/images/auth/email.png")} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#404040"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Mật khẩu */}

            <View style={styles.inputContainer}>
                <Image
                    source={require("../../assets/images/auth/password.png")} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={secureText1}
                    placeholderTextColor="#404040"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.hiddenIcon}
                    onPress={() => setSecureText1(!secureText1)}
                >
                    <Image
                        source={
                            secureText1
                                ? require("../../assets/images/auth/hidden.png") // Icon con mắt đóng
                                : require("../../assets/images/auth/unhidden.png") // Icon con mắt mở
                        }
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Image
                    source={require("../../assets/images/auth/password.png")} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận mật khẩu"
                    secureTextEntry={secureText2}
                    placeholderTextColor="#404040"
                    value={repassword}
                    onChangeText={setRepassword}
                />
                <TouchableOpacity
                    style={styles.hiddenIcon}
                    onPress={() => setSecureText2(!secureText2)}
                >
                    <Image
                        source={
                            secureText2
                                ? require("../../assets/images/auth/hidden.png") // Icon con mắt đóng
                                : require("../../assets/images/auth/unhidden.png") // Icon con mắt mở
                        }
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSignUp()}
            >
                <Text style={styles.buttonText}>Tạo tài khoản</Text>
            </TouchableOpacity>



            <SuccessModal visible={modalFailVisible} onClose={() => setModalFailVisible(false)} type={"fail"} title={"Đăng ký thất bại!"}
                message={message} />

            <SuccessModal visible={modalSuccessVisible} onClose={() => router.replace("/(auth)/login")} type={"success"} title={"Đăng ký thành công!"}
                message={message} />

            <View style={styles.footer}>
                <Text>Đã có tài khoản? </Text>
                <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                    <Text style={styles.register}>Đăng nhập</Text>
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
        justifyContent: "flex-start",
    },
    title0: {
        fontSize: 24,
        fontFamily: "Semibold",
        textAlign: "center",
        marginTop: 50,
        lineHeight: 32,
    },
    title1: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 24,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputIcon: {
        zIndex: 1,
        position: "absolute",
        marginLeft: 30,
        top: 18,
    },
    hiddenIcon: {
        zIndex: 1,
        position: "absolute",
        right: 30,
        top: 18,
    },
    input: {
        flex: 1,
        height: 53,
        width: "100%",
        paddingLeft: 75,
        paddingRight: 75,
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        marginBottom: 30,
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
