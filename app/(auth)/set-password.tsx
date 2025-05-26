import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import LoadingScreen from '../../components/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessModal from '@/components/SuccessModel';

const LoginScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [modalVisible, setModalVisible] = useState(false);


    const handleSubmit = async () => {
        setLoading(true)
        const user_id = Number(await AsyncStorage.getItem("resetId"));
        if (newPassword != rePassword || !newPassword.trim()) {
            setLoading(false)
            setModalVisible(true)
            return
        }
        try {
            const response = await fetch("https://engflash-system-ngk.onrender.com/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id,
                    newPassword
                })
            });

            if (response.ok) {
                await AsyncStorage.removeItem("resetId")
                setLoading(false)
                router.replace('/(auth)/login');
            }
            else {
                setLoading(false)
                console.log("lôi")
                setModalVisible(true)
            }
        } catch (error) {
            setLoading(false)
        }
    };


    if (loading) {
        return <LoadingScreen />;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đặt lại mật khẩu</Text>


            <View style={styles.inputContainer}>
                <Image
                    source={require('../../assets/images/auth/password.png')} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry={true} placeholderTextColor="#404040" value={newPassword} onChangeText={setNewPassword} />
            </View>
            <View style={styles.inputContainer}>
                <Image
                    source={require('../../assets/images/auth/password.png')} // Adjust the path to your username icon
                    style={styles.inputIcon}
                ></Image>
                <TextInput style={styles.input} placeholder="Xác nhận mật khẩu" secureTextEntry={true} placeholderTextColor="#404040" value={rePassword} onChangeText={setRePassword} />
            </View>

            <View style={styles.groupButton}>
                <TouchableOpacity style={styles.button1} onPress={() => router.replace('/(auth)/login')}>
                    <Text style={styles.buttonText1}>Hủy</Text>
                </TouchableOpacity>
                <View style={{ width: 12 }}></View>
                <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
                    <Text style={styles.buttonText2}>Đặt lại mật khẩu</Text>
                </TouchableOpacity>
            </View>
            <SuccessModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                type={"fail"}
                title={"Thất bại!"}
                message={"Mật khẩu không khớp."}
            />
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
    title: {
        fontSize: 24,
        fontFamily: 'Semibold',
        textAlign: 'center',
        marginTop: 100,
        lineHeight: 32,
        marginBottom: 50,
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
