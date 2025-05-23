import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function SuccessModal({ visible, onClose, title, description }) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Image
                            source={require("@/assets/images/modal/exit.png")}
                        />
                    </TouchableOpacity>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 10 }}>
                        <View style={{ borderRadius: 8, width: 56, height: 56, backgroundColor: "#65A30D" }}>
                            <Image
                                source={require("@/assets/images/modal/fail.png")}
                            />
                        </View>
                        <View style={{ flexDirection: "column", paddingRight: 20 }}>
                            <Text style={{ fontFamily: 'Semibold', fontSize: 20, marginBottom: 10 }}>
                                Đăng nhập thất bại
                            </Text >
                            <Text style={{ fontFamily: 'Regular', fontSize: 14, lineHeight: 22, color: "#54595E", opacity: "0.6", marginBottom: 20 }}>
                                Tên đăng nhập hoặc mật khẩu{'\n'}không đúng. Vui lòng thử lại.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        width: 353,
    },
    button: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    }

});
