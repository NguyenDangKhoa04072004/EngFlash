import { useEvent } from "expo";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

import TopicCard from "@/components/StudyTab/TopicCard";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function HomeScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.pause();
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Học theo chủ đề</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TopicCard
          title="Clothes"
          description="Bộ sưu tập mặc định"
          color="#FCCFE8"
        />
        <TopicCard
          title="Clothes"
          description="Bộ sưu tập mặc định"
          color="#FCCFE8"
        />
        <TopicCard
          title="Clothes"
          description="Bộ sưu tập mặc định"
          color="#FCCFE8"
        />
      </ScrollView>
      <Text style={styles.title}>Học theo chủ đề</Text>
      <View style={styles.videoWrapper}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="fill"
        />
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            width: "100%",
            backgroundColor: "#FBCFE8",
            position: "absolute",
            bottom: 0,
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.25)'
          }}
        >
          <Text style={styles.videoTitle}>600 TỪ VỰNG TOEIC CƠ BẢN</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 30,
    marginBottom: 25,
    marginTop: 30,
  },
  videoWrapper: {
    height: 306,
    position: "relative",
  },
  video: {
    width: "100%",
    height: 250,
  },
  videoTitle: {
    fontSize: 18,
  },
});
