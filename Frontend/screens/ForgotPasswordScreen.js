import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { sendPassword } from '../api/api'; // Adjust the import path as necessary

export default function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const data = await sendPassword(username); // data đã là object
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
      <Text style={styles.title}>Quên mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
  <TouchableOpacity
    style={[styles.button, loading && styles.buttonDisabled]}
    onPress={handleForgotPassword}
    disabled={loading}
    >
    <Text style={styles.buttonText}>
      {loading ? "Đang xử lý..." : "Gửi mật khẩu"}
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
  style={styles.buttonBack}
  onPress={() => navigation.navigate('Login')}>
    <Text style={styles.buttonText}>Quay lại</Text>
  </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  buttonBack: {
    marginTop: 10,
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});