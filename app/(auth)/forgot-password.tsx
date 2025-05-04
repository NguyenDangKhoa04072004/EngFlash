import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const router = useRouter();
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.title0}>Quên mật khẩu</Text>
            <Text style={styles.title1}>Nhập email của bạn để để lấy lại mật khẩu nhé !</Text>


            <View style={styles.inputContainer}>
                <Image
                    source={require('../../assets/images/auth/email.png')} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput style={styles.input} placeholder="Nhập email đã đăng ký" placeholderTextColor="#404040" />
            </View>


            <View style={styles.groupButton}>
                <TouchableOpacity style={styles.button1} onPress={() => router.replace('/(auth)/login')}>
                    <Text style={styles.buttonText1}>Hủy</Text>
                </TouchableOpacity>
                <View style={{ width: 12 }}></View>
                <TouchableOpacity style={styles.button2} onPress={() => router.replace('/(auth)/set-password')}>
                    <Text style={styles.buttonText2}>Lấy lại mật khẩu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    title0: {
        fontSize: 24,
        fontFamily: 'Semibold',
        textAlign: 'center',
        marginTop: 50,
        lineHeight: 32,
    },
    title1: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        zIndex: 1,
        position: 'absolute',
        marginLeft: 30,
        top: 18,
    },
    hiddenIcon: {
        zIndex: 1,
        position: 'absolute',
        right: 30,
        top: 18,
    },
    input: {
        flex: 1,
        height: 53,
        width: 336,
        paddingLeft: 75,
        paddingRight: 75,
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        marginBottom: 30,
        fontSize: 16,
    },
    groupButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: 350,
    },
    button1: {
        width: 112,
        backgroundColor: '#FDFDFD',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#A3A3A3',
    },
    button2: {
        width: 212,
        backgroundColor: '#DB2777',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText1: {
        color: '#A3A3A3',
        fontSize: 16,
    },
    buttonText2: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default LoginScreen;
