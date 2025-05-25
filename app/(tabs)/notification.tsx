import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';

const notifications = [
  {
    id: 1,
    title: 'BỘ TỪ VỰNG CLOTHES',
    message: 'Bạn đã hoàn thành học tập!',
    active: false
  },
  {
    id: 2,
    title: 'BỘ TỪ VỰNG 600 TOEIC',
    message: 'Có cập nhật mới, học ngay!',
    active: true
  },
  {
    id: 3,
    title: '50 TỪ VỰNG VỀ IELTS',
    message: 'Có cập nhật mới, học ngay!',
    active: true
  },

];

export default function NotificationScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: '#fff' }}>
      <Text style={styles.header}>Danh sách thông báo</Text>

      {notifications.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardContent}>
            {/* Title - nằm riêng trên một dòng */}
            <Text style={styles.title}>{item.title}</Text>

            {/* Icon + Message trên cùng một hàng */}
            <View style={styles.row}>
              <Image
                source={require('../../assets/images/notification/trophy.png')}
                style={styles.icon}
              />
              <Text style={styles.message}>{item.message}</Text>
            </View>

            {item.active ?
              (<Pressable style={styles.button}>
                <Text style={styles.buttonText}>GO!</Text>
              </Pressable>) :
              (<Pressable style={[styles.button, { backgroundColor: '#ffff' }]} disabled={true}>
                <Text style={styles.buttonText}></Text>
              </Pressable>)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 90,
  },
  header: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: 12,
    padding: 12,
  },
  cardContent: {
    flexDirection: 'column', // đổi từ row → column
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 20,
    marginTop: 2,
  },
  message: {
    fontSize: 13,
    color: '#555',
    flexShrink: 1, // tránh tràn dòng
  },
  button: {
    height: 35,
    width: 102,
    backgroundColor: '#DB2777',
    borderRadius: 6,
    alignSelf: 'flex-end',
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center',     // Căn giữa theo chiều ngang
  },
  buttonText: {
    color: '#FDFDFD',
    fontWeight: 'bold',
  },
});
