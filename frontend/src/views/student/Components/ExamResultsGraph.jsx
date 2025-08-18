// src/views/ExamResultsGraph.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExamResultsGraph = ({ examId }) => {
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    // Fetch results from backend API
    axios
      .get(`/api/results/${examId}/marks`)
      .then((res) => setMarksData(res.data))
      .catch((err) => console.error('Error fetching marks:', err));
  }, [examId]);

  // Prepare data for the chart
  const data = {
    labels: marksData.map(item => item.studentName),
    datasets: [
      {
        label: 'Marks',
        data: marksData.map(item => item.marks),
        backgroundColor: '#8C4AF2',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Student Marks',
        color: '#8C4AF2',
        font: { size: 18, weight: 'bold' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#222' },
        grid: { color: '#EFEFEF' },
      },
      y: {
        ticks: { color: '#222' },
        grid: { color: '#EFEFEF' },
        title: { display: true, text: 'Marks', color: '#8C4AF2', font: { size: 14 } }
      }
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24 }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExamResultsGraph;
