import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRequestDetail, cancelRequest } from '../api/api';

export default function RequestDetailScreen({ route, navigation }) {
  const { requestId } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getRequestDetail(requestId);
        if (res.success && res.data) {
          setData(res.data);
        } else {
          Alert.alert('Lỗi', res.message || 'Không thể lấy chi tiết yêu cầu');
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [requestId]);

  const handleCancel = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn hủy yêu cầu này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: async () => {
            try {
              setCancelling(true);
              const res = await cancelRequest(requestId);
              if (res.success) {
                Alert.alert('Thành công', res.message);
                navigation.goBack();
              } else {
                Alert.alert('Lỗi', res.message || 'Không thể hủy yêu cầu');
              }
            } catch {
              Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
            } finally {
              setCancelling(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ marginTop: 12, fontSize: 16, color: '#555' }}>Đang tải...</Text>
      </View>
    );
  }

  if (!data || !data.yeuCau || !data.chiTiet) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 16, color: '#888' }}>Không có dữ liệu để hiển thị.</Text>
      </View>
    );
  }

  const { yeuCau, chiTiet } = data;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết yêu cầu</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Card thông tin yêu cầu */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thông tin yêu cầu</Text>
          <Text style={styles.label}>
            <Text style={styles.labelTitle}>Loại yêu cầu: </Text>
            {yeuCau.TenYeuCau}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.labelTitle}>Ngày gửi: </Text>
            {new Date(yeuCau.NgayGui).toLocaleString()}
          </Text>
          <Text style={[styles.label, statusStyles[yeuCau.TrangThai] || {}]}>
            <Text style={styles.labelTitle}>Trạng thái: </Text>
            {yeuCau.TrangThai}
          </Text>
        </View>

        {/* Card chi tiết yêu cầu */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Chi tiết yêu cầu</Text>
          <Text style={styles.label}>
            <Text style={styles.labelTitle}>Ngày yêu cầu: </Text>
            {new Date(chiTiet.NgayThang).toLocaleDateString()}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.labelTitle}>Lý do: </Text>
            {chiTiet.LyDo}
          </Text>

          {chiTiet.HinhAnh?.startsWith('data:image') ? (
          <Image
            source={{ uri: chiTiet.HinhAnh }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text style={[styles.label, { fontStyle: 'italic', color: '#999' }]}>
            Không có hình ảnh minh họa
            </Text>
        )}

        </View>

        {/* Nút hủy yêu cầu */}
        {yeuCau.TrangThai === 'Đã gửi' && (
          <TouchableOpacity
            style={[styles.cancelButton, cancelling && { opacity: 0.6 }]}
            onPress={handleCancel}
            disabled={cancelling}
          >
            <Text style={styles.cancelButtonText}>
              {cancelling ? 'Đang hủy...' : 'Hủy yêu cầu'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const statusStyles = {
  'Đã gửi': { color: '#2563EB', fontWeight: '600' }, // xanh dương
  'Từ chối': { color: '#DC2626', fontWeight: '600' }, // đỏ
  'Đã hủy': { color: '#B91C1C', fontWeight: '600' }, // đỏ đậm
  'Đã duyệt': { color: '#16A34A', fontWeight: '600' }, // xanh lá
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
 
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#374151',
  },
  labelTitle: {
    fontWeight: '700',
    color: '#1F2937',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 10,
    shadowColor: '#B91C1C',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
