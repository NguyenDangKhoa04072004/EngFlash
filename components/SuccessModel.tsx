import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function SuccessModal({ visible, onClose, type, title, message }) {
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
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 10, paddingBottom: message === "" ? 30 : null }}>
                        <View style={{ borderRadius: 8, width: 56, height: 56, backgroundColor: type === "success" ? "#EC4899" : "#65A30D" }}>
                            <Image
                                source={type === "success" ? require("@/assets/images/modal/success.png") : require("@/assets/images/modal/fail.png")}
                            />
                        </View>
                        {message === "" ?
                            <Text style={{ fontFamily: 'Semibold', fontSize: 20, marginBottom: 10, alignSelf: "center", paddingTop: 10, marginLeft: 5 }}>
                                {title}
                            </Text >

                            :
                            <View style={{ flexDirection: "column", paddingRight: 20 }}>
                                <Text style={{ fontFamily: 'Semibold', fontSize: 20, marginBottom: 10 }}>
                                    {title}
                                </Text >
                                <Text style={{ fontFamily: 'Regular', fontSize: 14, lineHeight: 22, color: "#54595E", opacity: "0.6", marginBottom: 20 }}>
                                    {message}
                                </Text>
                            </View>}
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
