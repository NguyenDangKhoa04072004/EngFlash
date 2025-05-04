import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

const settings = [
  { icon: require('../../assets/images/other screen/account.png'), label: 'Tài khoản' },
  { icon: require('../../assets/images/other screen/notification.png'), label: 'Thông báo' },
  { separator: true },
  { icon: require('../../assets/images/other screen/language.png'), label: 'Ngôn ngữ' },
  { icon: require('../../assets/images/other screen/topic.png'), label: 'Chủ đề' },
  { separator: true },
  { icon: require('../../assets/images/other screen/export.png'), label: 'Xuất dữ liệu' },
  { icon: require('../../assets/images/other screen/sync.png'), label: 'Đồng bộ dữ liệu' },
  { separator: true },
  { icon: require('../../assets/images/other screen/help.png'), label: 'Trợ giúp' },
  { icon: require('../../assets/images/other screen/clause.png'), label: 'Điều khoản bảo mật' },
  { icon: require('../../assets/images/other screen/security.png'), label: 'Chính sách bảo mật' },
  { icon: require('../../assets/images/other screen/vote.png'), label: 'Đánh giá ứng dụng' },
  { icon: require('../../assets/images/other screen/intro.png'), label: 'Giới thiệu' },
  { separator: true },
];

export default function OtherScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Khác</Text>
      <View style={styles.scrollContainer}>
        {settings.map((item, index) => {
          if (item.separator) {
            return <View key={index} style={styles.separator} />;
          }
          return (
            <TouchableOpacity key={index} style={styles.row} onPress={() => {
              if (item.label === 'Thông báo') router.replace('/(tabs)/notification');
            }}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Đăng xuất */}
        <TouchableOpacity style={styles.logout} onPress={() => { router.replace('/(auth)/login') }}>
          <Image source={require('../../assets/images/other screen/logout.png')} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
        <View style={styles.end} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  icon: {
    tintColor: '#DB2777',
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    marginHorizontal: -24,
    height: 10,
    backgroundColor: '#D4D4D4',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  logoutIcon: {
    width: 20,
    height: 20,
    tintColor: '#DC2626',
    marginRight: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '500',
  },
  end: {
    marginHorizontal: -24,
    height: '100%',
    backgroundColor: '#D4D4D4',
  },
});
