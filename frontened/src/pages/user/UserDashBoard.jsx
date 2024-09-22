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
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MyContext from '@/contexts/firebaseContext/MyContext';
import { DotLoader } from 'react-spinners';
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const { uid } = useParams();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      days.push(day.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }));
    }
    return days;
  };

  const getTimeSpentForLast7Days = () => {
    const days = getLast7Days();
    if (!userData || !userData.dailyTimeSpent) {
      return new Array(7).fill(0);
    }

    return days.map((date) => {
      const timeSpent = userData.dailyTimeSpent[date] || '0h 0m';
      const [hours, minutes] = timeSpent.split(' ').map((time) => {
        const [num, unit] = [parseInt(time), time.slice(-1)];
        return unit === 'h' ? num : 0.01667 * num;
      });
      return hours + minutes;
    });
  };

  if (!userData) {
    return (
      <div className='w-full mt-4 flex justify-center'>
        <DotLoader color='#e67715' />
      </div>
    );
  }

  const barChartData = {
    labels: getLast7Days(),
    datasets: [
      {
        label: 'Time Spent (hours)',
        data: getTimeSpentForLast7Days(),
        backgroundColor: 'rgba(255, 165, 0, 0.6)',
        borderColor: 'rgba(255, 165, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const rawValue = tooltipItem.raw;
            const hours = Math.floor(rawValue);
            const minutes = Math.round((rawValue - hours) * 60);
            return `${hours}h ${minutes}m`;
          },
        },
      },
    },
    indexAxis: 'y',
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
        grid: {
          color: 'rgba(255, 165, 0, 0.2)',
        },
      },
    },
  };

  const progressBarValue = Math.round(
    (userData.totalTopicsLearned / topics.length) * 100
  );

  return (
    <div className="mx-auto relative flex flex-col md:flex-row lg:h-screen md:space-y-4 overflow-y-auto">
      {/* Card for User Profile and Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row w-full h-auto min-h-full overflow-y-auto">
        {/* User Profile Section */}
        <div className="md:w-1/2 w-full pr-4 flex flex-col">
          <div className="flex items-center mb-4 relative">
            <img
              src={`${userData.imageUrl}`}
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
                    .filter((topic) => !userData.recentLearnedTopics.includes(topic.id))
                    .slice(0, 3)
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

        {/* Horizontal Bar Chart Section */}
        <div className="md:w-1/2 w-full flex-grow">
          <h3 className="text-xl font-semibold mb-4">Daily Time Spent (last 7 days)</h3>
          <Bar data={barChartData} options={barChartOptions} />
        </div>


        {/* Action Buttons */}
        <div className="flex justify-end mt-4 space-x-4 absolute bottom-4 right-4 m-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary" className="bg-[#e67715] text-white">Invite</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite Link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">Link</Label>
                  <Input id="invite-link" defaultValue={`${window.location.origin}`} readOnly />
                </div>
                <Button
                  size="sm"
                  className="px-3 bg-[#e67715]"
                  onClick={() => {
                    const inviteInput = document.getElementById('invite-link');
                    inviteInput.select();
                    document.execCommand('copy');
                  }}
                >
                  <span className="sr-only bg-[#e67715]">Copy</span>
                  <Copy className="h-4 w-4 " />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" className="bg-orange-200">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="share-link" className="sr-only">Link</Label>
                  <Input id="share-link" defaultValue={`${window.location.origin}/user-dashboard/${uid}`} readOnly />
                </div>
                <Button
                  size="sm"
                  className="px-3 bg-[#e67715]"
                  onClick={() => {
                    const shareInput = document.getElementById('share-link');
                    shareInput.select();
                    document.execCommand('copy');
                  }}
                >
                  <span className="sr-only bg-[#e67715]">Copy</span>
                  <Copy className="h-4 w-4 " />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" className="bg-orange-200">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

      </div>
    </div>
  );
};

export default UserDashBoard;
