import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
console.log(BASE_URL);
const token = getUserFromStorage();
console.log(token);

export const loginApi = async (userData) => {
  const response = await axios.post(
    `${Process.env.REACT_APP_BASE_URL}/users/login`,
    userData
  );
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await axios.post(
    `${Process.env.REACT_APP_BASE_URL}/users/register`,
    userData
  );
  return response.data;
};

export const changePassword = async ({ password }) => {
  console.log(password);
  const response = await axios.put(
    `${Process.env.REACT_APP_BASE_URL}/users/change-password`,
    {
      data: {
        password,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateProfile = async ({ email, username }) => {
  const response = await axios.put(
    `${Process.env.REACT_APP_BASE_URL}/users/update-profile`,
    {
      data: {
        email,
        username,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
