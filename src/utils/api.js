const axios = require('axios').default;

export const registerUser = async (email, password, userName, isEmployee) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
            email: email,
            password: password,
            userName: userName,
            isEmployee: isEmployee
        });
        if (response.status === 201) {
            return { success: true, message: response.data.message }
        }
    } catch (error) {
        if (error.response.status === 409) {
            return { success: false, message: response.data.message}
        }
    }
}