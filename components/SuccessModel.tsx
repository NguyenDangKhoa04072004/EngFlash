import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SuccessModal({ visible, onClose }) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <Text style={styles.text}>Đăng nhập thành công!</Text>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Text style={styles.buttonText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        alignItems: "center",
        width: 260,
    },
    text: { fontSize: 16, marginBottom: 20, textAlign: "center" },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
    },
    buttonText: { fontSize: 16, color: "#333" },
});
