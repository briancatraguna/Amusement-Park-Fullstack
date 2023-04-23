import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export const registerUser = async (email, password, userName, roleId) => {
  const url = `${BASE_URL}/auth/register`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    userName: userName,
    roleId: roleId,
  });
  if (response.status === 201) {
    return { success: true, message: response.data.message };
  } else {
    throw new Error(response.data.message);
  }
};

export const loginUser = async (email, password) => {
    const url = `${BASE_URL}/auth/login`;
    const response = await axios.post(url, {
        email: email,
        password: password
    });
    if (response.status === 201) {
        return { success: true, data: response.data };
    } else {
        throw new Error(response.data.message);
    }
}

