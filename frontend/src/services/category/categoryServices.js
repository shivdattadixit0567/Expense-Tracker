import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
// console.log(BASE_URL);

const token = getUserFromStorage();
export const addCategory = async (categoryData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/categories/create`,
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
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/categories/lists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(response.data);
  return response.data;
};

export const updateCategories = async ({ name, type, id }) => {
  console.log({ name, type, id });
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_URL}/categories/update/${id}`,
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
  const response = await axios.delete(
    `${Process.env.REACT_APP_BASE_URL}/categories/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
