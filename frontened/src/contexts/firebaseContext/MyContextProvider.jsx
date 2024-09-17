import React, { useEffect } from "react";
import MyContext from "./MyContext.jsx";
import { useState } from "react";
import { fireDB } from "@/firebase/firebase.js";
import { collection, getDocs, getDoc } from "firebase/firestore";

function MyContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);  // State to hold all topics

  // Function to fetch all topics from Firestore
  const fetchAllTopics = async () => {
    setLoading(true);
    try {
      const topicsRef = collection(fireDB, "dsaTopics");

      // Get all documents in the dsaTopics collection
      const snapshot = await getDocs(topicsRef);
      const allTopics = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
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
    const user = JSON.parse(localStorage.getItem('users'));
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    fetchAllTopics();
  }, [])


  return (
    <MyContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      loading,
      setLoading,
      topics,
    }}>
      {children}
    </MyContext.Provider>
  )
}


export default MyContextProvider;