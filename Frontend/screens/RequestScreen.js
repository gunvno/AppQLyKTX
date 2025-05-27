import React, { useEffect, useState, useCallback } from 'react'; 
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as api from '../api/api';

export default function RequestScreen({ navigation, route }) {
  const [yeuCauGanDay, setYeuCauGanDay] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = route.params;

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getRequestsByUsername(user.TenDangNhap);
      if (result.success && result.data.length > 0) {
        const sortedData = result.data.sort(
          (a, b) => new Date(b.NgayGui) - new Date(a.NgayGui)
        );

        const requests = sortedData.map(item => ({
          id: item.MaYeuCau,
          loai: item.TenYeuCau || 'Đổi phòng',
          ngay: new Date(item.NgayGui).toLocaleString(),
          trangThai: item.TrangThai || 'Đã gửi',
        }));
        setYeuCauGanDay(requests);
      } else {
        setYeuCauGanDay([]);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu yêu cầu:', error);
      setYeuCauGanDay([]);
    }
    setLoading(false);
  }, [user.TenDangNhap]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [fetchRequests])
  );

  const getTrangThaiStyle = (trangThai) => {
    switch (trangThai) {
      case 'Đã gửi':
        return styles.daGui;
      case 'Từ chối':
        return styles.tuChoi;
      case 'Đã hủy':
        return styles.daHuy; // giữ màu đỏ
      default:
        return {};
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F6FA' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yêu cầu</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loại yêu cầu</Text>
          <View style={styles.requestTypes}>
            <TouchableOpacity style={styles.requestType} onPress={() => navigation.navigate('ChangeRoom', { user })}>
              <Ionicons name="swap-horizontal" size={28} color="#3B82F6" />
              <Text>Đổi phòng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.requestType} onPress={() => navigation.navigate('ReturnRoom', { user })}>
              <Ionicons name="exit-outline" size={28} color="#3B82F6" />
              <Text>Trả phòng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.requestType} onPress={() => navigation.navigate('RepairRoom', { user })}>
              <Ionicons name="construct-outline" size={28} color="#3B82F6" />
              <Text>Sửa chữa</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yêu cầu gần đây</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#3B82F6" />
          ) : yeuCauGanDay.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 20 }}>Không có yêu cầu nào</Text>
          ) : (
            yeuCauGanDay.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.requestItem}
                onPress={() => navigation.navigate('RequestDetail', { requestId: item.id, username: user.TenDangNhap })}
              >
                <View>
                  <Text style={styles.requestTitle}>Yêu cầu {item.loai.toLowerCase()}</Text>
                  <Text style={styles.requestDate}>{item.ngay}</Text>
                </View>
                <View style={[styles.statusBadge, getTrangThaiStyle(item.trangThai)]}>
                  <Text style={styles.statusText}>{item.trangThai}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B82F6',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15, // khoảng cách nhỏ vừa phải
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  requestTypes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  requestType: {
    alignItems: 'center',
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  requestTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  requestDate: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  statusText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13,
  },
  daGui: {
    backgroundColor: '#10B981',
  },
  tuChoi: {
    backgroundColor: '#F87171',
  },
  daHuy: {
    backgroundColor: '#EF4444',  // giữ màu đỏ cho trạng thái "Đã hủy"
  },
});
