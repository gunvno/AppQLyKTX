const BASE_URL = 'http://192.168.2.5:3000';  // <-- Đổi IP máy bạn

export const login = async (TenDangNhap, Password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ TenDangNhap, Password }),
  });
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users/all`);
  return response.json();
};

export const addUser = async (id, email, password, hoten, mssv, anh, role ) => {
  const response = await fetch(`${BASE_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id, email, password, hoten, mssv, anh, role }),
  });
  return response.json();
};
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getUserById/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getUserById:', error);
    throw error;
  }
};
export const getUserNotRegisteredById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getUserNotRegisteredById/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getUserNotRegisteredById:', error);
    throw error;
  }
};
export const getContractByUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getContractByUser/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getContractByUser:', error);
    throw error;
  }
};
export const getContractByContractId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getContractByContractId/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getContractByContractId:', error);
    throw error;
  }
}
export const updatePassword = async (id, newPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/users/updatePassword/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API updatePassword:', error);
    throw error;
  }
};
export const getRequestById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getRequestById/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getRequestById:', error);
    throw error;
  }
};
export const sendPassword = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/sendPassword/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const text = await response.text();
    console.log('Raw response:', text); // Thêm dòng này để xem backend trả về gì
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API sendPassword:', error);
    throw error;
  }
};
export const getRoomByFloor = async (floor) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getRoomByFloor/${floor}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getRoomByFloor:', error);
    throw error;
  }
};
export const getMaKyByHocKyVaNamBatDau = async (HocKy, NamBatDau) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getMaKyByHocKyVaNamBatDau/${HocKy}/${NamBatDau}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getMaKyByHocKyVaNamBatDau:', error);
    throw error;
  }
};
export const insertHopDong = async (hopDong) => {
  try {
    const response = await fetch(`${BASE_URL}/users/insertHopDong`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hopDong),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API insertHopDong:', error);
    throw error;
  }
}
export const updateRole1 = async (TenDangNhap) => {
  try {
    const response = await fetch(`${BASE_URL}/users/updateRole1/${TenDangNhap}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API updateRole1:', error);
    throw error;
  }
};
export const getRoomById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getRoomById/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getRoomById:', error);
    throw error;
  }
}
export const updateTrangThaiHuyHopDong = async (MaHD) => {
  try {
    const response = await fetch(`${BASE_URL}/users/updateTrangThaiHuyHopDong/${MaHD}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API updateTrangThaiHuyHopDong:', error);
    throw error;
  }
}
export const updateRole0 = async (TenDangNhap) => {
  try {
    const response = await fetch(`${BASE_URL}/users/updateRole0/${TenDangNhap}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API updateRole0:', error);
    throw error;
  }
};
export const getTotalPeopleByMaPhongAndTrangThaiHopDong = async (MaPhong) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getTotalPeopleByMaPhongAndTrangThaiHopDong/${MaPhong}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getTotalPeopleByMaPhongAndTrangThaiHopDong:', error);
    throw error;
  }
};
export const setNgayKetThucHopDong = async (MaHD, NgayKetThuc) => {
  try {
    const response = await fetch(`${BASE_URL}/users/setNgayKetThucHopDong/${MaHD}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ NgayKetThuc }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API setNgayKetThucHopDong:', error);
    throw error;
  }
}
export const getTangAndPhongByMaHopDong = async (MaHD) => {
  try {
    const response = await fetch(`${BASE_URL}/users/getTangAndPhongByMaHopDong/${MaHD}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getTangAndPhongByMaHopDong:', error);
    throw error;
  }
}
export const getRequestsByUsername  = async (id) =>{
  try { 
    const response = await fetch(`${BASE_URL}/users/getRequestsByUsername/${id}`);
    const data = await response.json();
    return data;
    } catch (error) {
      console.error('Lỗi khi gọi API getRequestsByUsername:', error);
      throw error;
      }
}
export const createRequest = async (requestData) => {
  const response = await fetch(`${BASE_URL}/users/createRequest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });

  const text = await response.text();  // Lấy raw text phản hồi

  try {
    // Cố gắng parse JSON
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Response is not JSON:', text);
    throw error;
  }
};
export const getRequestDetail = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/users/request/${id}`);

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Server trả về không phải JSON (có thể HTML lỗi)
      const text = await res.text();
      console.error('Response is not JSON:', text);
      return { success: false, message: 'Phản hồi không hợp lệ từ server' };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Lỗi fetch getRequestDetail:', error);
    return { success: false, message: 'Lỗi kết nối đến server' };
  }
};

export const cancelRequest = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/users/request/cancel/${id}`, {
      method: 'PUT',
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('Response is not JSON:', text);
      return { success: false, message: 'Phản hồi không hợp lệ từ server' };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Lỗi fetch cancelRequest:', error);
    return { success: false, message: 'Lỗi kết nối đến server' };
  }
};
export const getBillsByUsername = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/bills/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getBillsByUsername:', error);
    throw error;
  }
};



// Lấy chi tiết hóa đơn theo MaHD
export const getBillDetail = async (billId) => {
  try {
    const response = await fetch(`${BASE_URL}/bills/detail/${billId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getBillDetail:', error);
    throw error;
  }
};

//Cập nhật trạng thái hóa đơn
export const updateBillStatus = async (MaHD, status) => {
  try {
    const response = await fetch(`${BASE_URL}/bills/update-status/${MaHD}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ TrangThai: status }),
    });

    // Nếu không phản hồi thành công
    if (!response.ok) {
      const errorText = await response.text(); 
      console.error('Lỗi từ server:', errorText);
      throw new Error('Server trả về lỗi, không phải JSON');
    }

    // Nếu ok, cố gắng parse JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái:', error);
    throw error;
  }
};

export const getBillsByUserId = async (username) => {
  try {
    console.log('Gọi API getBillsByUserId với username:', username);
    const response = await fetch(`${BASE_URL}/bills/all/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API getBillsByUserId:', error);
    throw error;
  }
};

export default { login, getAllUsers, addUser, getUserById, getUserNotRegisteredById, 
  getContractByUser, getContractByContractId, updatePassword, sendPassword,getRoomByFloor,
  getMaKyByHocKyVaNamBatDau, insertHopDong, getRequestById, updateRole1, getRoomById,
  updateTrangThaiHuyHopDong, updateRole0, getTotalPeopleByMaPhongAndTrangThaiHopDong,
   setNgayKetThucHopDong, getTangAndPhongByMaHopDong, getRequestsByUsername, createRequest, 
   getRequestDetail, cancelRequest, getBillsByUsername, getBillDetail, updateBillStatus, getBillsByUserId };