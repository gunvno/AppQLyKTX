import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator,TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Nếu dùng Expo
import Icon from 'react-native-vector-icons/Feather';
import { updateTrangThaiHuyHopDong } from '../api/api'; // Giả sử bạn có hàm này trong api.js
import { updateRole0 } from '../api/api'; // Giả sử bạn có hàm này trong api.js

export default function ContractDetailScreen({ navigation, route }) {
  const { contract } = route.params;
  const { user }  = route.params; // Nhận thông tin người dùng từ route.params
  const huyHopDong = async () => {
    try {
      const res = await updateTrangThaiHuyHopDong(contract.id);
      if (res.success) {
        Alert.alert('Thành công', 'Hợp đồng đã được hủy thành công');
        const res1 = await updateRole0(contract.TenDangNhap);
        const updatedUser = { ...user, Role: '0' };
        navigation.navigate('Contracts', { user: updatedUser });
      } else {
        Alert.alert('Lỗi', res.message || 'Không thể hủy hợp đồng');
      }
    }
    catch (error) {
      console.error('Lỗi hủy hợp đồng:', error);
      Alert.alert('Lỗi', 'Không thể hủy hợp đồng');
      return null;
    }
  };
  const handleCall = () => {
    Alert.alert(
      'Hợp đồng',
      'Bạn có muốn hủy hợp đồng',
      [
        {
          text: 'Hủy bỏ',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            huyHopDong();
          },
        },
      ],
      { cancelable: false }
    );
  };
  console.log('Contract received in ContractDetailScreen:', contract);
  const NgayBatDau = new Date(contract.startdate).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const NgayKetThuc = new Date(contract.enddate).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Xem Hợp đồng</Text>
        </View>
          <View style={styles.body}>
      <Text style={styles.title}>Thông tin hợp đồng</Text>
      <View style={styles.card}>
      <Text>Số hợp đồng: {contract.id}</Text>
      <Text>Loại hợp đồng: 6 tháng</Text>
      <Text>Ngày bắt đầu: {NgayBatDau}</Text>
      <Text>Ngày kết thúc: {NgayKetThuc}</Text>
      <Text>Tiền cọc: {contract.tiencoc}</Text>
      <Text>Tiền thuê KTX: {contract.tienphong}</Text>
      <Text>Loại phòng: {contract.loai}</Text>
      <View/>
      <TouchableOpacity style={styles.viewDocButton}>
          <Icon name="file-text" size={18} color="#1976D2" />
          <Text style={styles.viewDocText}>Xem văn bản hợp đồng</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCall}>
          <Text style={styles.cancelText}>Hủy hợp đồng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.extendButton} onPress={() => navigation.navigate('ExtendContract', { user })}>
          <Text style={styles.extendText}>Gia hạn hợp đồng</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    paddingTop: 40,
    platform: 'android' ? 20 : 0, // Adjust for iOS notch
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    padding: 16,
    gap: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  body: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    color: '#333',
  },
  value: {
    fontWeight: '500',
  },
  viewDocButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    elevation: 2,
  },
  viewDocText: {
    color: '#1976D2',
    fontWeight: '500',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E53935',
    padding: 12,
    borderRadius: 6,
    marginRight: 8,
    alignItems: 'center',
  },
  extendButton: {
    flex: 1,
    backgroundColor: '#43A047',
    padding: 12,
    borderRadius: 6,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  extendText: {
    color: '#fff',
    fontWeight: 'bold',
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