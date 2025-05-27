import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBillDetail, updateBillStatus } from '../api/api';
import QRCode from 'react-native-qrcode-svg';

const BillDetailScreen = ({ route, navigation }) => {
    const { id, month, year } = route.params;
  const [detail, setDetail] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const getFormattedMonth = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `Hóa đơn tháng ${month}/${year}`;
  };

  useEffect(() => {
    getBillDetail(id).then(setDetail).catch(console.error);
  }, []);

  const handleConfirmPayment = async () => {
    try {
      await updateBillStatus(id, 'Đã thanh toán');
      alert('Thanh toán thành công!');
      setDetail({ ...detail, TrangThai: 'Đã thanh toán' });
      setShowQRCode(false);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (err) {
      alert('Lỗi khi thanh toán!');
    }
  };

  const generateQRContent = () => {
    return `Hóa đơn #${id}\nMSSV: ${detail.user.TenDangNhap}\nTên: ${detail.user.Username}\nSố tiền: ${Number(detail.total).toLocaleString()}đ`;
  };

  if (!detail) return <Text style={{ padding: 16 }}>Đang tải...</Text>;

  return (
  <ScrollView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Chi tiết hóa đơn</Text>
    </View>

    <View style={styles.centerCard}>
      <Text style={styles.totalAmount}>{Number(detail.total).toLocaleString()}đ</Text>
      <Text>{getFormattedMonth(detail.NgayXuatHD)}</Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Thông tin khách thuê</Text>
      <Text>Mã số sinh viên: <Text style={styles.bold}>{detail.user.TenDangNhap}</Text></Text>
      <Text>Tên sinh viên: <Text style={styles.bold}>{detail.user.Username}</Text></Text>
      <Text>Địa chỉ: <Text style={styles.bold}>{detail.user.DiaChi}</Text></Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Thông tin hóa đơn</Text>
      {detail.services.map((s, i) => (
        <Text key={i}>{s.TenDV}: <Text style={styles.bold}>{Number(s.TienDV).toLocaleString()}đ</Text></Text>
      ))}
    </View>

    <Text style={styles.totalLabel}>
      Tổng tiền: <Text style={styles.totalAmount}>{Number(detail.total).toLocaleString()}đ</Text>
    </Text>

    {showQRCode && (
  <View style={styles.qrContainer}>
    <Text style={{ marginBottom: 10 }}>Quét mã để chuyển khoản</Text>
    <QRCode value={generateQRContent()} size={200} />
    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
      <Text style={styles.buttonText}>Xác nhận chuyển khoản thành công</Text>
    </TouchableOpacity>
  </View>
)}

    {!showQRCode && detail.TrangThai !== 'Đã thanh toán' && (
  <TouchableOpacity style={styles.button} onPress={() => setShowQRCode(true)}>
    <Text style={styles.buttonText}>Thanh toán</Text>
  </TouchableOpacity>
)}
    {detail.TrangThai === 'Đã thanh toán' && (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: '#4CAF50' }]}
    onPress={() => navigation.goBack()}
  >
    <Text style={styles.buttonText}>Quay lại</Text>
  </TouchableOpacity>
)}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff',
    marginTop: 40, flex: 1  // Adjusted to avoid overlap with header
   },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E6CF6',
    padding: 16,
  },
  headerTitle: { color: 'white', fontSize: 16, marginLeft: 16 },
  centerCard: {
    alignItems: 'center',
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E6CF6',
    marginBottom: 6,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  bold: { fontWeight: 'bold' },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  button: {
    margin: 16,
    backgroundColor: '#2E6CF6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  qrContainer: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
});

export default BillDetailScreen;
