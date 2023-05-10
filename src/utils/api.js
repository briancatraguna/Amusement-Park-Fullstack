import axios, { Axios } from "axios";
import { async } from "q";

const BASE_URL = "http://localhost:8080";

export const registerUser = async (registerBody) => {
  const url = `${BASE_URL}/auth/register`;
  const response = await axios.post(url, registerBody);
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
    password: password,
  });
  if (response.status === 201) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getUserProfile = async (accessToken, userId) => {
  console.log(userId);
  if (userId === undefined || userId === null) {
    throw new Error("userId is null or undefined");
  }
  let url = `${BASE_URL}/userInfo?userId=${userId}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const saveUserProfileAPI = async (accessToken, userDetailsObject) => {
  const response = await axios({
    url: `${BASE_URL}/userInfo`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: userDetailsObject,
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const saveGroupsDataAPI = async (accessToken, userGroupsObject) => {
  const response = await axios({
    url: `${BASE_URL}/groups/addNewGroup`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: userGroupsObject,
  });

  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getAttractions = async (accessToken, lotSectionNo) => {
  let url = `${BASE_URL}/attraction/list`;
  if (lotSectionNo != null) {
    url = `${BASE_URL}/attraction/list?lotSectionNo=${lotSectionNo}`;
  }
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getLotSections = async (accessToken) => {
  const url = `${BASE_URL}/attraction/lots`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getStoreCategories = async (accessToken) => {
  const url = `${BASE_URL}/store/categories`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getStores = async (accessToken, categoryId) => {
  let url = `${BASE_URL}/store/list`;
  if (categoryId != null) {
    url = `${BASE_URL}/store/list?categoryId=${categoryId}`;
  }
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getStoreMenu = async (accessToken, storeId) => {
  const url = `${BASE_URL}/store/menu?storeId=${storeId}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getShows = async (accessToken, showTypeId) => {
  let url = `${BASE_URL}/shows/list`;
  if (showTypeId != null) {
    url = `${BASE_URL}/shows/list?showTypeId=${showTypeId}`;
  }
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getShowTypes = async (accessToken) => {
  const url = `${BASE_URL}/shows/types`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const postPlaceOrder = async (accessToken, requestBody) => {
  const url = `${BASE_URL}/order/placeOrder`;
  const response = await axios.post(url, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const postPayment = async (accessToken, stripeTransactionInfo) => {
  return await axios({
    url: `${BASE_URL}/order/payment`,
    method: "post",
    data: stripeTransactionInfo,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getOrders = async (
  accessToken,
  filterInvoiceTypeId,
  filterFromInvoiceDate,
  filterToInvoiceDate
) => {
  const url = `${BASE_URL}/order/getOrders?filterInvoiceTypeId=${filterInvoiceTypeId}&filterFromInvoiceDate=${filterFromInvoiceDate}&filterToInvoiceDate=${filterToInvoiceDate}`;
  return await axios({
    url: url,
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUsersDataForEmployee = async (accessToken, userData) => {
  return await axios({
    url: `${BASE_URL}/employees/usersData`,
    method: "post",
    data: userData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createNewUserByEmployee = async (accessToken, userData) => {
  const response = await axios({
    url: `${BASE_URL}/employees/createNewVisitor`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: userData,
  });

  if (response.status === 201) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const getUserDataByEmail = async (accessToken, email) => {
  const response = await axios({
    url: `${BASE_URL}/employees/getUserDataByEmail`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: email,
  });

  if (response.status === 201) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};

export const addNewVisitorToGroup = async (accessToken, newVisitorData) => {
  const response = await axios({
    url: `${BASE_URL}/groups/addNewVisitorToGroup`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newVisitorData,
  });

  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
};
