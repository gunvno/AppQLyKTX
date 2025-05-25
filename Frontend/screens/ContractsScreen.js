import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getContractByUser } from '../api/api';
import { Ionicons } from '@expo/vector-icons'; // Nếu dùng Expo

export default function ContractsScreen({ navigation, route }) {
  const { user } = route.params;
  const [listContract, setListContract] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getContractByUser(user.TenDangNhap);
        if (res.success) {
          // Format lại từng hợp đồng để dùng trong renderItem
          const formattedContracts = res.contracts.map((item, index) => {
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
    startdate: item.NgayBatDau,
    enddate: item.NgayKetThuc,
    tiencoc: item.TienPhong,
    tienphong: item.TienPhong,
    loai: item.LoaiPhong,
    loaihopdong: 'Loại hợp đồng 6 tháng',
    id: item.MaHD,
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
  if (loading) return <View style={styles.container}><Text>Không có hợp đồng</Text></View>;
  const renderItem = ({ item }) => (
  console.log('Navigating with item:', item),
  <TouchableOpacity
    style={styles.contractItem}
    onPress={() => navigation.navigate('ContractDetail', { contract: item })}
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hợp đồng</Text>
        </View>
      <FlatList
        data={listContract}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
    paddingVertical: 12,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
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
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#3366FF', // hoặc '#2979FF'
  paddingVertical: 12,
  paddingHorizontal: 16,
},

backButton: {
  marginRight: 12,
},

headerText: {
  fontSize: 18,
  color: '#fff',
  fontWeight: 'bold',
},
});
