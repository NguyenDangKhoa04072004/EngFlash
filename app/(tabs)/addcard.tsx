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

const AddCard = () => {
  const router = useRouter();
  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const data = [
    { label: "Danh từ", value: "noun" },
    { label: "Động từ", value: "verb" },
    { label: "Tính từ", value: "adj" },
  ];

  const [wordType, setWordType] = useState(null);

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
        <TextInput style={styles.input} />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Vietnamese</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Ví dụ sử dụng</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Collection (Tùy chọn)</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          value={wordType}
          onChange={(item) => setWordType(item.value)}
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
        onPress={() => setShowModal(true)}
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
      <SuccessModal visible={showModal} onClose={() => setShowModal(false)} type={"success"} title={"Tạo thẻ thành công!"} message={""} />

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
