import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { navigate } from "expo-router/build/global-state/routing";
import FlashCard from "@/components/StudyTab/FlashCard";
import { Button } from "react-native-elements/dist/buttons/Button";
export default function StudyScreen() {
  return (
    <View style={styles.container}>
      <MaterialIcons
        onPress={() => navigate("/(tabs)")}
        name="navigate-before"
        size={40}
        color="#2A2A2A"
        style={styles.returnButton}
      />
      <View style={styles.title}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Clothes - Học tập
        </Text>
      </View>

      <View style={styles.cardWrapper}></View>
      <Button
        title={"+"}
        buttonStyle={{
          backgroundColor: "#DB2777",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        containerStyle={{
          position: "relative",
          bottom: -420,
          left: 330,
          width: 40,
          height: 50,
          borderRadius:'50%'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEE2E2",
    flex: 1,
  },
  title: {
    position: "relative",
    top: 30,
    width: "100%",
  },
  returnButton: {
    position: "relative",
    top: 68,
    left: 20,
  },
  cardWrapper: {
    position: "relative",
    width: "80%",
    height: 300,
    top: "30%",
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
});
