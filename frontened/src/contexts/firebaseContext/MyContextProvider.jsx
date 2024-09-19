import React, { useEffect } from "react";
import MyContext from "./MyContext.jsx";
import { useState } from "react";
import { fireDB } from "@/firebase/firebase.js";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

function MyContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]); // State to hold all topics

  // Function to fetch all topics from Firestore
  const fetchAllTopics = async () => {
    setLoading(true);
    try {
      const topicsRef = collection(fireDB, "dsaTopics");

      // Get all documents in the dsaTopics collection
      const snapshot = await getDocs(topicsRef);
      const allTopics = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Store all the fetched topics in the state
      setTopics(allTopics);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    fetchAllTopics();
  }, []);

  // Function to save user data using Firestore
  const saveUserData = async (user) => {
    try {
      const userRef = doc(fireDB, "users", user.uid); // Reference to user document

      await updateDoc(userRef, {
        dailyTimeSpent: user.dailyTimeSpent,
      });

      console.log("User time updated successfully!");
    } catch (error) {
      console.error("Error updating user time: ", error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
        topics,
        saveUserData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyContextProvider;
