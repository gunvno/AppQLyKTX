import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RequestScreen({navigation, route}){
  const yeuCauGanDay = [
    { id: 1, loai: 'Đổi phòng', ngay: '01/05/2025 - 08:32', trangThai: 'Đã gửi' },
    { id: 2, loai: 'Trả phòng', ngay: '01/05/2025 - 08:32', trangThai: 'Từ chối' },
    { id: 3, loai: 'Sửa chữa', ngay: '01/05/2025 - 08:32', trangThai: 'Đã gửi' },
  ];

  const getTrangThaiStyle = (trangThai) => {
    switch (trangThai) {
      case 'Đã gửi':
        return styles.daGui;
      case 'Từ chối':
        return styles.tuChoi;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Yêu cầu</Text>
            </View>
      

      {/* Loại yêu cầu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loại yêu cầu</Text>
        <View style={styles.requestTypes}>
          <TouchableOpacity style={styles.requestType}>
            <Ionicons name="swap-horizontal" size={28} color="#3B82F6" />
            <Text>Đổi phòng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestType}>
            <Ionicons name="exit-outline" size={28} color="#3B82F6" />
            <Text>Trả phòng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestType}>
            <Ionicons name="construct-outline" size={28} color="#3B82F6" />
            <Text>Sửa chữa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Yêu cầu gần đây */}
      <View style={styles.section}>
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Yêu cầu gần đây</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        {yeuCauGanDay.map((item) => (
          <View key={item.id} style={styles.requestItem}>
            <View>
              <Text style={styles.requestTitle}>Yêu cầu {item.loai.toLowerCase()}</Text>
              <Text style={styles.requestDate}>{item.ngay}</Text>
            </View>
            <View style={[styles.statusBadge, getTrangThaiStyle(item.trangThai)]}>
              <Text style={styles.statusText}>{item.trangThai}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold',
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
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewMore: {
    color: '#3B82F6',
    fontWeight: '500',
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
});


