import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getUserNotRegisteredById } from '../api/api';
import moment from 'moment';

export default function ProfileDetailScreen({ navigation, route }) {
const { user } = route.params;
console.log('Thông tin:', user); // Kiểm tra thông tin người dùng
const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);
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
      console.log('Thông tin người dùng:', userData); // Kiểm tra dữ liệu người dùng
      if (loading || !userData) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Đang tải thông tin người dùng...</Text>
    </View>
  );
}
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll}>
        {/* Avatar + Name */}
        <View style={styles.userInfo}>
          <Image source={{ uri: userData.Anh }} style={styles.avatar} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.phone}>{userData.phone}</Text>
          </View>
        </View>

        {/* Trạng thái */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Trạng thái tài khoản</Text>
          <Text style={styles.statusText}>Đã xác nhận</Text>
        </View>

        {/* Thông tin định danh */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin định danh</Text>
          {renderItem('MSSV', userData.TenDangNhap)}
          {renderItem('Họ và tên', userData.Username)}
          {renderItem('Giới tính', userData.GioiTinh)}
          {renderItem('Ngày sinh', moment(userData.NgaySinh).format('DD/MM/YYYY'))}
          {renderItem('CCCD', userData.Cccd)}
          {renderItem('Ngành', userData.Nganh)}
          {renderItem('Lớp', userData.Lop)}
        </View>

        {/* Thông tin bổ sung */}
        <View style={styles.section}>
          <View style={styles.supplementHeader}>
            <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
          </View>
          {renderItem('Email', userData.Email)}
          {renderItem('Địa chỉ', userData.DiaChi)}
        </View>
      </ScrollView>
    </View>
  );
}

const renderItem = (label, value) => (
  <View style={styles.itemRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1565C0',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scroll: {
    padding: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusText: {
    color: '#4CAF50',
    fontWeight: '500',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
  supplementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updateLink: {
    color: '#1565C0',
    fontSize: 14,
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#444',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    maxWidth: '60%',
    textAlign: 'right',
  },
});
