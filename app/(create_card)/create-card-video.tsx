import React, { useState } from "react";
import { WebView } from "react-native-webview";
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
import { Keyboard } from "react-native";

import SuccessModal from "@/components/SuccessModel";
import { ScrollView } from "react-native-gesture-handler";

const CreateCardVideo = () => {
    const router = useRouter();
    const [showLoading, setShowLoading] = useState(false);
    const [showResult, setshowResult] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [selectedWord, setSelectedWord] = useState("");

    const handlePress = () => {
        setShowLoading(true);
        setshowResult(false);

        setTimeout(() => {
            setShowLoading(false);
            setshowResult(true);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tạo từ video ngắn</Text>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập liên kết của video youtube..."
                    placeholderTextColor="#101828"
                    value={videoUrl}
                    onChangeText={(text) => setVideoUrl(text)}
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
                    onPress={() => {
                        Keyboard.dismiss();
                        handlePress();
                    }}
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

            {showLoading && (
                <View
                    style={{
                        marginTop: 250,
                    }}
                >
                    <LoadingScreen hiddenText={true} />
                </View>
            )}

            {showResult && (
                <>
                    <View style={styles.container_webview}>
                        <WebView
                            style={styles.webview}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ uri: videoUrl }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                        }}
                        onPress={() => {
                            router.replace("/(create_card)/create-collection");
                        }}
                    >
                        <Image source={require("@/assets/images/create_card/plus.png")} />
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={{ marginTop: 40 }}>
                            <View style={styles.word}>
                                <Image
                                    source={require("@/assets/images/create_card/volume.png")}
                                />
                                <Text
                                    style={{ fontFamily: "Regular", fontSize: 20, marginLeft: 20 }}
                                >
                                    <Text style={{ color: "#15803D" }}>to </Text>chill out
                                </Text>
                            </View>
                            <View style={styles.word}>
                                <Image
                                    source={require("@/assets/images/create_card/volume.png")}
                                />
                                <Text
                                    style={{ fontFamily: "Regular", fontSize: 20, marginLeft: 20 }}
                                >
                                    <Text style={{ color: "#15803D" }}>to </Text>chill out
                                </Text>
                            </View>
                            <View style={styles.word}>
                                <Image
                                    source={require("@/assets/images/create_card/volume.png")}
                                />
                                <Text
                                    style={{ fontFamily: "Regular", fontSize: 20, marginLeft: 20 }}
                                >
                                    <Text style={{ color: "#15803D" }}>to </Text>chill out
                                </Text>
                            </View>
                            <View style={styles.word}>
                                <Image
                                    source={require("@/assets/images/create_card/volume.png")}
                                />
                                <Text
                                    style={{ fontFamily: "Regular", fontSize: 20, marginLeft: 20 }}
                                >
                                    join a{" "}
                                    <Text
                                        style={{ color: "#DC2626", fontFamily: "Bold" }}
                                        onLayout={(event) => {
                                            const { x, y } = event.nativeEvent.layout;
                                            setTooltipPosition({ x, y });
                                        }}
                                        onPress={() => {
                                            setSelectedWord("conversation");
                                            setShowTooltip(true);
                                        }}
                                    >
                                        conversation
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </>
            )}

            {showTooltip && (
                <View
                    style={{
                        position: "absolute",
                        top: tooltipPosition.y + 260, // +30 để dưới chữ một chút
                        left: tooltipPosition.x + 100,
                        backgroundColor: "#FFF",
                        width: 225,
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                        zIndex: 100,
                    }}
                >
                    <View
                        style={{
                            height: 36,
                            backgroundColor: "#DB2777",
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            position: "relative",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 5,
                            paddingHorizontal: 15,
                            alignItems: "center"
                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Image
                                source={require("@/assets/images/create_card/calendar.png")}
                            />
                            <Text style={{ fontFamily: "Regular", fontSize: 12, color: "#FDFDFD", marginLeft: 5, marginTop: 2 }}>Add words</Text>
                        </View>
                        <TouchableOpacity onPress={() => setShowTooltip(false)}>
                            <Image
                                source={require("@/assets/images/create_card/delete.png")}

                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 51, flexDirection: "row", alignItems: "center", paddingLeft: 15 }}>
                        <Image
                            source={require("@/assets/images/create_card/green_circle.png")}

                        />
                        <Text style={{ fontSize: 16, fontFamily: "Regular", marginLeft: 15 }}>
                            {selectedWord}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 205,
                            height: 2,
                            backgroundColor: "#000000",
                            alignSelf: "center"
                        }}
                    />
                    <View style={{ height: 51, flexDirection: "row", alignItems: "center", paddingLeft: 15 }}>
                        <Image
                            source={require("@/assets/images/create_card/pink_circle.png")}

                        />
                        <Text style={{ fontSize: 12, fontFamily: "Regular", marginLeft: 15 }}>
                            cuộc hội thoại
                        </Text>
                        <TouchableOpacity onPress={() => { router.replace("/(tabs)/addcard") }}>
                            <Image
                                source={require("@/assets/images/create_card/plus.png")}
                                style={{ width: 50, height: 50, marginLeft: 45 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
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
    container_webview: {
        height: 200,
        width: "100%",
        overflow: "hidden",
    },
    webview: {
        flex: 1,
    },
    word: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
    },
});

export default CreateCardVideo;
