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

const LoginScreen = () => {
  const router = useRouter();
  const [secureText1, setSecureText1] = useState(true);
  const [secureText2, setSecureText2] = useState(true);

  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: "#FFFF", }}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 128, height: 128, marginBottom: -20, marginTop: 10 }}
      />
      <Text style={styles.title0}>Hello</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFF",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title0: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
});

export default LoginScreen;
