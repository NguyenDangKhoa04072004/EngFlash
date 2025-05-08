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
  {
    value: 20,
    color: '#87CEEB', // Light Sky Blue (cho "Đang ôn")
    label: '20%\nĐang ôn',
    labelStyle: { color: 'blue', fontSize: 12, textAlign: 'center' },
    labelLineColor: 'blue',
    labelLineStrokeDashArray: [4, 2], // Để tạo đường nối chấm chấm
  },
  {
    value: 35,
    color: '#FF69B4', // Hot Pink (cho "Đã học")
    label: '35%\nĐã học',
    labelStyle: { color: 'deeppink', fontSize: 12, textAlign: 'center' },
    labelLineColor: 'deeppink',
    labelLineStrokeDashArray: [4, 2],
  },
  {
    value: 10,
    color: '#FA8072', // Salmon (cho "Đã ôn")
    label: '10%\nĐã ôn',
    labelStyle: { color: 'red', fontSize: 12, textAlign: 'center' },
    labelLineColor: 'red',
    labelLineStrokeDashArray: [4, 2],
  },
  {
    value: 35,
    color: '#D3D3D3', // Light Grey (cho "Đang học")
    label: '35%\nĐang học',
    labelStyle: { color: 'black', fontSize: 12, textAlign: 'center' },
    labelLineColor: 'grey',
    labelLineStrokeDashArray: [4, 2],
  },
];

const centerLabelComponent = () => {
  return (
    <View style={styles.centerLabelContainer}>
      <Text style={styles.centerLabelTextLine1}>Tổng Số</Text>
      <Text style={styles.centerLabelTextLine1}>Bộ Từ</Text>
      <Text style={styles.centerLabelTextLine2}>20/20</Text>
    </View>
  );
};

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
        <PieChart
          data={dataPiechart}
          donut
          radius={110} // Điều chỉnh bán kính ngoài của biểu đồ
          innerRadius={70} // Điều chỉnh bán kính trong để tạo độ dày cho donut
          centerLabelComponent={centerLabelComponent}
          labelsPosition="outward" // Đặt nhãn bên ngoài các phần
          // labelRadius={130} // Tùy chọn: Khoảng cách của văn bản nhãn từ tâm.
          // Nếu lớn hơn 'radius', nhãn sẽ ở xa hơn.
          labelWidth={80}   // Chiều rộng của vùng chứa nhãn
          // labelTextLines={2} // Số dòng cho văn bản nhãn, '\n' thường tự xử lý
          strokeColor="white" // Màu của đường phân cách giữa các phần
          strokeWidth={4}     // Độ dày của đường phân cách
        // startAngle={-90} // Tùy chọn: Góc bắt đầu cho phần đầu tiên (ví dụ: -90 để bắt đầu từ đỉnh)
        // Điều chỉnh giá trị này để xoay biểu đồ cho khớp với hình ảnh
        // Optional styling for all labels, can be overridden by item's labelStyle
        // labelTextStyle={{fontSize: 12}}
        />
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
