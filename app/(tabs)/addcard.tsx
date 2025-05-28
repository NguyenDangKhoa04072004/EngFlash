import React, { useEffect, useState } from "react";
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
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalFail, setShowModalFail] = useState(false)
  const [data, setData] = useState([{ label: "", value: 0 }])

  const [english, setEnglish] = useState("");
  const [vietnam, setVietNam] = useState("");
  const [example, setExample] = useState("");
  const [topicId, setTopicId] = useState(null);

  useEffect(() => {
    setLoading(true)
    const getTopics = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      try {
        const response = await fetch(
          "https://engflash-system-ngk.onrender.com/topics",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            }
          }
        );

        if (response.ok) {
          const responseData = await response.json()
          setData(
            responseData.topics.map(topic => ({
              label: topic.topic_name,
              value: topic.topic_id
            }))
          );
          setLoading(false);
        } else {
          setLoading(false);
          console.log("Không thể lấy topic");
        }
      } catch (error) {
        setLoading(false);
        console.log("Gặp lỗi khi lấy topic");
      }
    }
    getTopics()
  }, [])


  const handleSubmit = async () => {
    setLoading(true);
    if (topicId == null) {
      setShowModalFail(true)
      setLoading(false)
      return
    }
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "https://engflash-system-ngk.onrender.com/cards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            front_text: english,
            back_text: vietnam,
            example: example,
            topic_id: topicId,
          }),
        }
      );

      if (response.ok) {
        setLoading(false);
        setShowModal(true);
      } else {
        setLoading(false);
        console.log("Không thể thêm thẻ" + topicId + " " + english + " " + vietnam + " " + example)
        setShowModalFail(true)
      }
    } catch (error) {
      setLoading(false);
      setShowModalFail(true)
      console.log("Gặp lỗi thêm thẻ" + english);
    }
  };

  if (loading) return <LoadingScreen />;
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: "#FFFF" }}
    >
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 128, height: 128, marginBottom: -20, marginTop: 0 }}
      />
      <Text style={styles.title}>Tạo thẻ mới</Text>

      <View style={styles.containerInput}>
        <Text style={styles.label}>English</Text>
        <TextInput
          style={styles.input}
          value={english}
          onChangeText={setEnglish}
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Vietnamese</Text>
        <TextInput
          style={styles.input}
          value={vietnam}
          onChangeText={setVietNam}
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Ví dụ sử dụng</Text>
        <TextInput
          style={styles.input}
          value={example}
          onChangeText={setExample}
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Collection (Tùy chọn)</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          value={topicId}
          onChange={(item) => setTopicId(item.value)}
        />
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
          backgroundColor: "#DB2777",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          marginBottom: 15,
        }}
        onPress={() => handleSubmit()}
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

      {/* Modal Alert */}
      <SuccessModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        type={"success"}
        title={"Tạo thẻ thành công!"}
        message={""}
      />
      <SuccessModal
        visible={showModalFail}
        onClose={() => setShowModalFail(false)}
        type={"fail"}
        title={"Tạo thẻ thất bại!"}
        message={""}
      />

      <TouchableOpacity
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          height: 70,
          paddingHorizontal: 15,
          backgroundColor: "#FFFFFF", // cần thiết để thấy bóng
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,

          // iOS shadow
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          // Android shadow
          elevation: 4,
        }}
        onPress={() => {
          router.replace("/(create_card)/create-card-video");
        }}
      >
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: 16,
            lineHeight: 24,
            color: "#1D4ED8",
            flex: 1,
          }}
        >
          Tạo từ video ngắn
        </Text>
        <Image
          source={require("@/assets/images/navigation/create-from-video.png")}
          style={{ width: 28, height: 21, marginLeft: "auto" }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFF",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Bold",
    lineHeight: 40,
    color: "#000",
    marginBottom: 20,
    alignSelf: "flex-start",
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
  },
  dropdown: {
    marginTop: 8,
    height: 50,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  AI: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default AddCard;
