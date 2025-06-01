import DraggableView from "@/components/DraggableView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DeleteModal from "@/components/DeleteModal";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "@/services";
import { Card } from "@/interface/card";
import LoadingScreen from "@/components/LoadingScreen";

export default function StudyScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [topicName, setTopicName] = useState("")
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`topics/${id}/cards`);
        setCards(res.data.cards);
        setTopicName(res.data.topic.topic_name)
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  const [onDragRight, setOnDragRight] = useState<boolean>(false);
  const [onDragLeft, setOnDragLeft] = useState<boolean>(false);
  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleLearningCard = async (
    card_id: number,
    rating: "again" | "good"
  ) => {
    try {
      setCards(cards.slice(1));
      const res = await api.post("cards/learn", {
        card_id,
        rating,
      });
      if (res.status !== 201) {
        const [firstCard, ...restCard] = cards;
        setCards([...restCard, firstCard]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteCard = async (card_id: number) => {
    setIsLoading(true)
    try {
      const res = await api.delete(`cards/${card_id}`);
      if (res.status === 200) {
        setCards(cards.slice(1));
        setIsLoading(false)
      } else {
        const [firstCard, ...restCard] = cards;
        setCards([...restCard, firstCard]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isloading) return <LoadingScreen />;

  return (
    <View
      style={{
        ...styles.container,
        borderRightWidth: onDragRight ? 5 : 0,
        borderRightColor: onDragRight ? "#15803D" : "none",
        borderLeftWidth: onDragLeft ? 5 : 0,
        borderLeftColor: onDragLeft ? "#DC2626" : "none",
      }}
    >
      <DeleteModal
        visible={showModal}
        setVisible={setShowModal}
        deleteVocabulary={() => handleDeleteCard(cards[0]?.card_id)}
      />
      <View style={styles.heading}>
        <MaterialIcons
          name="navigate-before"
          size={35}
          color="black"
          style={{ position: "absolute", left: 30 }}
          onPress={() => router.replace("/(tabs)")}
        />
        <Text style={styles.header}>{topicName}</Text>
      </View>
      <DraggableView
        dragLeft={setOnDragLeft}
        dragRight={setOnDragRight}
        dragDelete={setOnDelete}
        showModal={setShowModal}
        vocabularies={cards}
        setVocabularies={setCards}
        learnCard={handleLearningCard}
      />
      <Button
        title={"+"}
        buttonStyle={styles.addBtn}
        containerStyle={styles.btnCotainer}
      />
      {onDelete && (
        <View style={styles.deletingWrapper}>
          <FontAwesome name="trash" size={24} color="red" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEE2E2",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  heading: {
    width: "100%",
    padding: 20,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
  },
  footer: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  btnCotainer: {
    position: "relative",
    zIndex: 1000,
    top: 30,
    left: 150,
  },
  addBtn: {
    borderRadius: "50%",
    backgroundColor: "#DB2777",
    width: 40,
    height: 40,
  },
  deletingWrapper: {
    padding: 20,
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    position: "relative",
    zIndex: 1000,
    borderRadius: "50%",
  },
});
