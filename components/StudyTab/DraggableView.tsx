import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";



interface vocabulary{
    word: string;
    meaning: string,
    sentence: string,
}
interface Props {
  vocabularies: vocabulary[];
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  setVocabularies: React.Dispatch<React.SetStateAction<vocabulary[]>>;
  dragLeft: React.Dispatch<React.SetStateAction<boolean>>;
  dragRight: React.Dispatch<React.SetStateAction<boolean>>;
  dragDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DraggableView({
  dragLeft,
  dragRight,
  dragDelete,
  vocabularies,
  setVocabularies,
  showModal
}: Props) {
  const [showMeaning, setShowMeaning] = useState<boolean>(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      opacity.value = 1 - Math.abs(translateX.value) / 300;
      rotate.value = -translateX.value / 18;
      if (translateY.value + event.changeY > 0) {
        translateY.value += event.changeY;
      }

      if (translateX.value < -150 && translateY.value < 200) {
        runOnJS(dragLeft)(true);
      } else if (translateX.value > 150 && translateY.value < 200) {
        runOnJS(dragRight)(true);
      } else {
        runOnJS(dragLeft)(false);
        runOnJS(dragRight)(false);
      }

      if (
        !(translateX.value < -150 || translateX.value > 150) &&
        translateY.value > 200
      ) {
        runOnJS(dragDelete)(true);
      } else {
        runOnJS(dragDelete)(false);
      }
    })
    .onEnd(() => {
      if (
        (translateX.value < -150 || translateX.value > 150) &&
        translateY.value < 200
      ) {
        runOnJS(setVocabularies)(vocabularies.slice(1));
        runOnJS(setShowMeaning)(false)
      }

      if (
        !(translateX.value < -150 || translateX.value > 150) &&
        translateY.value > 200
      ) {
        runOnJS(showModal)(true);
        runOnJS(setShowMeaning)(false)
      }

      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
      opacity.value = 1;
      runOnJS(dragLeft)(false);
      runOnJS(dragRight)(false);
      runOnJS(dragDelete)(false);
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(setShowMeaning)(!showMeaning);
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

  const cardStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
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
                    zIndex: vocabularies.length - index,
                    display: "flex",
                    alignItems: "center",
                  },
                ]}
              >
                <GestureDetector gesture={doubleTap}>
                  <Animated.View style={[styles.card, cardStyle]} key={index}>
                    <Animated.View style={[successStyle, styles.success]}>
                      <Text style={styles.successTitle}>Got it !</Text>
                    </Animated.View>
                    <Animated.View style={[dangerStyle, styles.danger]}>
                      <Text style={styles.dangerTitle}>Learn again!</Text>
                    </Animated.View>
                    <View style={styles.contentWrapper}>
                      <Feather name="volume-2" size={24} color="blue" />
                      <Text style={styles.vocabulary}>{vocabulary.word}</Text>
                    </View>
                    {showMeaning && (
                      <>
                        <View>
                          <Text style={styles.meaning}>
                            {vocabulary.meaning}
                          </Text>
                        </View>
                        <View style={styles.horizontalBar} />
                        <View style={styles.sentenceWrapper}>
                          <Feather name="volume-2" size={24} color="blue" />
                          <Text style={styles.sentence}>
                            {vocabulary.sentence}
                          </Text>
                        </View>
                      </>
                    )}
                  </Animated.View>
                </GestureDetector>
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
                zIndex: vocabularies.length - index,
                display: "flex",
                alignItems: "center",
              }}
            >
              <View style={styles.cardBottom} key={index}>
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
  cardBottom: {
    backgroundColor: "white",
    width: "80%",
    height: "100%",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  card: {
    backgroundColor: "white",
    width: "80%",
    height: "100%",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  horizontalBar: {
    width: "80%",
    borderWidth: 0.5,
    borderColor: "#D4D4D4",
  },
  sentenceWrapper: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  sentence: {
    fontSize: 18,
    textAlign: "center",
    color: "#15803D",
  },
  meaning: {
    fontSize: 30,
    fontWeight: 300,
  },
  vocabulary: {
    fontSize: 28,
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
