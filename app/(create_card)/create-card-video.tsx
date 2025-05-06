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
import LoadingScreen from "@/components/LoadingScreen";

import SuccessModal from "@/components/SuccessModel";

const CreateCardVideo = () => {
    const router = useRouter();
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const handlePress = () => {
        setShowLoading(true);

        setTimeout(() => {
            setShowLoading(false);
        }, 3000);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tạo từ video ngắn</Text>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập liên kết của video youtube..."
                    placeholderTextColor="#101828"
                />

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#D0D5DD",
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                        height: 45,
                        paddingHorizontal: 10,
                    }}
                    onPress={() => { handlePress() }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            lineHeight: 16,
                            fontFamily: "Regular",
                        }}
                    >
                        Next
                    </Text>
                    <Image
                        source={require("@/assets/images/create_card/arrow-right.png")}
                        style={{ width: 20, height: 20, marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
            {showLoading && (<View style={{
                marginTop: 250
            }}><LoadingScreen hiddenText={true} /></View>)}
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
    title: {
        fontSize: 32,
        fontFamily: "Bold",
        lineHeight: 40,
        marginTop: 30,
        marginBottom: 20,
    },
    containerInput: {
        width: "100%",
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        width: "70%",
        height: 45,
        borderWidth: 1,
        borderColor: "#D0D5DD",
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 12,
        fontFamily: "Regular",
        color: "#101828",
    },
});

export default CreateCardVideo;
