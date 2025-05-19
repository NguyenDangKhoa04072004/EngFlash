import DraggableView from "@/components/StudyTab/DraggableView";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

export default function StudyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.header}>Clothes - Học tập</Text>
      </View>
      <DraggableView />
      <Button title={"+"} buttonStyle={styles.addBtn} containerStyle={styles.btnCotainer}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEE2E2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  heading: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
  },
  footer:{
    padding:20,
    display:'flex',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  btnCotainer:{
    position:'relative',
    top:30,
    left:150
  },
  addBtn:{
    borderRadius:'50%',
    backgroundColor:'#DB2777',
    width:40,
    height:40,
  }
});
