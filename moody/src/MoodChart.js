import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; 

Chart.register(...registerables);

const MoodChart = ({ data, isNightMode }) => {
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isNightMode ? '#fff' : '#000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isNightMode ? '#fff' : '#000',
        },
        grid: {
          color: isNightMode ? '#444' : '#ddd',
        },
      },
      y: {
        ticks: {
          color: isNightMode ? '#fff' : '#000',
        },
        grid: {
          color: isNightMode ? '#444' : '#ddd',
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar
        key={JSON.stringify(data)}
        data={{
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              backgroundColor: isNightMode ? 'rgba(255, 255, 255, 0.7)' : data.datasets[0].backgroundColor,
            },
          ],
        }}
        options={chartOptions}
      />
    </div>
  );
};

export default MoodChart;
