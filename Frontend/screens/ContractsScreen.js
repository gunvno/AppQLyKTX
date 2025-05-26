import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getContractByUser,getUserById } from '../api/api';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function ContractsScreen({ navigation, route }) {
  const { user } = route.params;
  console.log('Thông tin người dùng:', user); // In thông tin người dùng ra console để kiểm tra
  const [listContract, setListContract] = useState([]);
  const [loading, setLoading] = useState(true);
    const BackHome = async () => {
      try {
        const res = await getUserById(user.TenDangNhap);
        if (res.success) {
          const user = res.user;
          console.log('User từ API:', user);
          console.log('Role:', user?.Role);
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
  // Hàm fetch hợp đồng
  const fetchContracts = async () => {
    setLoading(true);
    try {
      const res = await getContractByUser(user.TenDangNhap);
      if (res.success) {
        const formattedContracts = res.contracts.map((item) => {
          const isActive = item.TrangThai === 'Đang có hiệu lực';
          const rawDate = new Date(item.NgayDangKy);
          const formattedDate = rawDate.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Ho_Chi_Minh"
          });
          return {
            TenDangNhap: user.TenDangNhap,
            startdate: item.NgayBatDau,
            enddate: item.NgayKetThuc,
            tiencoc: item.TienPhong,
            tienphong: item.TienPhong,
            loai: item.LoaiPhong,
            loaihopdong: 'Loại hợp đồng 6 tháng',
            id: item.MaHD.toString(),
            title: `Hợp đồng kỳ ${item.HocKy}/${item.NamBatDau}`,
            date: formattedDate,
            status: item.TrangThai,
            statusColor: isActive ? '#1976D2' : '#E53935',
            statusBg: isActive ? '#E3F2FD' : '#FFCDD2',
          };
        });
        setListContract(formattedContracts);
      } else {
        Alert.alert('Lỗi', res.message || 'Không thể lấy thông tin người dùng');
        setListContract([]);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến server');
      setListContract([]);
    } finally {
      setLoading(false);
    }
  };

  // Luôn fetch lại khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchContracts();
    }, [user.TenDangNhap])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contractItem}
      onPress={() => navigation.navigate('ContractDetail', { contract: item, user })}
    >
      <View style={styles.contractText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <View style={[styles.statusTag, { backgroundColor: item.statusBg }]}>
          <Text style={{ color: item.statusColor }}>{item.status}</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => BackHome()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hợp đồng</Text>
      </View>
      <FlatList
        data={listContract}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          !loading && (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: '#888', fontSize: 16 }}>Không có hợp đồng nào tồn tại</Text>
            </View>
          )
        }
        refreshing={loading}
        onRefresh={fetchContracts}
      />
    </View>
  );
}

// ===================== STYLE =====================
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3366FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    marginRight: 12,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  contractItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
  contractText: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
  },
  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});