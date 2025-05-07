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
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";

const CreateCollection = () => {
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const data = [
        { label: "Easy", value: "easy" },
        { label: "Medium", value: "medium" },
        { label: "Hard", value: "hard" },
    ];

    const [wordType, setWordType] = useState(null);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            style={{ backgroundColor: "#FEE2E2" }}
        >
            <View style={{ width: '100%', flexDirection: "row", justifyContent: 'center', alignItems: "center", marginBottom: 30, marginTop: 30 }}>
                <Text style={styles.title}>Tạo collection</Text>
                <TouchableOpacity style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                }}
                    onPress={() => router.replace("/(tabs)/addcard")}
                >
                    <Image
                        source={require("@/assets/images/create_card/arrow-left.png")}

                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerInput}>
                <Text style={styles.label}>Mức độ</Text>
                <Dropdown
                    style={styles.dropdown}
                    data={data}
                    labelField="label"
                    valueField="value"
                    value={wordType}
                    onChange={(item) => setWordType(item.value)}
                />
            </View>

            <View style={styles.containerInput}>
                <Text style={styles.label}>Tên collection</Text>
                <TextInput style={styles.input} />
            </View>

            <View style={styles.AI}>
                <Image
                    source={require("@/assets/images/navigation/magic-AI-generation.png")}
                />
                <Text
                    style={{
                        color: "#A3A3A3",
                        fontFamily: "Regular",
                        fontSize: 16,
                        lineHeight: 24,
                    }}
                >
                    Magic AI Generation
                </Text>
            </View>

            <TouchableOpacity
                style={{
                    borderRadius: 9999,
                    backgroundColor: "#3B82F6",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    marginBottom: 15,
                }}
            >
                <Text
                    style={{
                        fontFamily: "Regular",
                        fontSize: 16,
                        lineHeight: 24,
                        color: "#FDFDFD",
                    }}
                >
                    Lưu
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#FEE2E2",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontFamily: "Bold",
        color: "#000",
    },
    containerInput: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        lineHeight: 20,
        color: "#344054",
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#D0D5DD",
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#101828",
        marginTop: 8,
        backgroundColor: "#fff",
    },
    dropdown: {
        marginTop: 8,
        height: 50,
        borderColor: "#D0D5DD",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    AI: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
});

export default CreateCollection;
