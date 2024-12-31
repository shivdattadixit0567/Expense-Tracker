import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
console.log(BASE_URL);
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
    `${BASE_URL}/transactions/create`,
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
  const response = await axios.get(`${BASE_URL}/transactions/lists`, {
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
  });
  // console.log(response);
  return response?.data;
};

export const updateTransaction = async (id) => {
  //   console.log({ name, type, id });
  const response = await axios.delete(`${BASE_URL}/transactions/put/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTransaction = async (id) => {
  //   console.log({ name, type, id });
  const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
