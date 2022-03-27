import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ChartGenre.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function capitalize(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string;
  }
}

const transformDataToArray = (mode, data) => {
  let dataArray = [];
  let dates = [
    "2021-01-01",
    "2021-02-01",
    "2021-03-01",
    "2021-04-01",
    "2021-05-01",
    "2021-06-01",
    "2021-07-01",
    "2021-08-01",
    "2021-09-01",
    "2021-10-01",
    "2021-11-01",
    "2021-12-01",
  ];

  if (mode === "single") {
    for (let i = 0; i < dates.length; i++) {
      try {
        dataArray[i] = data.filter(
          (months) => months.date === dates[i]
        )[0].rank_aggregate;
      } catch (error) {
        dataArray[i] = 0;
      }
    }
  } else {
    for (const genres of data) {
      let dataPerGenreArray = []; // 1 array of 6 arrays

      for (const [i, date] of dates.entries()) {
        // for each month
       
        if (genres.filter(genre => genre.date === date)[0] !== undefined) {
          // console.log(genres.filter(genre => genre.date === date)[0])
          dataPerGenreArray[i] = genres.filter(genre => genre.date === date)[0].rank_aggregate;
        } else {
          // console.log(i)
          dataPerGenreArray[i] = 0;
        }

        // console.log(dataPerGenreArray)
      }

      dataArray.push(dataPerGenreArray);
      // console.log(dataPerGenreArray)
    }
  }

  return dataArray;
};

const ChartGenre = (props) => {
  const allData = props.data;

  let data;
  if (props.mode === "single") {
    data = {
      labels: labels,
      datasets: [
        {
          label: `Popularity index of ${capitalize(props.genre)}`,
          fill: true,
          lineTension: 0.5,
          backgroundColor: "wheat",
          borderColor: "wheat",
          borderWidth: 2,
          data: transformDataToArray("single", allData),
        },
      ],
    };
  } else {
    console.log(allData);
    data = {
      labels: labels,
      datasets: [
        {
          label: capitalize(props.genre[0]),
          fill: true,
          lineTension: 0.5,
          backgroundColor: "goldenrod",
          borderColor: "goldenrod",
          borderWidth: 2,
          data: transformDataToArray("multiple", allData)[0],
        },
        {
          label: capitalize(props.genre[1]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "silver",
          borderColor: "silver",
          borderWidth: 2,
          data: transformDataToArray("multiple", allData)[1],
        },
        {
          label: capitalize(props.genre[2]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "brown",
          borderColor: "brown",
          borderWidth: 2,
          data: transformDataToArray("multiple", allData)[2],
        },
        {
          label: capitalize(props.genre[3]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          data: transformDataToArray("multiple", allData)[3],
        },
        {
          label: capitalize(props.genre[4]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(192,192,192,1)",
          borderColor: "rgba(192,192,192,1)",
          borderWidth: 2,
          data: transformDataToArray("multiple", allData)[4],
        },
        {
          label: capitalize(props.genre[5]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(101,56,192,1)",
          borderColor: "rgba(101,56,192,1)",
          borderWidth: 2,
          data: transformDataToArray("multiple", allData)[5],
        },
      ],
    };
  }

  const config = {
    responsive: true,

    scales: {
      x: {
        ticks: {
          color: "wheat",
        },
        grid: {
          color: "rgba(245,222,179,0.4)",
          borderColor: "wheat",
        },
      },

      y: {
        ticks: {
          color: "wheat",
        },
        grid: {
          color: "rgba(245,222,179,0.4)",
          borderColor: "wheat",
        },
      },
    },
  };

  return (
    <div className="chart__wrapper">
      <div className="chart__container">
        <div className="chart__chart">
          <Line data={data} options={config} />
        </div>
      </div>
    </div>
  );
};

export default ChartGenre;
