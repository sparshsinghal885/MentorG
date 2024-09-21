import React, { useEffect, useState, useContext } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MyContext from '@/contexts/firebaseContext/MyContext';
import { DotLoader } from 'react-spinners';


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
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { topics } = useContext(MyContext);

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  // Function to get the last 7 days (including today)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i); // Go back i days
      days.push(day.toLocaleDateString('en-US', { weekday: 'long' }));
    }
    return days;
  };

  // Function to map time spent data for the last 7 days
  const getTimeSpentForLast7Days = () => {
    const days = getLast7Days();
    const timeSpentData = days.map((day) => {
      // Return time spent for the day from userData, or 0 if no data
      return userData.dailyTimeSpent[day] || 0;
    });
    return timeSpentData;
  };

  // Safeguard: if userData is not yet loaded, display a loading state
  if (!userData) {
    return <div className='w-full mt-4 flex justify-center'>
      <DotLoader color='#e67715' />
    </div> // You can replace this with a better loading spinner
  }

  // Data for the bar chart using the user's dailyTimeSpent for the last 7 days
  const barChartData = {
    labels: getLast7Days(), // Get the last 7 days' names
    datasets: [
      {
        label: 'Time Spent (hours)',
        data: getTimeSpentForLast7Days(), // Get time spent data for the last 7 days
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

  // Progress bar value as percentage of topics learned
  const progressBarValue = Math.round(
    (userData.totalTopicsLearned / topics.length) * 100
  );

  return (
    <div className="mx-auto  relative flex flex-col md:flex-row lg:h-screen md:space-y-4 overflow-y-auto">
      {/* Card for User Profile and Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row w-full h-auto min-h-full overflow-y-auto">
        {/* User Profile Section */}
        <div className="md:w-1/2 w-full pr-4 flex flex-col">
          <div className="flex items-center mb-4 relative">
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <Button
              onClick={() => navigate('/learn')}
              className="m-2 mb-3 bg-[#e67715] w-1/5 ml-auto"
            >
              Start Learning
            </Button>
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
                  <p>{topics.length}</p>
                </div>
                <div className="flex-1 p-2 border-r border-gray-300">
                  <p className="text-lg font-semibold">Topics Learned</p>
                  <p>{userData.totalTopicsLearned}</p>
                </div>
                <div className="flex-1 p-2">
                  <p className="text-lg font-semibold">Remaining Topics</p>
                  <p>{topics.length - userData.totalTopicsLearned}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-2">Recent Activity</h3>
              <ul className="list-none pl-0 mb-4">
                {userData.recentLearnedTopics.length > 0 ? (
                  topics
                    .filter((topic) => userData.recentLearnedTopics.includes(topic.id))
                    .slice(0, 5)
                    .map((topic, index) => (
                      <li
                        key={index}
                        className="card cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-4 mb-4 lg:w-1/3 "
                        onClick={() => navigate(`/dsa/${topic.id}`)}
                      >
                        <div className="card-title font-bold text-base">{topic.title}</div>
                      </li>
                    ))
                ) : (
                  <li>No recent activity</li>
                )}
              </ul>

              {/* Suggested Topics */}
              <div>
                <h3 className="text-2xl font-semibold mb-2">Suggested Topics</h3>
                <ul className="list-none pl-0 mb-4">
                  {topics
                    .filter((topic) => !userData.recentLearnedTopics.includes(topic.id)) // filter out done topics
                    .slice(0, 3) // take the first 3 suggested topics
                    .map((topic, index) => (
                      <li
                        key={index}
                        className="card cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-4 mb-4 lg:w-1/3"
                        onClick={() => navigate(`/dsa/${topic.id}`)}
                      >
                        <div className="card-title font-bold text-base">{topic.title}</div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 mt-4 ml-6">Daily Time Spent</h2>
          <div className="h-full">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 space-x-4 absolute bottom-4 right-4 m-6">
        <Button
          onClick={() => console.log('invite')}
          className="m-2 mb-3 bg-[#e67715]"
        >
          Invite
        </Button>
        <Button
          onClick={() => console.log('share')}
          className="m-2 mb-3 bg-[#e67715]"
        >
          Share
        </Button>
      </div>
    </div>

  );
};

export default UserDashBoard;
