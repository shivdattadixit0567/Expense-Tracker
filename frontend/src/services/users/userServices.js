import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
const apiUrl = import.meta.env.VITE_BASE_URL;

// console.log(BASE_URL);
const token = getUserFromStorage();
console.log(token);

export const loginApi = async (userData) => {
  const response = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  // const response = await axios.post(`${apiUrl}/users/login`, userData);
  const data = await response.json();
  return data;
};

export const registerApi = async (userData) => {
  const response = await axios.post(`${apiUrl}/users/register`, userData);
  return response.data;
};

export const changePassword = async ({ password }) => {
  console.log(password);
  const response = await axios.put(
    `${apiUrl}/users/change-password`,
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
    `${apiUrl}/users/update-profile`,
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
