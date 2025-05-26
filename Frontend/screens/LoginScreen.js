import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { login } from '../api/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';

export default function LoginScreen({ navigation }) {
  const [TenDangNhap, setTenDangNhap] = useState('');
  const [Password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    try {
      const res = await login(TenDangNhap, Password);
      if (res.success) {
        const user = res.user;
        if (String(user.Role) === '0') {
          navigation.navigate('UnRegistered', { user });
        } else if (String(user.Role) === '1') {
          navigation.navigate('Registered', { user });
        } else {
          showMessage({
            message: 'Lỗi',
            description: 'Role không hợp lệ',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: 'Đăng nhập thất bại',
          description: res.message || 'Sai thông tin đăng nhập',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      showMessage({
        message: 'Lỗi server',
        description: 'Không thể kết nối đến server',
        type: 'danger',
      });
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('#')}>
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
