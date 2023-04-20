import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const registerUser = async (email, password, userName, isEmployee) => {
  const url = `${BASE_URL}/auth/register`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    userName: userName,
    isEmployee: isEmployee ? "1" : "0",
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
