import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
// console.log(BASE_URL);
const token = getUserFromStorage();
console.log(token);
export const addTransaction = async ({
  type,
  amount,
  category,
  date,
  description,
}) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/transactions/create`,
    {
      data: {
        type,
        amount,
        category,
        date,
        description,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(response);
  return response?.data;
};

export const listTransaction = async ({
  startDate,
  endDate,
  type,
  category,
}) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/transactions/lists`,
    {
      params: {
        startDate,
        endDate,
        type,
        category,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(response);
  return response?.data;
};

export const updateTransaction = async ({
  type,
  amount,
  category,
  date,
  description,
  id,
}) => {
  //   console.log({ name, type, id });
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_URL}/transactions/update/${id}`,
    {
      data: {
        type,
        amount,
        category,
        date,
        description,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteTransaction = async (id) => {
  //   console.log({ name, type, id });
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/transactions/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
