import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
// console.log(BASE_URL);
const apiUrl = import.meta.env.VITE_API_URL;

const token = getUserFromStorage();
export const addCategory = async (categoryData) => {
  const response = await axios.post(
    `${apiUrl}/categories/create`,
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const listCategories = async () => {
  console.log(token);
  const response = await axios.get(`${apiUrl}/categories/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data;
};

export const updateCategories = async ({ name, type, id }) => {
  console.log({ name, type, id });
  const response = await axios.put(
    `${apiUrl}/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteCategories = async (id) => {
  //   console.log({ name, type, id });
  const response = await axios.delete(`${apiUrl}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
