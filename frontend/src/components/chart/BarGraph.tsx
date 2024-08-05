// src/BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface BarChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
}

const defaultColor = 'rgba(54, 162, 235, 0.2)';
const defaultBorderColor = 'rgba(54, 162, 235, 1)';

const BarChart: React.FC<BarChartProps> = ({ labels, data, backgroundColor = defaultColor, borderColor = defaultBorderColor }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Employee Salaries',
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
