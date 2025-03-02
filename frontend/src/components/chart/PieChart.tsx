import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
}

const defaultColors = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
  ],
  borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
  ],
};

const PieChart: React.FC<PieChartProps> = ({ labels, data, backgroundColor = defaultColors.backgroundColor, borderColor = defaultColors.borderColor }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Employee Salary (in $)',
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
