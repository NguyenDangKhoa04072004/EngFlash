import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

import SuccessModal from '@/components/SuccessModel';

const LoginScreen = () => {
    const router = useRouter();
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);

    const [showModal, setShowModal] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title0}>Card</Text>
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
        marginBottom: 20,
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
        width: '100%',
        paddingLeft: 75,
        paddingRight: 75,
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        marginBottom: 30,
        fontSize: 16,
    },
    forgotPassword: {
        color: '#404040',
        textAlign: 'right',
        marginBottom: 50,
        fontWeight: 'bold',
    },
    button: {
        width: '55%',
        backgroundColor: '#DB2777',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    register: {
        color: '#404040',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
});

export default LoginScreen;
