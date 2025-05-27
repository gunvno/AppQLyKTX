import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { createRequest } from '../api/api';

export default function ReturnRoomScreen({ route, navigation }) {
  const { user } = route.params;
  const [lyDo, setLyDo] = useState('');
  const [ngayTra, setNgayTra] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date) => {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        Alert.alert('Lỗi', 'Bạn không thể chọn ngày trước ngày hiện tại');
        return;
      }
      setNgayTra(selectedDate);
    }
  };

  const sendReturnRequest = async () => {
    if (lyDo.trim() === '') {
      Alert.alert('Lỗi', 'Bạn phải nhập lý do trả phòng');
      return;
    }

    try {
      const data = await createRequest({
        TenDangNhap: user.TenDangNhap,
        TenYeuCau: 'Trả phòng',
        NgayThang: ngayTra.toISOString().slice(0, 10),
        LyDo: lyDo,
        HinhAnh: null,
      });

      if (data.success) {
        Alert.alert('Thành công', data.message);
        navigation.goBack();
      } else {
        Alert.alert('Lỗi', data.message);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể gửi yêu cầu');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Yêu cầu trả phòng</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Ngày trả phòng:</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.dateInputContainer}
          onPress={() => setShowPicker(true)}
        >
          <TextInput
            style={styles.dateInput}
            value={formatDate(ngayTra)}
            editable={false}
            pointerEvents="none"
          />
          <Ionicons name="calendar-outline" size={24} color="#555" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={ngayTra}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            minimumDate={new Date(new Date().setHours(0, 0, 0, 0))}
            onChange={onChangeDate}
          />
        )}

        <Text style={styles.label}>Lý do trả phòng:</Text>
        <TextInput
          style={styles.reasonInput}
          multiline
          placeholder="Nhập lý do trả phòng..."
          value={lyDo}
          onChangeText={setLyDo}
        />

        <View style={{ marginTop: 20 }}>
          <Button title="Gửi yêu cầu" onPress={sendReturnRequest} color="#3B82F6" />
          {/* Màu nút gửi theo chuẩn màu xanh của header, bạn có thể thay đổi */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
});
