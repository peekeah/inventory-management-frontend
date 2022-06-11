import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { CategorySelect } from "./CategorySelect.js";

Chart.register(...registerables);

//Generating Random color on basis of data
function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const options = {
  title: {
    display: true,
    text: "Quantities",
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
};

export function Dashboard() {
  let URL = "https://inventory-management-tool-01.herokuapp.com";

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isChecked, setIsChecked] = useState(null);
  const [isScreenLessThanMd, setIsScreenLessThanMd] = useState(1);

  //Fetching Data
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

  //Setting true condition for md breakpoint for conditional rendering
  useEffect(() => {
    if (window.innerWidth < 564) {
      setIsScreenLessThanMd(true);
    } else {
      setIsScreenLessThanMd(false);
    }
  }, []);

  //Filtering Data by Selected Category
  const chartData = {
    labels: data
      .filter((s) => s.category === selectedCategory)
      .map((s) => s.name),
    datasets: [
      {
        label: selectedCategory,
        data: data
          .filter((s) => s.category === selectedCategory)
          .map((s) => s.quantity),
        backgroundColor: data
          .filter((s) => s.category === selectedCategory)
          .map((s) => s.name)
          .map(() => getRandomColor()),
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  //Updating state on resizing the window
  window.addEventListener("resize", function (event) {
    if (window.innerWidth < 564) {
      setIsScreenLessThanMd(true);
    } else {
      setIsScreenLessThanMd(false);
    }
  });

  return (
    <>
      <div className="bg-info">
        <div
          className="d-flex offset-2 offset-md-0 gap-3 justify-content-around"
          style={{ height: "60px" }}
        >
          <CategorySelect
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isScreenLessThanMd={isScreenLessThanMd}
          />
          <div
            className={`form-check form-switch d-flex align-items-center justify-content-end ${
              isScreenLessThanMd ? "" : "gap-1"
            } px-3`}
          >
            <div>
              <input
                className="form-check-input my-0"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={() => setIsChecked(!isChecked)}
              />
            </div>
            <div>
              <label className="form-check-label">
                {isScreenLessThanMd ? null : "Switch to "}
                {isChecked ? "Bar" : "Pie"}
                {isScreenLessThanMd ? null : " Chart"}
              </label>
            </div>
          </div>
        </div>
        <div
          className="d-flex align-items-center justify-content-center bg-dark"
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto justify-content-center">
            {isChecked ? (
              <Doughnut data={chartData} options={options} />
            ) : (
              <Bar data={chartData} options={options} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
