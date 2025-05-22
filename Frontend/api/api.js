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
export default { login, getAllUsers, addUser, getUserById, getUserNotRegisteredById, getContractByUser, getContractByContractId };