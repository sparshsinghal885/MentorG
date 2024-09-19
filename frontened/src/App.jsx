import Footer from "./components/myComponents/Footer";
import NavBar from "./components/myComponents/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import MyContext from "./contexts/firebaseContext/MyContext";


function App() {
  const [user, setUser] = useState(null);
  const { saveUserData } = useContext(MyContext);

  // Function to get user data from localStorage
  function getUserData() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }

  // Function to update the user's time spent
  const updateUserTimeSpent = (day, timeSpent) => {
    if (user) {
      // Make a copy of dailyTimeSpent and update the day
      const updatedDailyTimeSpent = { ...user.dailyTimeSpent, [day]: user.dailyTimeSpent[day] + timeSpent };

      // Create a new user object to avoid mutating state directly
      const updatedUser = { ...user, dailyTimeSpent: updatedDailyTimeSpent };
      setUser(updatedUser);

      // Save updated user data
      saveUserData(updatedUser);
    }
  };

  useEffect(() => {
    // Fetch user data when component mounts
    getUserData();

    const startTime = new Date().getTime();

    const handleUnload = () => {
      const endTime = new Date().getTime();
      const timeSpent = Math.floor((endTime - startTime) / 1000); // Time spent in seconds

      // Get the current day
      const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

      // Update user's time spent
      updateUserTimeSpent(currentDay, timeSpent);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload(); // Trigger the calculation even if navigating away
    };
  }, [user]); // Ensure that this effect runs when user data changes

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
