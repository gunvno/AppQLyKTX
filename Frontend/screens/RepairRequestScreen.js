import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { createRequest } from '../api/api';

export default function RepairRequestScreen({ route, navigation }) {
  const { user } = route.params;
  const [lyDo, setLyDo] = useState('');
  const [hinhAnh, setHinhAnh] = useState(null); // Base64 string

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Lỗi', 'Bạn cần cấp quyền truy cập thư viện ảnh');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        base64: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setHinhAnh(result.assets[0].base64);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi chọn ảnh');
    }
  };

  const sendRequest = async () => {
    if (lyDo.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung sửa chữa');
      return;
    }

    try {
      const data = await createRequest({
        TenDangNhap: user.TenDangNhap,
        TenYeuCau: 'Sửa chữa',
        NgayThang: new Date().toISOString().slice(0, 10),
        LyDo: lyDo,
        HinhAnh: hinhAnh ? `data:image/jpeg;base64,${hinhAnh}` : null,
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
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Yêu cầu sửa chữa</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Nội dung sửa chữa:</Text>
        <TextInput
          style={styles.reasonInput}
          placeholder="Nhập nội dung sửa chữa..."
          multiline
          value={lyDo}
          onChangeText={setLyDo}
        />

        <Text style={styles.label}>Hình ảnh đính kèm:</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Ionicons name="image-outline" size={24} color="#3B82F6" />
          <Text style={{ marginLeft: 10, color: '#3B82F6' }}>Chọn hình ảnh</Text>
        </TouchableOpacity>

        {hinhAnh && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${hinhAnh}` }}
            style={styles.previewImage}
          />
        )}

        <View style={styles.sendButton}>
          <Button title="Gửi yêu cầu" color="#3B82F6" onPress={sendRequest} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3B82F6',
  },
  header: {
    
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
  
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
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
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 8,
    marginTop: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 8,
  },
  sendButton: {
    marginTop: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
