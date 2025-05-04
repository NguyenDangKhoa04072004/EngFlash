import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { navigate } from "expo-router/build/global-state/routing";
interface Props {
  title: string;
  description: string;
  color: string;
}

export default function TopicCard({ title, description, color }: Props) {
  return (
    <View style={{ ...styles.container, backgroundColor: color }}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={{ fontSize: 18 }}>Ôn tập</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.4)",
            width: 50,
            height: 100,
            position: "absolute",
            borderTopRightRadius: 20,
            top: 0,
            right: 0,
          }}
        />
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.4)",
            width: 100,
            height: 60,
            position: "absolute",
            borderTopRightRadius: 20,
            top: 0,
            right: 0,
          }}
        />
        <MaterialCommunityIcons
          onPress={() => navigate("/(tabs)/study")}
          name="arrow-right-box"
          size={40}
          color="black"
          style={{ position: "absolute", bottom: 15, right: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 210,
    height: 220,
    marginRight: 20,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
  },
  description: {
    fontSize: 18,
    fontWeight: 300,
  },
  contentWrapper: {
    flex: 2,
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },
  buttonWrapper: {
    flex: 1,
    position: "relative",
  },
});
