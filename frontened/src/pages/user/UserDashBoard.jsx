// src/components/Dashboard.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDashBoard = () => {
  // Sample data for the bar chart
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Time Spent (hours)',
        data: [1, 2, 1.5, 2.5, 3, 7, 1.5],
        backgroundColor: 'rgba(255, 165, 0, 0.6)', // Orange color
        borderColor: 'rgba(255, 165, 0, 1)', // Orange color
        borderWidth: 1,
      },
    ],
  };

  // Chart options for the bar chart
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} hours`,
        },
      },
    },
    indexAxis: 'y', // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
        grid: {
          color: 'rgba(255, 165, 0, 0.2)',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Day of the Week',
        },
        grid: {
          color: 'rgba(255, 165, 0, 0.2)',
        },
      },
    },
  };

  // Progress bar value
  const progressBarValue = 70; // Example value

  // Suggested topics
  const suggestedTopics = [
    "Dynamic Programming",
    "Graph Algorithms",
    "Greedy Algorithms",
    "Backtracking",
    "Advanced Data Structures",
  ];

  // Statistics for topics
  const topicsStatistics = {
    totalTopics: 50,
    topicsLearned: 30,
    topicsInProgress: 10,
    remainingTopics: 10,
  };

  return (
    <div className=" mx-auto p-4 relative flex flex-col md:flex-row lg:h-[85vh] md:space-y-4">
      {/* Start Learning Button */}
      <button className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 m-4 mt-8 ">
        Start Learning
      </button>

      {/* Card for User Profile and Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row w-full h-full">
        {/* User Profile Section */}
        <div className="md:w-1/2 w-full pr-4 flex flex-col">
          <div className="flex items-center mb-4 relative">
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">John Doe</h2>
              <p className="text-gray-600">johndoe@example.com</p>
            </div>
          </div>

          {/* User Statistics */}
          <div className="mb-4 flex-grow">
            <h3 className="text-xl font-semibold mb-2">Statistics</h3>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col mb-4">
              <div className="w-full h-12 bg-orange-200 rounded-xl relative mb-4">
                <div
                  className="h-full bg-orange-500 rounded-xl"
                  style={{ width: `${progressBarValue}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                    {progressBarValue}%
                  </div>
                </div>
              </div>

              {/* Topics Statistics */}
              <div className="flex w-full border-t border-gray-300 mt-4">
                <div className="flex-1 p-2 border-r border-gray-300">
                  <p className="text-lg font-semibold">Total Topics</p>
                  <p>{topicsStatistics.totalTopics}</p>
                </div>
                <div className="flex-1 p-2 border-r border-gray-300">
                  <p className="text-lg font-semibold">Topics Learned</p>
                  <p>{topicsStatistics.topicsLearned}</p>
                </div>
                <div className="flex-1 p-2 border-r border-gray-300">
                  <p className="text-lg font-semibold">Topics in Progress</p>
                  <p>{topicsStatistics.topicsInProgress}</p>
                </div>
                <div className="flex-1 p-2">
                  <p className="text-lg font-semibold">Remaining Topics</p>
                  <p>{topicsStatistics.remainingTopics}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Solved Problem A</li>
                <li>Submitted Solution B</li>
                <li>Participated in Contest C</li>
              </ul>

              {/* Suggested Topics */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Suggested Topics</h3>
                <ul className="list-disc pl-5">
                  {suggestedTopics.map((topic, index) => (
                    <li key={index} className="text-gray-600">{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-xl font-semibold mb-4">Daily Time Spent</h2>
          <div className="h-full">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 space-x-4 absolute bottom-4 right-4 m-6">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
          Share Profile
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
          Invite
        </button>
      </div>
    </div>
  );
};

export default UserDashBoard;
