import React from 'react';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Pop',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(192,75,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [88, 84, 85, 75, 93, 88, 84, 85, 75, 93, 88, 84]
    },
    {
      label: 'Rock',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(192,192,75,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [35, 45, 55, 65, 75, 35, 45, 55, 65, 75, 35, 45]
    },
    {
      label: 'Latin',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(120,120,120,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [15, 35, 59, 81, 56, 15, 35, 59, 81, 56, 15, 35]
    },
    {
      label: 'R&B',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 65, 59]
    },
    {
      label: 'Jazz',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(192,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [10, 12, 13, 9, 11, 10, 12, 13, 9, 11, 10, 12]
    }
  ]
}

const ChartGenre = (props) => {
    return (
      <div>
        <Line
          data={data}
        />
      </div>
    );
  }

export default ChartGenre