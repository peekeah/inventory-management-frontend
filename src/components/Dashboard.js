import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { CategorySelect } from "./CategorySelect.js";
Chart.register(...registerables);

export function Dashboard() {
  let URL = "https://inventory-management-tool-01.herokuapp.com";

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${URL}/get-items`);
      setData(res.data);
      let listData = res.data.map((s) => s.category);
      setCategory([...new Set(listData)]);
      setSelectedCategory(listData[0]);
    };
    getData();
  }, []);
  
  const chartData = {
    labels: data.filter((s) => s.category === selectedCategory).map((s) => s.name),
    datasets: [
      {
        label: selectedCategory,
        data: data
          .filter((s) => s.category === selectedCategory)
          .map((s) => s.quantity),
        backgroundColor: [
            "red",
        //   "rgba(255, 255, 285, 0.5)",
        //   "rgba(255, 255, 255, 0.6)",
        //   "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <CategorySelect
        category={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="d-flex">
        <div className="col-8 mx-auto justify-content-center">
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Quantities",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
