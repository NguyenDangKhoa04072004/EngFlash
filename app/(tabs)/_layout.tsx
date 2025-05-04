import { Tabs } from 'expo-router';
import { View, Image } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#A01850',
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          position: 'absolute', // cần để tạo hiệu ứng bo cong
          overflow: 'hidden',   // rất quan trọng để bo góc có hiệu lực
        },
        tabBarActiveTintColor: '#FDFDFD',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Học tập',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/navigation/hoctap1.png')
                  : require('../../assets/images/navigation/hoctap.png')
              }
            />
          ),
        }}
      />
        <Tabs.Screen
            name='study'
            options={{
                href:null,
                tabBarStyle:{
                    display:'none'
                }
            }}
        >
        </Tabs.Screen>
      <Tabs.Screen
        name="productivity"
        options={{
          title: 'Năng suất',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/navigation/nangsuat1.png')
                  : require('../../assets/images/navigation/nangsuat.png')
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addcard"
        options={{
          title: 'Tạo thẻ',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/navigation/taothe1.png')
                  : require('../../assets/images/navigation/taothe.png')
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Thông báo',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/navigation/thongbao1.png')
                  : require('../../assets/images/navigation/thongbao.png')
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="other"
        options={{
          title: 'Khác',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/navigation/khac1.png')
                  : require('../../assets/images/navigation/khac.png')
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
