import DraggableView from "@/components/StudyTab/DraggableView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { navigate } from "expo-router/build/global-state/routing";
import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DeleteModal from "@/components/StudyTab/DeleteModal";


export default function StudyScreen() {
  const [vocabularies, setVocabularies] = useState([
    {
      word: "hello",
      meaning: "Xin chào",
      sentence: "Hello, Paul. I haven't seen you for ages.",
    },
    { word: "hi", meaning: "Xin chào", sentence: "Hi, how are you doing?" },
    {
      word: "clothes",
      meaning: "Quần áo",
      sentence: "She usually wears smart clothes.",
    },
    {
      word: "hot",
      meaning: "Nóng",
      sentence: "It's too hot in here, can we turn down the heating?",
    },
  ]);

  const [onDragRight, setOnDragRight] = useState<boolean>(false);
  const [onDragLeft, setOnDragLeft] = useState<boolean>(false);
  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
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
      <DeleteModal visible={showModal} setVisible={setShowModal} deleteVocabulary={() => setVocabularies(vocabularies.slice(1))}/>
      <View style={styles.heading}>
        <MaterialIcons
          name="navigate-before"
          size={35}
          color="black"
          style={{ position: "absolute", left: 30 }}
          onPress={() => navigate("/(tabs)")}
        />
        <Text style={styles.header}>Clothes - Học tập</Text>
      </View>
      <DraggableView
        dragLeft={setOnDragLeft}
        dragRight={setOnDragRight}
        dragDelete={setOnDelete}
        showModal={setShowModal}
        vocabularies={vocabularies}
        setVocabularies={setVocabularies}
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
