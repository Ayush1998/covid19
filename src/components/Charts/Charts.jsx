import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Charts.module.css";

const Charts = ({ data, country }) => {
  const [dailyData, setDailyData] = useState({});

  const fetchApi = async () => {
    setDailyData(await fetchDailyData());
  };

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["infected", "recovered", "deaths"],
        datasets: [
          {
            label: "people",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    ></Bar>
  ) : null;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Charts;
