import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import TopicCard from "@/components/TopicCard";
import { useEffect, useState } from "react";
import api from "@/services";
import LoadingScreen from "@/components/LoadingScreen";

interface Topic {
  topic_id: number;
  topic_name: string;
  topic_description: string;
  is_default: boolean;
}

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function HomeScreen() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("topics");
        setTopics(res.data.topics);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.pause();
  });

  if(isloading) return <LoadingScreen/>

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Học theo chủ đề</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topics.map((topic) => (
          <TopicCard
            key={topic.topic_id}
            id={topic.topic_id}
            title={topic.topic_name}
            description={topic.topic_description}
            color="#FCCFE8"
          />
        ))}
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
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
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
