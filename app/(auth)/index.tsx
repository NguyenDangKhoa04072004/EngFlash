import { View, Text, StyleSheet, Image } from "react-native";
import LogoImage from "@/assets/images/logo.png";
import { Button } from "react-native-elements";
import { useRouter } from "expo-router";

export default function AuthPage() {
    const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bắt đầu đồng hành cùng EngFlash</Text>
      <Image source={LogoImage} />
      <View style={styles.btnWrapper}>
        <Button
          title={"Đăng nhập"}
          buttonStyle={{ ...styles.btn, backgroundColor: "#EC4899" }}
          titleStyle={{fontWeight:600}}
          onPress={() => router.replace("/(auth)/login")}
        />
        <Button
          title={"Đăng ký"}
          buttonStyle={{
            ...styles.btn,
            backgroundColor: "white",
            borderColor: "#EE56E3",
            borderWidth: 1,
          }}
          titleStyle={{ color: "#EE56E3", fontWeight:600 }}
          onPress={() => router.replace("/(auth)/signup")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 30,
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: 700,
  },
  btnWrapper: {
    display: "flex",
    width: "100%",
    gap: 20,
  },
  btn: {
    width: "100%",
    borderRadius: 30,
    paddingVertical: 15,
  },
});
