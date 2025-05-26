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
export default { login, getAllUsers, addUser, getUserById, getUserNotRegisteredById, 
  getContractByUser, getContractByContractId, updatePassword, sendPassword,getRoomByFloor,
  getMaKyByHocKyVaNamBatDau, insertHopDong, getRequestById, updateRole1, getRoomById,
  updateTrangThaiHuyHopDong, updateRole0 };