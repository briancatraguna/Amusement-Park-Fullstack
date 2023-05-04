import axios, { Axios } from "axios";

const BASE_URL = "http://localhost:8080";

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

export const getUserProfile = async (accessToken, userId) => {
  if(userId === undefined || userId === null){
    throw new Error("userId is null or undefined")
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
    throw new Error(response.data.message)
  }
}

export const saveUserProfileAPI = async (accessToken,userDetailsObject) => {
 
  const response = await axios({
    url : `${BASE_URL}/userInfo`,
    method : "post",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    data : userDetailsObject
    
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
}

export const saveGroupsDataAPI = async (accessToken, userGroupsObject) => {
 
  const response = await axios({
    url : `${BASE_URL}/groups/addNewGroup`,
    method : "post",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    data : userGroupsObject
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error(response.data.message);
    }

}
  
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
    throw new Error(response.data.message)
  }
}

export const getLotSections = async (accessToken) => {
  const url = `${BASE_URL}/attraction/lots`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  });
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data.message);
  }
}





