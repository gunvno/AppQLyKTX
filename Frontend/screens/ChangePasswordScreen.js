import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Dùng expo hoặc cài riêng react-native-vector-icons
import { updatePassword } from '../api/api'; // Đường dẫn đến file api.js

export default function ChangePasswordScreen({ navigation, route }) {
    const { user, onPasswordChangeSuccess } = route.params;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [secureCurrent, setSecureCurrent] = useState(true);
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  console.log(user);
  const isFormValid = currentPassword && newPassword && confirmPassword;

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }

    try {
      const response = await updatePassword(user.TenDangNhap, currentPassword, newPassword);

      if (response && response.success) {
        alert('Đổi mật khẩu thành công!');
        if (onPasswordChangeSuccess) {
          onPasswordChangeSuccess();
        }
        navigation.goBack();
        console.log('Đổi mật khẩu thành công');
      } else {
        alert(response.message || 'Đổi mật khẩu thất bại.');
        console.error('Lỗi đổi mật khẩu từ backend:', response);
      }

    } catch (error) {
      alert('Đã xảy ra lỗi khi gọi API đổi mật khẩu.');
      console.error('Lỗi gọi API đổi mật khẩu:', error);
    }
  };

  const renderInput = (label, value, setValue, secure, setSecure, placeholder) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} <Text style={{ color: 'red' }}>*</Text>
      </Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={secure}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#555"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Đổi mật khẩu</Text>
            </View>
        <View style={{ padding: 16 }}>
                {renderInput('Mật khẩu hiện tại', currentPassword, setCurrentPassword, secureCurrent, setSecureCurrent, 'Nhập mật khẩu hiện tại')}
                {renderInput('Mật khẩu mới', newPassword, setNewPassword, secureNew, setSecureNew, 'Nhập mật khẩu mới')}
                {renderInput('Nhập lại mật khẩu mới', confirmPassword, setConfirmPassword, secureConfirm, setSecureConfirm, 'Nhập lại mật khẩu mới')}

     

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isFormValid ? '#4a90e2' : '#ccc' }]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View> 
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  passwordWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 48,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
header: { backgroundColor: '#2E6CF6', padding: 16, paddingTop: 50, flexDirection: 'row', },
headerText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  paddingLeft:12,
},
backbutton: {
  marginRight: 12,
},
});

