import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    runOnUI,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

export default function DraggableView() {
  const [vocabularies, setVocabularies] = useState([
    { word: "hello" },
    { word: "hi" },
    { word: "clothes" },
    { word: "hot" },
  ]);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);


  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      rotate.value = -translateX.value / 18;

      if (translateY.value + event.changeY > 0) {
        translateY.value += event.changeY;
      }
    })
    .onEnd(() => {
      if (translateX.value < -150 || translateX.value > 150) {
        runOnJS(setVocabularies)(vocabularies.slice(1))
      }
      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
    });

  const successStyle = useAnimatedStyle(() => {
    return {
      display: translateX.value > 150 ? "flex" : "none",
    };
  });

  const dangerStyle = useAnimatedStyle(() => {
    return {
      display: translateX.value < -150 ? "flex" : "none",
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });
  return (
    <View style={styles.container}>
      {vocabularies.map((vocabulary, index) => {
        if (index === 0)
          return (
            <GestureDetector gesture={drag} key={index}>
              <Animated.View
                style={[
                  containerStyle,
                  {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 1000 - index,
                    display: "flex",
                    alignItems: "center",
                  },
                ]}
              >
                <View style={{ ...styles.card }} key={index}>
                  <Animated.View style={[successStyle, styles.success]}>
                    <Text style={styles.successTitle}>Got it !</Text>
                  </Animated.View>
                  <Animated.View style={[dangerStyle, styles.danger]}>
                    <Text style={styles.dangerTitle}>Learn again!</Text>
                  </Animated.View>
                  <Feather name="volume-2" size={24} color="blue" />
                  <Text style={styles.vocabulary}>{vocabulary.word}</Text>
                </View>
              </Animated.View>
            </GestureDetector>
          );
        else
          return (
            <View
              key={index}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1000 - index,
                display: "flex",
                alignItems: "center",
              }}
            >
              <View style={{ ...styles.card }} key={index}>
                <Feather name="volume-2" size={24} color="blue" />
                <Text style={styles.vocabulary}>{vocabulary.word}</Text>
              </View>
            </View>
          );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "75%",
  },
  card: {
    backgroundColor: "white",
    width: "80%",
    height: "100%",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  vocabulary: {
    fontSize: 25,
    fontWeight: 300,
  },
  success: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#15803D",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    top: 10,
    left: 10,
  },
  successTitle: {
    fontSize: 20,
    color: "#15803D",
    fontWeight: 400,
  },
  danger: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#DC2626",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    top: 10,
    right: 10,
  },
  dangerTitle: {
    fontSize: 20,
    color: "#DC2626",
    fontWeight: 400,
  },
});
