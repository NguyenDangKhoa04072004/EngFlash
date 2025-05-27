import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "@/components/LoadingScreen";
//Import thư viện biểu đồ
import {
  BarChart,
  LineChart,
  PieChart,
} from "react-native-gifted-charts";

// Khai báo dữ liệu
const dataBarchart1 = [
  { value: 45, label: "Week 1", frontColor: "#FFD601" },
  { value: 39, label: "Week 2", frontColor: "#FFD601" },
  { value: 61, label: "Week 3", frontColor: "#FFD601" },
];

const CenterLabelComponent = ({ totalCard }: { totalCard: number }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: "Regular", fontSize: 10 }}>Tổng Số</Text>
      <Text style={{ fontFamily: "Regular", fontSize: 10, marginBottom: 10 }}>
        Bộ Từ
      </Text>
      <Text style={{ fontFamily: "Regular", fontSize: 11.4 }}>
        {totalCard}/{totalCard}
      </Text>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width; //Lấy chiều dài màn hình




export default function Productivity() {
  //Khai báo Hook
  const [loading, setLoading] = useState(false)
  const [streak, setStreak] = useState(0); // ✅ đặt ở đây
  const [totalCard, setTotalCard] = useState(0);
  const [masterCard, setMasterCard] = useState(0);
  const [dataPiechart, setDataPiechart] = useState([
    {
      value: 25,
      color: "#F472B6", // Hot Pink (cho "Đã học")
    },
    {
      value: 25,
      color: "#F87171", // Salmon (cho "Đã ôn")
    },
    {
      value: 25,
      color: "#D4D4D4", // Light Grey (cho "Đang học")
    },
    {
      value: 25,
      color: "#93C5FD", // Light Sky Blue (cho "Đang ôn")
    },
  ]);
  const [percent, setPercent] = useState({
    not_started: 0,
    learning: 0,
    learned: 0,
    mastered: 0,
  });
  const [dataLinechart, setDataLineChart] = useState([
    { value: 2, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 2, label: "Wed" },
    { value: 2, label: "Thu" },
    { value: 2, label: "Fri" },
    { value: 2, label: "Sat" },
    { value: 2, label: "Sun" },
  ]);
  const [dataBarchart2, setDataBarchart2] = useState([
    {
      value: 5,
      label: "Last 4",
      frontColor: "#2563EB",
    },
    {
      value: 5,
      label: "Last 3",
      frontColor: "#93C5FD",
    },
    {
      value: 5,
      label: "Last 2",
      frontColor: "#FACC15",
    },
    {
      value: 5,
      label: "Last 1",
      frontColor: "#F87171",
    },
    {
      value: 5,
      label: "Today",
      frontColor: "#DC2626",
    },
  ]);
  // Kết thúc khai báo

  //Chạy gọi API ngay khi màn hình render
  useEffect(() => {
    const getStreak = async () => {
      setLoading(true)
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        // Call API
        const response1 = await fetch(
          "https://engflash-system-ngk.onrender.com/statistics/streak",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const response2 = await fetch(
          "https://engflash-system-ngk.onrender.com/statistics/proficient-cards",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const response3 = await fetch(
          "https://engflash-system-ngk.onrender.com/statistics/learning-status",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const response4 = await fetch(
          "https://engflash-system-ngk.onrender.com/statistics/weekly-and-5days",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        //Xử lý sau gọi API

        if (response1.ok) {
          const data = await response1.json();
          setStreak(data.streak); // ✅ gán đúng giá trị từ response
        } else {
          console.log("Không lấy được streak" + { accessToken });
        }
        if (response2.ok) {
          const data = await response2.json();
          setTotalCard(data.total_cards); // ✅ gán đúng giá trị từ response
          setMasterCard(data.mastered_cards);
        } else {
          console.log("Không lấy được Total Cards");
        }
        if (response3.ok) {
          const data = await response3.json();
          const not_started = Number(data.not_started);
          const learning = Number(data.learning);
          const learned = Number(data.learned);
          const mastered = Number(data.mastered);
          const total_card = not_started + learning + learned + mastered || 1;
          setPercent({
            not_started: Math.round((not_started / total_card) * 100),
            learning: Math.round((learning / total_card) * 100),
            learned: Math.round((learned / total_card) * 100),
            mastered: Math.round((mastered / total_card) * 100),
          });
          const dataDonut = [
            {
              value: Math.round((learned / total_card) * 100),
              color: "#F472B6", // Hot Pink (cho "Đã học")
            },
            {
              value: Math.round((mastered / total_card) * 100),
              color: "#F87171", // Salmon (cho "Đã ôn")
            },
            {
              value: Math.round((learning / total_card) * 100),
              color: "#D4D4D4", // Light Grey (cho "Đang học")
            },
            {
              value: Math.round((not_started / total_card) * 100),
              color: "#93C5FD", // Light Sky Blue (cho "Đang ôn")
            },
          ];
          setDataPiechart(dataDonut);
        } else {
          console.log("Không lấy được Leardning Status");
        }
        if (response4.ok) {
          const data = await response4.json();
          setDataLineChart([
            { value: data.thisWeekStats[0].count, label: "Mon" },
            { value: data.thisWeekStats[1].count, label: "Tue" },
            { value: data.thisWeekStats[2].count, label: "Wed" },
            { value: data.thisWeekStats[3].count, label: "Thu" },
            { value: data.thisWeekStats[4].count, label: "Fri" },
            { value: data.thisWeekStats[5].count, label: "Sat" },
            { value: data.thisWeekStats[6].count, label: "Sun" },
          ]);

          setDataBarchart2([
            {
              value: data.last5DaysStats[0].count,
              label: "Last 4",
              frontColor: "#2563EB",
            },
            {
              value: data.last5DaysStats[1].count,
              label: "Last 3",
              frontColor: "#93C5FD",
            },
            {
              value: data.last5DaysStats[2].count,
              label: "Last 2",
              frontColor: "#FACC15",
            },
            {
              value: data.last5DaysStats[3].count,
              label: "Last 1",
              frontColor: "#F87171",
            },
            {
              value: data.last5DaysStats[4].count,
              label: "Today",
              frontColor: "#DC2626",
            },
          ]);
        } else {
          console.log("Không lấy giá trị của tuần này và 5 ngày gần đây");
        }
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu:", error);
      }
      setLoading(false)
    };

    getStreak(); // ✅ gọi khi component mount
  }, []);



  if (loading) return <LoadingScreen />
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
          {streak}{" "}
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
            {totalCard}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={{ fontFamily: "Bold", fontSize: 20, marginTop: 18 }}>
            Thành thạo
          </Text>
          <Text style={{ fontFamily: "Bold", fontSize: 24, color: "#006BFF" }}>
            {masterCard}
          </Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={dataLinechart}
          width={265}
          spacing={40}
          xAxisLabelTextStyle={{
            fontSize: 14,
            fontFamily: "Semibold",
            textAlign: "center",
          }}
          rotateLabel
          noOfSections={4}
          height={180}
        />
      </View>
      <Text style={styles.label}>Tuần vừa qua</Text>

      <View style={styles.chartContainer}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 10, fontFamily: "Regular", color: "#93C5FD" }}
            >
              {"    "}
              {percent.not_started}%{"\n"}Đang ôn
            </Text>
            <Text
              style={{ fontSize: 10, fontFamily: "Regular", color: "#D4D4D4" }}
            >
              {"    "}
              {percent.learning}%{"\n"}Đang học
            </Text>
          </View>
          <PieChart
            data={dataPiechart}
            donut
            radius={110}
            innerRadius={70}
            centerLabelComponent={() => (
              <CenterLabelComponent totalCard={Number(totalCard)} />
            )}
            labelsPosition="outward"
            strokeColor="white"
            strokeWidth={4}
            showTextBackground
          />
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text
              style={{ fontSize: 10, fontFamily: "Regular", color: "#F472B6" }}
            >
              {"    "}
              {percent.learned}%{"\n"}Đã học
            </Text>
            <Text
              style={{ fontSize: 10, fontFamily: "Regular", color: "#F87171" }}
            >
              {"    "}
              {percent.mastered}%{"\n"}Đã ôn
            </Text>
          </View>
        </View>
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
            color: "#828282", // màu xám cho nhãn trục x
            fontSize: 10,
          }}
          yAxisTextStyle={{
            color: "#828282", // màu xám cho nhãn trục y
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
