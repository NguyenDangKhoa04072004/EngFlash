import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  deleteVocabulary: () => void;
}
export default function DeleteModal({
  visible,
  setVisible,
  deleteVocabulary,
}: Props) {
  const handleDelete = () => {
    deleteVocabulary();
    setVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.headingModal}>
            <View style={styles.trashWrapper}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={25}
                color="red"
              />
            </View>
            <Feather name="x" size={25} color="black" onPress={() => setVisible(false)}/>
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>Xoá thẻ</Text>
            <Text style={styles.content}>
              Bạn có chắc chắn muốn xóa Thẻ này không? Tác vụ này sẽ không thể
              khôi phục.
            </Text>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setVisible(false)}
              >
                <Text style={{ fontSize: 18, color: "black", fontWeight: 400 }}>
                  Huỷ
                </Text>
              </Pressable>
              <Pressable style={styles.deleteBtn} onPress={handleDelete}>
                <Text style={{ fontSize: 18, color: "white", fontWeight: 400 }}>
                  Xoá
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    height: 270,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  headingModal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trashWrapper: {
    width: 55,
    height: 55,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "#FEE2E2",
  },
  contentWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    display: "flex",
    gap: 10,
  },
  title: {
    fontSize: 20,
  },
  content: {
    fontWeight: 200,
    fontSize: 17,
  },
  buttonWrapper: {
    paddingTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DBEAFA",
    borderRadius: 8,
  },
  deleteBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#B91C1C",
    borderWidth: 1,
    borderColor: "#B91C1C",
    borderRadius: 8,
  },
});
