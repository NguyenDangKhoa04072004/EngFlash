import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//Import thư viện biểu đồ
import { BarChart, LineChart, PieChart, PieChartPro } from "react-native-gifted-charts";

// Khai báo dữ liệu
const dataBarchart1 = [
  { value: 45, label: "Week 1", frontColor: "#FFD601" },
  { value: 39, label: "Week 2", frontColor: "#FFD601" },
  { value: 61, label: "Week 3", frontColor: "#FFD601" },
];

const dataLinechart = [
  { value: 6, label: "Mon" },
  { value: 11, label: "Tue" },
  { value: 8, label: "Wed" },
  { value: 12, label: "Thu" },
  { value: 18, label: "Fri" },
  { value: 19, label: "Sat" },
  { value: 16, label: "Sun" },
];

const dataBarchart2 = [
  { value: 4, label: "Last 4", frontColor: "#2563EB" },
  { value: 8, label: "Last 3", frontColor: "#93C5FD" },
  { value: 12, label: "Last 2", frontColor: "#FACC15" },
  { value: 16, label: "Last 1", frontColor: "#F87171" },
  { value: 6, label: "Today", frontColor: "#DC2626" },
];

const dataPiechart = [
  { value: 10, label: "Mon" },
  { value: 20, label: "Tue" },
  { value: 30, label: "Wed" },
  { value: 40, label: "Thu" },
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
          xAxisLabelTextStyle={{ fontSize: 14, width: 50, textAlign: "center" }}
          rotateLabel
          barWidth={12}
          spacing={60}
          noOfSections={3}
          barBorderRadius={10}
          data={dataBarchart1}
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

      <View style={styles.chartContainer}>
        <LineChart
          data={dataLinechart}
          width={265}
          spacing={40}
          xAxisLabelTextStyle={{ fontSize: 14, fontFamily: 'Semibold', textAlign: "center" }}
          rotateLabel
          noOfSections={4}
          height={180}
        />
      </View>
      <Text style={styles.label}>Tuần vừa qua</Text>

      <View style={styles.chartContainer}>
        <PieChart data={dataPiechart} donut />
      </View>
      <Text style={styles.label}>Thống kê theo bộ từ</Text>

      <View style={styles.chartContainer}>
        <BarChart
          height={180}
          barBorderTopLeftRadius={8}
          barBorderTopRightRadius={8}
          noOfSections={9}
          data={dataBarchart2}
          isAnimated
          xAxisLabelTextStyle={{
            color: '#828282', // màu xám cho nhãn trục x
            fontSize: 10,
          }}
          yAxisTextStyle={{
            color: '#828282', // màu xám cho nhãn trục y
            fontSize: 10,
          }}
          yAxisColor="#828282" // màu xám cho đường trục Y
          xAxisColor="#828282" // màu xám cho đường trục X
        />
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
    overflow: "hidden",
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
