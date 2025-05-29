import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getUserById } from '../api/api';

export default function RegisteredScreen({ route, navigation }) {
  const { user } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserById(user.TenDangNhap);
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

  if (loading) return <View style={styles.container}><Text>Đang tải dữ liệu...</Text></View>;
  if (!userData) return <View style={styles.container}><Text>Không tìm thấy thông tin</Text></View>;

  const paymentData = [
    { id: '1', name: 'Tiền nhà', value: `${userData.TienPhong} VND`, icon: '🏠', color: '#FFCDD2' },
    { id: '2', name: 'Tiền điện', value: '3.500đ/ KWh', icon: '⚡', color: '#FFEB3B' },
    { id: '3', name: 'Tiền nước', value: '20.000đ/ Khối', icon: '💧', color: '#B3E5FC' },
    { id: '4', name: 'Tiền rác', value: '25.000đ/ Tháng', icon: '✅', color: '#C8E6C9' },
  ];

  return (
    <View style={styles.container}>
      {/* Thông tin phòng */}
      <View style={styles.card}>
        <Text style={styles.title}>Ký túc xá Đại học Xây Dựng Hà Nội</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoText}>{userData.HoTen}</Text>
            <Text style={styles.infoText}>Phòng: {userData.MaPhong}</Text>
          </View>
          <View style={styles.infoColumnRight}>
            <Text style={styles.infoText}>Lớp: {userData.Lop}</Text>
            <Text style={styles.infoText}>Tầng: {userData.Tang}</Text>
          </View>
        </View>
      </View>

      {/* Nút chức năng */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Contracts', { user })}>
          <Text style={styles.icon}>📋</Text>
          <Text style={styles.buttonText}>Hợp đồng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Request', { user })}>
          <Text style={styles.icon}>📝</Text>
          <Text style={styles.buttonText}>Yêu cầu</Text>
        </TouchableOpacity>
      </View>

      {/* Danh mục tính tiền */}
      <Text style={styles.sectionTitle}>Danh mục tính tiền</Text>
      <View style={styles.paymentBox}>
        <FlatList
          data={paymentData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.paymentItem}>
              <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                <Text>{item.icon}</Text>
              </View>
              <Text style={styles.paymentName}>{item.name}</Text>
              <Text style={styles.paymentValue}>{item.value}</Text>
            </View>
          )}
        />
      </View>

      {/* Thanh điều hướng */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Registered', { user })}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeBill', { user })}>
          <Text style={styles.navIcon}>📄</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { user })}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ===================== STYLE =====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  card: {
    marginTop: 70,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    color: '#1976D2',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 10,
    width: 100,
  },
  icon: {
    fontSize: 30,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 10,
    color: '#424242',
  },
  paymentBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    marginTop: 10,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  paymentName: {
    flex: 1,
    fontWeight: '500',
    fontSize: 14,
    color: '#424242',
  },
  paymentValue: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1976D2',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navIcon: {
    fontSize: 26,
    color: '#1976D2',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoColumn: {
    flex: 1,
  },
  infoText: {
    marginBottom: 5,
    fontSize: 14,
    color: '#424242',
  },
});