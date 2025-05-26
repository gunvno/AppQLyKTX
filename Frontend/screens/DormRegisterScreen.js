import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getUserNotRegisteredById } from '../api/api';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper'; 
import { Ionicons } from '@expo/vector-icons'; // Nếu dùng Expo

export default function DormRegisterScreen({ route, navigation }) {
  const { user } = route.params;
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [registrationInfo, setRegistrationInfo] = useState({
    NgayDangKy: new Date().toLocaleDateString(),
    Nam: '2025',
    Dot: 'HK2',
    ThoiGianDangKy: [],
    Tang: '1',
    Phong: '108',
    DongY: false,
  });

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const res = await getUserNotRegisteredById(user.TenDangNhap);
        if (res.success) {
          setStudentInfo(res.user);
        } else {
          Alert.alert('Lỗi', res.message || 'Không thể lấy thông tin sinh viên');
        }
      } catch (error) {
        console.error('Lỗi:', error);
        Alert.alert('Lỗi', 'Không thể kết nối đến server');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, [user.TenDangNhap]);

  const toggleMonth = (month) => {
    setRegistrationInfo((prev) => {
      const months = prev.ThoiGianDangKy.includes(month)
        ? prev.ThoiGianDangKy.filter((m) => m !== month)
        : [...prev.ThoiGianDangKy, month];
      return { ...prev, ThoiGianDangKy: months };
    });
  };

  const handleRegister = () => {
    if (!registrationInfo.DongY) {
      Alert.alert('Thông báo', 'Bạn cần đồng ý với điều khoản trước khi đăng ký');
      return;
    }
    Alert.alert('Đăng ký thành công', JSON.stringify(registrationInfo));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (!studentInfo) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy thông tin sinh viên</Text>
      </View>
    );
  }

  return (
    
    <PaperProvider>
                  <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đăng kí ở</Text>
        </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>THÔNG TIN SINH VIÊN</Text>
        <View style={styles.infoBox}>
          <Text>Họ Tên: {studentInfo.Username}</Text>
          <Text>Lớp: {studentInfo.Lop}</Text>
          <Text>MSSV: {studentInfo.TenDangNhap}</Text>
          <Text>Giới tính: {studentInfo.GioiTinh}</Text>
          <Text>Ngày sinh: {studentInfo.NgaySinh}</Text>
          <Text>Nơi sinh: {studentInfo.DiaChi}</Text>
          <Text>Ngành: {studentInfo.Nganh}</Text>
        </View>

        <View style={styles.formBox}>
          <Text>Ngày đăng ký: {registrationInfo.NgayDangKy}</Text>

          <View style={styles.row}>
            <Text>Năm: </Text>
            <Picker
              selectedValue={registrationInfo.Nam}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setRegistrationInfo({ ...registrationInfo, Nam: itemValue })
              }>
              <Picker.Item label="2025" value="2025" />
              <Picker.Item label="2026" value="2026" />
            </Picker>
          </View>

          <View style={styles.row}>
            <Text>Đợt: </Text>
            <Picker
              selectedValue={registrationInfo.Dot}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setRegistrationInfo({ ...registrationInfo, Dot: itemValue })
              }>
              <Picker.Item label="HK1" value="HK1" />
              <Picker.Item label="HK2" value="HK2" />
            </Picker>
          </View>

          <Text style={{ marginTop: 10 }}>Chọn thời gian đăng ký:</Text>
          <View style={styles.checkboxRow}>
            {['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'].map(
              (month, index) => (
                <View style={styles.checkboxContainer} key={index}>
                  <Checkbox
                    status={registrationInfo.ThoiGianDangKy.includes(month) ? 'checked' : 'unchecked'}
                    onPress={() => toggleMonth(month)}
                  />
                  <Text>{month}</Text>
                </View>
              )
            )}
          </View>

          <View style={styles.row}>
            <Text>Tầng: </Text>
            <Picker
              selectedValue={registrationInfo.Tang}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setRegistrationInfo({ ...registrationInfo, Tang: itemValue })
              }>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>

            <Text>Phòng: </Text>
            <Picker
              selectedValue={registrationInfo.Phong}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setRegistrationInfo({ ...registrationInfo, Phong: itemValue })
              }>
              <Picker.Item label="108" value="108" />
              <Picker.Item label="201" value="201" />
            </Picker>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={registrationInfo.DongY ? 'checked' : 'unchecked'}
              onPress={() =>
                setRegistrationInfo({ ...registrationInfo, DongY: !registrationInfo.DongY })
              }
            />
            <Text>Tôi đã đọc và đồng ý với các điều khoản nội quy ký túc xá</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Đăng ký</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    padding: 15,
    backgroundColor: '#e6ecf3',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  formBox: {
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  registerButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#3366FF', // hoặc '#2979FF'
    paddingVertical: 15,
    marginTop: 40,
},

backButton: {
  marginRight: 12,
},

headerText: {
  fontSize: 18,
  color: '#fff',
  fontWeight: 'bold',
},

});
