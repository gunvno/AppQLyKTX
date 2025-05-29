import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { sendPassword } from '../api/api'; // Adjust the import path as necessary

export default function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const data = await sendPassword(username);
      if (data.success) {
        Alert.alert('Thành công', 'Mật khẩu đã được gửi về email của bạn!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Lỗi', data.message || 'Tên đăng nhập không tồn tại!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại!');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Hình ảnh minh họa */}
      <Image
        source={require('../../assets/image.png')} // Thay bằng đường dẫn ảnh minh họa của bạn
        style={styles.image}
        resizeMode="contain"
      />

      {/* Tiêu đề */}
      <Text style={styles.title}>GỬI MẬT KHẨU</Text>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Nhập mã số sinh viên"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Nút gửi mật khẩu */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Đang xử lý...' : 'Gửi mật khẩu'}
        </Text>
      </TouchableOpacity>

      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBack: {
    width: '100%',
    backgroundColor: '#E3F2FD',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});