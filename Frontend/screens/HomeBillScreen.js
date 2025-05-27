import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBillsByUsername } from '../api/api';
import { useNavigation, useRoute } from '@react-navigation/native';

const HomeBillScreen = () => {
  const [bills, setBills] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params || {};
  const username = user?.TenDangNhap;

  useEffect(() => {
    if (username) {
      getBillsByUsername(username)
        .then(setBills)
        .catch(console.error);
    }
  }, [username]);

  const unpaidBill = bills.find(bill => bill.TrangThai === 'Chưa thanh toán');

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `16:00 - ${d.toLocaleDateString('vi-VN')}`;
  };

  const formatMonth = (dateStr) => {
    const d = new Date(dateStr);
    return `Hóa đơn tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const renderBillItem = (item) => (
    <View style={styles.billRow}>
      <Ionicons name="document-text-outline" size={24} color="#000" />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.billTitle}>{formatMonth(item.NgayXuatHD)}</Text>
        <Text style={styles.billDate}>{formatDate(item.NgayXuatHD)}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.billAmount}>{Number(item.TongTien).toLocaleString()}đ</Text>
        <Text style={[
          styles.billStatus,
          { color: item.TrangThai === 'Đã thanh toán' ? 'green' : 'red' }
        ]}>
          {item.TrangThai}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hóa đơn</Text>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        {/* Box chưa thanh toán */}
        {unpaidBill && (
          <View>
            <Text style={styles.sectionTitle}>Hóa đơn chưa thanh toán</Text>
            <View style={styles.unpaidBox}>
              {renderBillItem(unpaidBill)}
              <TouchableOpacity
                style={styles.checkButton}
                onPress={() => navigation.navigate('BillDetail', { id: unpaidBill.MaHD })}
              >
                <Text style={styles.checkText}>Kiểm tra</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Danh sách hóa đơn */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hóa đơn của tôi</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllBill', { username })}>
            <Text style={styles.seeMore}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        {bills.slice(0, 3).map(item => (
          <TouchableOpacity
            key={item.MaHD}
            onPress={() => navigation.navigate('BillDetail', { id: item.MaHD })}
          >
            {renderBillItem(item)}
          </TouchableOpacity>
        ))}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#2E6CF6', padding: 16, paddingTop: 50 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  seeMore: { color: '#2E6CF6', fontWeight: 'bold' },

  unpaidBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  billTitle: { fontSize: 15, fontWeight: '500' },
  billDate: { color: '#666', fontSize: 12, marginTop: 2 },
  billAmount: { fontWeight: 'bold', color: '#e53935' },
  billStatus: { fontSize: 12, marginTop: 4 },
  checkButton: {
    borderWidth: 1,
    borderColor: '#2E6CF6',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  checkText: { color: '#2E6CF6', fontWeight: 'bold' },

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
});

export default HomeBillScreen;
