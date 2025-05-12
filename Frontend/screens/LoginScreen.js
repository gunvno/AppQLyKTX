import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { login } from '../api/api';
import Icon from 'react-native-vector-icons/MaterialIcons'; // nhớ cài nếu chưa có: npm install react-native-vector-icons

export default function LoginScreen({ navigation }) {
  const [TenDangNhap, setTenDangNhap] = useState('');
  const [Password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    try {
      const res = await login(TenDangNhap, Password);
      console.log('Kết quả từ API:', res); // Thêm dòng này
      if (res.success) {
        const user = res.user;
        console.log('Thông tin người dùng:', user);
  
        // Kiểm tra role và điều hướng
        if (String(user.Role) === '0') {
          // Người dùng chưa đăng ký
          navigation.navigate('UnRegistered', { user });
        } else if (String(user.Role) === '1') {
          // Người dùng đã đăng ký
          navigation.navigate('Registered', { user });
        } else {
          Alert.alert('Lỗi', 'Role không hợp lệ');
        }
      } else {
        Alert.alert('Đăng nhập thất bại', res.message || 'Sai thông tin đăng nhập');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi server', 'Không thể kết nối đến server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập mã số sinh viên"
        value={TenDangNhap}
        onChangeText={setTenDangNhap}  
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Nhập mật khẩu"
          secureTextEntry={secureText}
          value={Password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? "visibility-off" : "visibility"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Quên mật khẩu ?</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    height: 45,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  forgotPassword: {
    color: 'blue',
    marginBottom: 40,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    flex: 0.45,
    alignItems: 'center',
    paddingVertical: 10,
  },
  loginButton: {
    flex: 0.45,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
