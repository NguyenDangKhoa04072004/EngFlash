import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//Import thư viện biểu đồ
import { BarChart } from "react-native-chart-kit";


// Khai báo dữ liệu
const data = {
  labels: ["Week 1", "Week 2", "Week 3"],
  datasets: [
    {
      data: [50, 40, 60] // Dữ liệu từ hình ảnh của bạn
    }
  ]
};


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
          data={data}
          width={350} // Điều chỉnh kích thước phù hợp
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 204, 0, ${opacity})`, // Màu vàng cho cột
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.5
          }}
          style={{ marginVertical: 8 }}
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
