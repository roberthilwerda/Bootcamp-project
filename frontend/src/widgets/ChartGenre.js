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

function capitalize(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string;
  }
}

const getLabels = (startYear, endYear) => {
  const dates = [];
  for (let year = startYear; year <= endYear; year++) {
    dates.push(
      `${year} Jan`,
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
      "December"
    );
  }
  return dates;
};

const getDates = (startYear, endYear) => {
  const dates = [];
  for (let year = startYear; year <= endYear; year++) {
    dates.push(
      `${year}-01-01`,
      `${year}-02-01`,
      `${year}-03-01`,
      `${year}-04-01`,
      `${year}-05-01`,
      `${year}-06-01`,
      `${year}-07-01`,
      `${year}-08-01`,
      `${year}-09-01`,
      `${year}-10-01`,
      `${year}-11-01`,
      `${year}-12-01`
    );
  }
  return dates;
};

const transformDataToArray = (data, startYear, endYear, genre) => {

  let dataArray = [];
  let dates = getDates(startYear, endYear);

  for (let i = 0; i < dates.length; i++) {
    try {
      dataArray[i] = data.filter(
        (months) => months.date === dates[i]
      )[0].rank_aggregate;
    } catch (error) {
      dataArray[i] = 0;
    }
  }


  return dataArray;
};

const ChartGenre = (props) => {
  const allData = props.data;


  // console.log(transformDataToArray("single", allData, props.startYear, props.endYear))

  let data;
  if (props.mode === "single") {
    data = {
      labels: getLabels(props.startYear, props.endYear),
      datasets: [
        {
          label: `Popularity index of ${capitalize(props.genre)}`,
          fill: true,
          lineTension: 0.5,
          backgroundColor: "wheat",
          borderColor: "wheat",
          borderWidth: 2,
          data: transformDataToArray(
            allData,
            props.startYear,
            props.endYear
            // props.genre
          ),
        },
      ],
    };
  } else {
    data = {
      labels: getLabels(props.startYear, props.endYear),

      datasets: [
        {
          label: capitalize(props.genreArray[0]),
          fill: true,
          lineTension: 0.5,
          backgroundColor: "goldenrod",
          borderColor: "goldenrod",
          borderWidth: 2,
          data: transformDataToArray(
            allData.filter(data => data.genre === props.genreArray[0]),
            props.startYear,
            props.endYear,
            // props.genreArray[0]
          ),
        },
        {
          label: capitalize(props.genreArray[1]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "silver",
          borderColor: "silver",
          borderWidth: 2,
          data: transformDataToArray(
            allData.filter(data => data.genre === props.genreArray[1]),
            props.startYear,
            props.endYear,
            // props.genreArray[1]
          ),
        },
        {
          label: capitalize(props.genreArray[2]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "brown",
          borderColor: "brown",
          borderWidth: 2,
          data: transformDataToArray(
            allData.filter(data => data.genre === props.genreArray[2]),
            props.startYear,
            props.endYear,
            props.genreArray[2]
          ),
        },
        {
          label: capitalize(props.genreArray[3]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          data: transformDataToArray(
            allData.filter(data => data.genre === props.genreArray[3]),
            props.startYear,
            props.endYear,
            props.genreArray[3]
          ),
        },
        {
          label: capitalize(props.genreArray[4]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(192,192,192,1)",
          borderColor: "rgba(192,192,192,1)",
          borderWidth: 2,
          data: transformDataToArray(
            allData.filter(data => data.genre === props.genreArray[4]),
            props.startYear,
            props.endYear,
            props.genreArray[4]
          ),
        },
        {
          label: capitalize(props.genreArray[5]),
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(101,56,192,1)",
          borderColor: "rgba(101,56,192,1)",
          borderWidth: 2,
          data: transformDataToArray(
            allData.filter(data => data.genre === props.genreArray[5]),
            props.startYear,
            props.endYear,
            props.genreArray[5]
          ),
        },
      ],
    };
  }

  const displayYear = (startYear, endYear) => {
    let text;
    startYear <= endYear &&
      (startYear === endYear
        ? (text = startYear)
        : (text = `${startYear} - ${endYear}`));
    return text;
  };

  const config = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: displayYear(props.startYear, props.endYear),
        font: { size: 20, color: "red" },
        color: "wheat",
      },
    },

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
