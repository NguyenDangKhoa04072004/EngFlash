import { StyleSheet, View, Text } from "react-native";

export default function FlashCard(){
    return (
        <View style={styles.container}>
            <Text>Hello World LALALALA</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width: '100%',
        height:'80%',
        borderRadius:10
    }
})