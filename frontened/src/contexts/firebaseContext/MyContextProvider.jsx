import React, { useEffect } from "react";
import MyContext from "./MyContext.jsx";
import { useState } from "react";
import { fireDB } from "@/firebase/firebase.js";
import { collection, getDocs, doc, updateDoc, getDoc, where, query } from "firebase/firestore";

function MyContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]); // State to hold all topics
  const [userData, setUserData] = useState(null);

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
  const updateDailyTimeSpent = async (user) => {
    try {
      const userDocId = await getDocumentIdByUid(user.uid);
      if (!userDocId)
        return;

      const userDocRef = doc(fireDB, 'user', userDocId); // Reference to user document

      await updateDoc(userDocRef, {
        dailyTimeSpent: user.dailyTimeSpent,
      });
    } catch (error) {
      console.error("Error updating user time: ", error);
    }
  };

  const getDocumentIdByUid = async (uid) => {
    const userCollectionRef = collection(fireDB, 'user');
    const q = query(userCollectionRef, where('uid', '==', uid));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.id;
      } else {
        console.log('No matching document found');
        return null;
      }
    } catch (error) {
      console.error('Error getting document ID:', error);
    }
  };

  const fetchUser = async (uid) => {
    try {
      const userDocId = await getDocumentIdByUid(uid);
      if (!userDocId)
        return;

      const userDocRef = doc(fireDB, 'user', userDocId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log('No such user document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchUserForLocalStorage = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    try {
      const userDocId = await getDocumentIdByUid(storedUser.uid);
      if (!userDocId)
        return;

      const userDocRef = doc(fireDB, 'user', userDocId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data()
      } else {
        console.log('No such user document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MyContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
        topics,
        updateDailyTimeSpent,
        fetchUser,
        userData,
        setUserData,
        fetchUserForLocalStorage
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyContextProvider;
