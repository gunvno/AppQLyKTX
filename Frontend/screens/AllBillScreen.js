import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBillsByUserId } from '../api/api';

const AllBillScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState('Tất cả');

  useEffect(() => {
    getBillsByUserId(username).then(setBills).catch(console.error);
  }, []);

  const filteredBills = bills.filter(bill => {
    if (filter === 'Tất cả') return true;
    return filter === 'Đã thanh toán'
      ? bill.TrangThai === 'Đã thanh toán'
      : bill.TrangThai !== 'Đã thanh toán';
  });

  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return `Hóa đơn tháng ${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const renderBill = ({ item }) => (
    <TouchableOpacity
      style={styles.billItem}
      onPress={() => navigation.navigate('BillDetail', { id: item.MaHD })}
    >
      <Ionicons name="document-text-outline" size={24} color="#000" />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.billTitle}>{getMonthYear(item.NgayXuatHD)}</Text>
        <Text style={styles.dateText}>
          {new Date(item.NgayXuatHD).toLocaleDateString()}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.amountText}>{Number(item.TongTien).toLocaleString()}đ</Text>
        <Text
          style={[
            styles.status,
            { color: item.TrangThai === 'Đã thanh toán' ? 'green' : 'red' },
          ]}
        >
          {item.TrangThai}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hóa đơn của tôi</Text>
      </View>

      <View style={styles.filterRow}>
        {['Tất cả', 'Đã thanh toán', 'Chưa thanh toán'].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterTab, filter === f && styles.activeTab]}
          >
            <Text
              style={[styles.filterText, filter === f && styles.activeText]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBills}
        keyExtractor={(item) => item.MaHD.toString()}
        renderItem={renderBill}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E6CF6',
    padding: 16,
    marginTop: 40, // Adjust for status bar
  },
  headerTitle: { color: '#fff', fontSize: 18, marginLeft: 16 },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterTab: { paddingVertical: 10 },
  filterText: { color: '#888' },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2E6CF6',
  },
  activeText: { color: '#2E6CF6', fontWeight: 'bold' },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  billTitle: { fontWeight: 'bold', fontSize: 16 },
  dateText: { color: '#777', fontSize: 12, marginTop: 2 },
  amountText: { color: '#e53935', fontWeight: 'bold' },
  status: { fontSize: 12, marginTop: 4 },
});

export default AllBillScreen;
