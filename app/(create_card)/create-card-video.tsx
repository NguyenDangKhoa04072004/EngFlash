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
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateCardVideo = () => {
    const router = useRouter();
    const [showLoading, setShowLoading] = useState(false);
    const [showResult, setshowResult] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [videoCaptionUrl, setCaptionVideoUrl] = useState("");

    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [selectedWord1, setSelectedWord1] = useState("");
    const [selectedWord2, setSelectedWord2] = useState("");
    const [captions, setCaptions] = useState<string[]>([]);



    const handlePress = async () => {
        setShowLoading(true);
        setshowResult(false);
        const accessToken = await AsyncStorage.getItem("accessToken");
        try {
            const response = await fetch(
                "https://engflash-system-ngk.onrender.com/topics/from-video",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        url: videoUrl
                    })
                }
            );

            if (response.ok) {
                const responseData = await response.json()
                const temp = responseData.captionUrl
                setCaptionVideoUrl(temp)
                await AsyncStorage.setItem('videoCaptionUrl', temp)
                setShowLoading(false)
                setshowResult(true)
                try {
                    const response = await fetch(temp);
                    const text = await response.text();
                    const cleanText = text.replace(/^WEBVTT[\s\S]*?\n/, "");
                    const blocks = cleanText
                        .split('\n\n')
                        .map(block => {
                            const lines = block.split('\n').filter(line => !line.includes('-->'));
                            return lines.join(' ');
                        })
                        .filter(Boolean); // lọc những đoạn trống

                    setCaptions(blocks);
                } catch (err) {
                    console.error('Lỗi khi fetch VTT:', err);
                }
            } else {
                setShowLoading(false);
                console.log("Không thể lấy caption");
            }
        } catch (error) {
            setShowLoading(false);
            console.log("Gặp lỗi khi lấy caption");
        }

    }





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


            {/* Show kết quả */}



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

                    <ScrollView>
                        <View style={{ marginTop: 40 }}>
                            {captions.map((text, index) => (


                                <View key={index} style={styles.word}>
                                    <Image
                                        source={require("@/assets/images/create_card/volume.png")}
                                    />
                                    <Text
                                        style={{ color: "#000000", fontFamily: "Bold" }}
                                        onLayout={(event) => {
                                            const { x, y } = event.nativeEvent.layout;
                                            setTooltipPosition({ x, y });
                                        }}
                                        onPress={() => {
                                            setSelectedWord1(text);
                                            setSelectedWord2("Test nha")
                                            setShowTooltip(true);
                                        }}
                                    >
                                        {text}
                                    </Text>
                                </View>

                            ))}
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => {
                            router.replace("/(create_card)/create-collection");
                        }}
                    >
                        <Image
                            source={require("@/assets/images/create_card/plus.png")}
                            style={{
                                position: "absolute",
                                bottom: -10,
                                right: -10,
                            }}
                        />
                    </TouchableOpacity>
                </>
            )}




            {/* Show popup */}


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
                        <Text style={{ fontSize: 16, fontFamily: "Regular", marginLeft: 15, paddingRight: 15 }}>
                            {selectedWord1}
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
                        <Text style={{ fontSize: 12, fontFamily: "Regular", marginLeft: 15, paddingRight: 10 }}>
                            {selectedWord2}
                        </Text>
                        <TouchableOpacity onPress={() => { router.replace("/(tabs)/addcard") }}>
                            <Image
                                source={require("@/assets/images/create_card/plus.png")}
                                style={{ width: 50, height: 50, right: -70 }}
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