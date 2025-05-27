import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { createRequest } from '../api/api';

export default function RequestScreen({ route, navigation }) {
  const { user } = route.params;
  const [lyDo, setLyDo] = useState('');
  const [ngaySua, setNgaySua] = useState(new Date());
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
      setNgaySua(selectedDate);
    }
  };

  const sendRequest = async () => {
    if (lyDo.trim() === '') {
      Alert.alert('Lỗi', 'Bạn phải nhập lý do đổi phòng');
      return;
    }

    try {
      const data = await createRequest({
        TenDangNhap: user.TenDangNhap,
        TenYeuCau: 'Đổi phòng',
        NgayThang: ngaySua.toISOString().slice(0, 10),
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Yêu cầu</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Ngày đổi phòng:</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.dateInputContainer}
          onPress={() => setShowPicker(true)}
        >
          <TextInput
            style={styles.dateInput}
            value={formatDate(ngaySua)}
            editable={false}
            pointerEvents="none"
          />
          <Ionicons name="calendar-outline" size={24} color="#555" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={ngaySua}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            minimumDate={new Date(new Date().setHours(0, 0, 0, 0))}
            onChange={onChangeDate}
          />
        )}

        <Text style={styles.label}>Lý do đổi phòng:</Text>
        <TextInput
          style={styles.reasonInput}
          multiline
          placeholder="Nhập lý do đổi phòng..."
          value={lyDo}
          onChangeText={setLyDo}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={sendRequest}
        >
          <Text style={styles.submitText}>Gửi yêu cầu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  submitButton: {
    marginTop: 20,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
