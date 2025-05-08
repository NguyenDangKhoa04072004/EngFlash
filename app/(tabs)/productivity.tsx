import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//Import thư viện biểu đồ
import { BarChart, LineChart } from "react-native-gifted-charts";


// Khai báo dữ liệu
const data = [
  { value: 45, label: "Week 1", frontColor: "#FFD601" },
  { value: 39, label: "Week 2", frontColor: "#FFD601" },
  { value: 61, label: "Week 3", frontColor: "#FFD601" },
];

const screenWidth = Dimensions.get("window").width; //Lấy chiều dài màn hình


export default function Productivity() {
  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Semibold",
          }}
        >
          Chuỗi hiện tại :{"  "}
        </Text>
        <Text
          style={{
            color: "#FFAF00",
            fontSize: 14,
            fontFamily: "Semibold",
          }}
        >
          20{" "}
        </Text>
        <Image
          source={require("@/assets/images/productivity/trophy-star.png")}
          style={{ marginBottom: 5 }}
        />
      </View>


      {/* Sơ đồ 1 */}
      <View style={styles.chartContainer}>
        <BarChart
          width={220}
          height={170}
          xAxisThickness={1}
          xAxisLabelTextStyle={{ fontSize: 14, width: 50, textAlign: 'center' }}
          rotateLabel
          barWidth={12}
          spacing={60}
          noOfSections={3}
          barBorderRadius={10}
          data={data}
        />
      </View>

      <View style={styles.cellContainer}>
        <View style={styles.cell}>
          <Text style={{ fontFamily: "Bold", fontSize: 20, marginTop: 18 }}>
            Số thẻ
          </Text>
          <Text style={{ fontFamily: "Bold", fontSize: 24, color: "#2C6E35" }}>
            273
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={{ fontFamily: "Bold", fontSize: 20, marginTop: 18 }}>
            Thành thạo
          </Text>
          <Text style={{ fontFamily: "Bold", fontSize: 24, color: "#006BFF" }}>
            50
          </Text>
        </View>
      </View>

      <View style={styles.chartContainer}></View>
      <Text style={styles.label}>Tuần vừa qua</Text>


      <View style={styles.chartContainer}></View>
      <Text style={styles.label}>Thống kê theo bộ từ</Text>


      <View style={styles.chartContainer}></View>
      <Text style={styles.label}>5 ngày gần nhất</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 30,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  chartContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    width: "100%",
    height: 250,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    overflow: 'hidden'
  },
  cellContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  cell: {
    width: 125,
    height: 83,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    fontFamily: "Bold",
    fontSize: 20,
    marginTop: -20,
    marginBottom: 50,
  },
});
