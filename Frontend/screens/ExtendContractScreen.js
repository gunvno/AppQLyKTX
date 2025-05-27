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
import { getUserNotRegisteredById, getRoomByFloor, getTangAndPhongByMaHopDong, setNgayKetThucHopDong } from '../api/api';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper'; 
import { Ionicons } from '@expo/vector-icons'; // Nếu dùng Expo
import moment from 'moment';

export default function ExtendContractScreen({ route, navigation }) {
  const { user } = route.params;
  const { contract } = route.params; // Nhận thông tin hợp đồng từ route.params
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);

  const [registrationInfo, setRegistrationInfo] = useState({
    NgayDangKy: new Date().toLocaleDateString(),
    Nam: '2025',
    Dot: 'K2',
    ThoiGianDangKy: [],
    Tang: '1',
    Phong: '101',
    DongY: false,
  });
  const checkDate = () => {
  const { start, end } = getStartEndDate(registrationInfo.Dot, registrationInfo.Nam);
  const endMySQL = toMySQLDate(end);
  const oldDate = contract.enddate; // Ngày kết thúc cũ từ hợp đồng
  console.log(endMySQL, oldDate);
  if (!endMySQL || !oldDate) {
    Alert.alert('Lỗi', 'Không xác định được ngày kết thúc');
    return;
  }

  if (endMySQL <= oldDate) {
    Alert.alert('Lỗi', 'Ngày kết thúc mới phải lớn hơn ngày kết thúc hợp đồng cũ!');
    return;
  }
  if(endMySQL > oldDate){
  console.log('Ngày kết thúc mới:', endMySQL);
  console.log(contract.id)
  updateEndDate(contract.id, endMySQL);
  }
  else {
    Alert.alert('Lỗi', 'Kiểu dữ liệu không phù hợp');
    return;
  }
};
useEffect(() => {
  if (contract && contract.id) {
    getTangAndPhong(contract.id);
  }
}, [contract]);
  const updateEndDate  = async (MaHD, NgayKetThuc) => {
    try {
      const res = await setNgayKetThucHopDong(MaHD, NgayKetThuc);
      if (res.success) {
        console.log('Cập nhật ngày kết thúc hợp đồng thành công:', res);
        Alert.alert('Thành công', 'Ngày kết thúc hợp đồng đã được cập nhật thành công');
        navigation.navigate('ContractDetail', { user, contract: { ...contract, enddate: NgayKetThuc } });
      } else {
        console.error('Lỗi cập nhật ngày kết thúc hợp đồng:', res.message || 'Không thể cập nhật');
        Alert.alert('Lỗi', res.message || 'Không thể cập nhật ngày kết thúc hợp đồng');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật ngày kết thúc hợp đồng:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến server để cập nhật ngày kết thúc hợp đồng');
      return null;
    }
  };
  const getStartEndDate = (dot, year) => {
    if (dot === 'K2') {
      // Ngày bắt đầu: 01/02/năm, Ngày kết thúc: 01/06/năm
      return {
        start: `01/02/${year}`,
        end: `01/06/${year}`
      };
    } else if (dot === 'K1') {
      // Ngày bắt đầu: 01/08/(năm-1), Ngày kết thúc: 31/01/năm
      return {
        start: `01/08/${Number(year) - 1}`,
        end: `31/01/${year}`
      };
    }
    return { start: '', end: '' };
  };
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
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getRoomByFloor(registrationInfo.Tang);
        if (res.success) {
          setRoomList(res.rooms);
          if (!res.rooms.find(r => r.MaPhong === registrationInfo.Phong)) {
            setRegistrationInfo(prev => ({ ...prev, Phong: res.rooms[0]?.MaPhong || '' }));
          }
        } else {
          setRoomList([]);
          setRegistrationInfo(prev => ({ ...prev, Phong: '' }));
        }
      } catch (error) {
        setRoomList([]);
        setRegistrationInfo(prev => ({ ...prev, Phong: '' }));
      }
    };
    fetchRooms();
  }, [registrationInfo.Tang]);
  function toMySQLDate(dateStr) {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  function toMySQLDateTime(dateStr) {
  // Nếu có cả ngày và giờ (vd: "05/05/2025, 09:23:29")
  if (dateStr.includes(',')) {
    const [datePart, timePart] = dateStr.split(',').map(s => s.trim());
    const [day, month, year] = datePart.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${timePart}`;
  }
  // Nếu chỉ có ngày (vd: "05/05/2025")
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
const getTangAndPhong = async (MaHD) => {
  try {
    const res = await getTangAndPhongByMaHopDong(MaHD);
    if (res.success) {
      const { Tang, MaPhong } = res.tangAndPhong;
      console.log('Thông tin tầng và phòng:', Tang, MaPhong);
      setRegistrationInfo(prev => ({
        ...prev, Tang: Tang,
        Phong: MaPhong,
      }));
  }
}
  catch (error) {
    console.error('Lỗi khi lấy tầng và phòng:', error);
    Alert.alert('Lỗi', 'Không thể lấy thông tin tầng và phòng');
    return null;
  }
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

  const { start, end } = getStartEndDate(registrationInfo.Dot, registrationInfo.Nam);

  return (
    
    <PaperProvider>
                  <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Gia hạn hợp đồng</Text>
        </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>THÔNG TIN SINH VIÊN</Text>
        <View style={styles.infoBox}>
          <Text>Họ Tên: {studentInfo.Username}</Text>
          <Text>Lớp: {studentInfo.Lop}</Text>
          <Text>MSSV: {studentInfo.TenDangNhap}</Text>
          <Text>Giới tính: {studentInfo.GioiTinh}</Text>
          <Text>Ngày sinh: { moment(studentInfo.NgaySinh).format('DD/MM/YYYY')}</Text>
          <Text>Nơi sinh: {studentInfo.DiaChi}</Text>
          <Text>Ngành: {studentInfo.Nganh}</Text>
        </View>

        <View style={styles.formBox}>
          <Text>Ngày đăng ký gia hạn: {registrationInfo.NgayDangKy}</Text>

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
              <Picker.Item label="K1" value="K1" />
              <Picker.Item label="K2" value="K2" />
            </Picker>
          </View>

          <Text style={{ marginTop: 10 }}>Thời gian đăng ký:</Text>
          <View style={styles.checkboxRow}>
          <View style={styles.row}>
            <Text>Ngày bắt đầu: </Text>
            <Text style={{ fontWeight: 'bold', marginRight: 20 }}>{start}</Text>
            <Text>Ngày kết thúc: </Text>
            <Text style={{ fontWeight: 'bold' }}>{end}</Text>
          </View>
          </View>

          <View style={styles.row}>
            <Text>Tầng: </Text>
            <Text style={{ fontWeight: 'bold', marginRight: 20 }}>
              {registrationInfo.Tang || registrationInfo.tang || 'N/A'}
            </Text>
            <Text>Phòng: </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {registrationInfo.Phong || registrationInfo.phong || registrationInfo.MaPhong || 'N/A'}
            </Text>
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

        <TouchableOpacity style={styles.registerButton} onPress={checkDate}>
          <Text style={styles.registerButtonText}>Gia hạn</Text>
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
