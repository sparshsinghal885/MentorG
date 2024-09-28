import Footer from "./components/myComponents/Footer";
import NavBar from "./components/myComponents/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
import MyContext from "./contexts/firebaseContext/MyContext";

function App() {
  const { updateDailyTimeSpent, fetchUserForLocalStorage } = useContext(MyContext);

  useEffect(() => {
    // Function to update local storage with Firebase data
    const updateLocalStorageWithFirebaseData = async () => {
      const userData = await fetchUserForLocalStorage(); // Fetch user data from Firebase
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData)); // Update local storage
        updateDailyTimeSpent(userData); // Update context if needed
      }
    };

    updateLocalStorageWithFirebaseData();

    const todayDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    // Load existing time from local storage
    let totalTimeSpentInSeconds = 0;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.dailyTimeSpent[todayDate]) {
      const existingTime = storedUser.dailyTimeSpent[todayDate];
      const [existingHours, existingMinutes] = existingTime.split('h').map(time => parseInt(time));
      totalTimeSpentInSeconds += existingHours * 3600 + existingMinutes * 60; // Convert to seconds
    }

    let startTime = Date.now(); // Track when the user starts

    function updateTimeSpent() {
      const endTime = Date.now();
      const timeSpentInSeconds = Math.round((endTime - startTime) / 1000);
      totalTimeSpentInSeconds += timeSpentInSeconds; // Accumulate the total time

      const hours = Math.floor(totalTimeSpentInSeconds / 3600);
      const minutes = Math.floor((totalTimeSpentInSeconds % 3600) / 60);

      if (storedUser) {
        storedUser.dailyTimeSpent[todayDate] = `${hours}h ${minutes}m`;
        localStorage.setItem("user", JSON.stringify(storedUser));
        updateDailyTimeSpent(storedUser);
      }

      // Reset startTime for the next interval
      startTime = Date.now();
    }

    const intervalId = setInterval(updateTimeSpent, 60 * 1000);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        startTime = Date.now(); // Reset startTime when the user returns
      } else {
        updateTimeSpent(); // Update time when the user leaves
      }
    });

    return () => {
      clearInterval(intervalId);
    };
  }, [updateDailyTimeSpent, fetchUserForLocalStorage]);

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
