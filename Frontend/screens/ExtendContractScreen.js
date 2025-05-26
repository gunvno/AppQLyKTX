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
import { getUserNotRegisteredById, getRoomByFloor, getMaKyByHocKyVaNamBatDau, updateRole1, insertHopDong, getRoomById,getTotalPeopleByMaPhongAndTrangThaiHopDong } from '../api/api';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper'; 
import { Ionicons } from '@expo/vector-icons'; // Nếu dùng Expo
import moment from 'moment';

export default function ExtendContractScreen({ route, navigation }) {
  const { user } = route.params;
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
  const getRoomById1 = async (maPhong) => {
    try {
      const res = await getRoomById(maPhong);
      if (res.success) {
        return res.room; // hoặc res.data tuỳ theo API trả về
      } else {
        Alert.alert('Lỗi', res.message || 'Không tìm thấy phòng');
        return null;
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối đến server');
      return null;
    }
  };
  const getMaKy = async () => {
    try {
      const hocKy = registrationInfo.Dot;
      const nam = registrationInfo.Nam;
      const res = await getMaKyByHocKyVaNamBatDau(hocKy, nam);
      if (res.success) {
        const maKy = res.MaKy;
        console.log('Mã kỳ lấy được:', maKy);
        // Xử lý tiếp với maKy nếu cần, ví dụ:
        // setRegistrationInfo(prev => ({ ...prev, MaKy: maKy }));
        return maKy;
      } else {
        Alert.alert('Không tìm thấy mã kỳ', res.message || 'Không có dữ liệu phù hợp');
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi lấy MaKy:', error);
      Alert.alert('Lỗi server', 'Không thể kết nối đến server');
      return null;
    }
  };
  const KiemTraSoLuongNguoi = async () => {
    try {
      const MaPhong = registrationInfo.Phong;
      const res = await getTotalPeopleByMaPhongAndTrangThaiHopDong(MaPhong);
      if (res.success) {
        const SoLuong = res.totalPeople;
        console.log('Số người:', SoLuong);
        const res2 = await getRoomById(MaPhong);
        if (res2.success) {
          const maxPeople = res2.room.Succhua; // Hoặc res2.data.Succhua tuỳ theo API trả về
          console.log('Số người tối đa trong phòng:', maxPeople);
          if (SoLuong < maxPeople) {
            console.log('Da den day');
            await handleRegister() 
          } else {
            Alert.alert('Thông báo', 'Phòng đã đầy, không thể đăng ký');
            return null;
          }
        } else {
          Alert.alert('Lỗi', res2.message || 'Không tìm thấy thông tin phòng');
          return null;
        }
      } else {
        Alert.alert('Không tìm thấy mã kỳ', res.message || 'Không có dữ liệu phù hợp');
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi lấy số lượng:', error);
      Alert.alert('Lỗi server', 'Không thể kết nối đến server');
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
function toMySQLDateOnly(dateStr) {
  if (!dateStr) return '';
  let datePart = dateStr;
  if (dateStr.includes(',')) {
    datePart = dateStr.split(',')[0].trim();
  } else if (dateStr.includes(' ')) {
    datePart = dateStr.split(' ')[0].trim();
  }
  // datePart lúc này là mm/dd/yyyy hoặc dd/mm/yyyy
  const [a, b, c] = datePart.split('/');
  // Nếu tháng > 12 thì chắc chắn là dd/mm/yyyy, ngược lại là mm/dd/yyyy
  let year, month, day;
  if (Number(a) > 12) {
    // dd/mm/yyyy
    day = a;
    month = b;
    year = c;
  } else if (Number(b) > 12) {
    // mm/dd/yyyy
    month = a;
    day = b;
    year = c;
  } else {
    // fallback: mặc định mm/dd/yyyy
    month = a;
    day = b;
    year = c;
  }
  if (!day || !month || !year) return '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

  const handleRegister = async () => {
    if (!registrationInfo.DongY) {
      Alert.alert('Thông báo', 'Bạn cần đồng ý với điều khoản trước khi đăng ký');
      return;
    }
  
    // Lấy các giá trị cần thiết
    const { start, end } = getStartEndDate(registrationInfo.Dot, registrationInfo.Nam);
    const maPhong = registrationInfo.Phong;
    const ngayDangKy = registrationInfo.NgayDangKy;
    const maKy = await getMaKy();
    const phong = await getRoomById1(maPhong);
    console.log('Lỗi:', phong.GiaPhong);
    if (!maKy) return;
    const ngayDangKyMySQL = toMySQLDateOnly(ngayDangKy);
    const startMySQL = toMySQLDate(start);
    const endMySQL = toMySQLDate(end);
    console.log('Giá trị ngày đăng ký gốc:', registrationInfo.NgayDangKy);
    console.log('Sau khi chuyển:', ngayDangKyMySQL);
    // Gọi API insertHopDong
    try {
      const res = await insertHopDong({
        TenDangNhap: user.TenDangNhap,
        MaPhong: maPhong,
        MaKy: maKy,
        NgayDangKy: ngayDangKyMySQL,
        NgayBatDau: startMySQL,
        NgayKetThuc: endMySQL,
        TienPhong: phong.GiaPhong // Thay bằng giá trị thực tế nếu có
      });
      if (res.success) {
  // Sau khi đăng ký thành công, gọi updateRole1
  try {
    const resRole = await updateRole1(user.TenDangNhap);
    console.log('Cập nhật vai trò thành công:', resRole);
    // Tạo user mới với Role = '1'
    const updatedUser = { ...user, Role: '1' };
    navigation.navigate('Registered', { user: updatedUser });
  } catch (error) {
    Alert.alert('Đăng ký thành công', 'Nhưng cập nhật vai trò thất bại!');
  }
} else {
  Alert.alert('Lỗi', res.message || 'Đăng ký hợp đồng thất bại!');
}
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng ký hợp đồng thất bại!');
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
        <Text style={styles.headerText}>Đăng kí ở</Text>
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
            <Picker
              selectedValue={registrationInfo.Tang}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setRegistrationInfo({ ...registrationInfo, Tang: itemValue })
              }>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>

            <Text>Phòng: </Text>
            <Picker
              selectedValue={registrationInfo.Phong}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setRegistrationInfo({ ...registrationInfo, Phong: itemValue })
              }>
              {roomList.length > 0 ? (
                roomList.map((room) => (
                  <Picker.Item key={room.MaPhong} label={room.MaPhong.toString()} value={room.MaPhong} />
                ))
              ) : (
                <Picker.Item label="Không có phòng" value="" />
              )}
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

        <TouchableOpacity style={styles.registerButton} onPress={KiemTraSoLuongNguoi}>
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
