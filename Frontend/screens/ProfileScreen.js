import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { getUserNotRegisteredById } from '../api/api';
import { Alert } from 'react-native'; 
import { useEffect, useState } from 'react';
import {  Linking } from 'react-native';

export default function ProfileScreen({navigation,  route }) {
  const { user } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
    console.log('Thông tin người dùng:', user); 
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const res = await getUserNotRegisteredById(user.TenDangNhap);
            console.log('API response:', res);
            if (res.success) {
              setUserData(res.user);
            } else {
              Alert.alert('Lỗi', res.message || 'Không thể lấy thông tin người dùng');
            }
          } catch (error) {
            console.error('Lỗi:', error);
            Alert.alert('Lỗi', 'Không thể kết nối đến server');
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, [user.TenDangNhap]);
    const CheckHopDong = async () => {
        try {
          const res = await getUserNotRegisteredById(user.TenDangNhap);
          if (res.success) {
            const user = res.user;
            console.log('Thông tin người dùng:', user.Role);
      
            // Kiểm tra role và điều hướng
            if (String(user.Role) === '0') {
              // Người dùng chưa đăng ký
              navigation.navigate('UnRegistered', { user });
            } else if (String(user.Role) === '1') {
              // Người dùng đã đăng ký
              navigation.navigate('Registered', { user });
            } else {
              Alert.alert('Lỗi', 'Role không hợp lệ');
            }
          } else {
            Alert.alert('Đăng nhập thất bại', res.message || 'Sai thông tin đăng nhập');
          }
        } catch (error) {
          console.error('Lỗi đăng nhập:', error);
          Alert.alert('Lỗi server', 'Không thể kết nối đến server');
        }
      };
      const handleCall = () => {
  Alert.alert(
    'Liên hệ quản lý',
    'Gọi tới số điện thoại: 098374729',
    [
      {
        text: 'Hủy bỏ',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          Linking.openURL('tel:098374729');
        },
      },
    ],
    { cancelable: false }
  );
};
if (loading || !userData) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1565C0" barStyle="light-content" />
      <Text>Đang tải thông tin người dùng...</Text>
    </View>
  );
}
console.log('Thông tin người dùng:', userData);
  return (
<View style={styles.container}>
  <StatusBar backgroundColor="#1565C0" barStyle="light-content" />

  {/* Nội dung bên trên */}
  <View style={styles.content}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Hồ sơ</Text>
    </View>

    <View style={styles.userInfoCard}>
      <Image 
        source={{ uri: userData.Anh }} 
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userData.Username}</Text>
        <Text style={styles.userPhone}>{userData.Sdt}</Text>
        <View style={styles.verificationBadge}>
          <Text style={styles.verificationText}>Đã xác nhận</Text>
        </View>
      </View>
    </View>

    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileDetail', { user: userData })}>
        <View style={styles.menuIconContainer}>
        <Ionicons name="person-outline" size={24} color="#FF5722" />
        </View>
        <Text style={styles.menuTitle}>Thông tin cá nhân</Text>
        <View style={styles.menuRightIcon}>
        <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChangePassword', { user })}>
        <View style={styles.menuIconContainer}>
        <Feather name="lock" size={24} color="#2196F3" />
        </View>
        <Text style={styles.menuTitle}>Đổi mật khẩu</Text>
        <View style={styles.menuRightIcon}>
        <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings', { user })}>
        <View style={styles.menuIconContainer}>
        <Ionicons name="settings-outline" size={24} color="#FFC107" />
        </View>
        <Text style={styles.menuTitle}>Cài đặt</Text>
        <View style={styles.menuRightIcon}>
        <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
    </TouchableOpacity>

    <TouchableOpacity
  style={styles.menuItem}
  onPress={() => {
    Alert.alert(
      'Đăng xuất',
      'Bạn chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy bỏ',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  }}
>
  <View style={styles.menuIconContainer}>
    <AntDesign name="logout" size={24} color="#4CAF50" />
  </View>
  <Text style={styles.menuTitle}>Đăng xuất</Text>
  <View style={styles.menuRightIcon}>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </View>
</TouchableOpacity>


<TouchableOpacity
  style={styles.menuItem}
  onPress={handleCall}
>
  <View style={styles.menuIconContainer}>
        <MaterialIcons name="support-agent" size={24} color="#9C27B0" />
  </View>
  <Text style={styles.menuTitle}>Liên hệ bạn quản lý</Text>
  <View style={styles.menuRightIcon}>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </View>
</TouchableOpacity>


    </View>
  </View>

  {/* NavBar ở dưới */}
  <View style={styles.navBar}>
    <TouchableOpacity onPress={() => CheckHopDong()}>
      <Text style={styles.navIcon}>🏠</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('HomeBill', {user})}>
      <Text style={styles.navIcon}>📄</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile', {user})}>
      <Text style={styles.navIcon}>👤</Text>
    </TouchableOpacity>
  </View>
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',

  },
  header: {
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfoCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  verificationBadge: {
    backgroundColor: '#e6f7ed',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  verificationText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  menuRightIcon: {
    width: 20,
  },
  navBar: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderTopColor: '#ccc',
  backgroundColor: '#fff',
  position: 'absolute',
  bottom: 10,
  left: 0,
  right: 0,
},
  navIcon: {
    fontSize: 26,
  },
  tabItemActive: {
    borderTopWidth: 3,
    borderTopColor: '#1976D2',
  },
});