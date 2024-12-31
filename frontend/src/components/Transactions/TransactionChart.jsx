import { React, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransaction } from "../../services/transactions/transactionServices";
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });
  const {
    data: transactions,
    isError,
    isLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: () => listTransaction(filters),
    queryKey: ["list-transactions", filters],
  });
  console.log(transactions);

  const total = transactions?.reduce(
    (acc, transaction) => {
      if (transaction.type === "Income") {
        // console.log(transaction.amount);
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  console.log(total);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        labels: "Transaction",
        data: [total?.income, total?.expense],
        backgroundColor: ["#3b82f6", "#ef4444"],
        borderColor: ["#3b82f6", "#ef4444"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maitainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          boxWidth: 10,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Transaction Chart",
        font: {
          size: 14,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div
        style={{
          height: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
