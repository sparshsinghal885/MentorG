import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ChatBox from './ChatBox';
import CodeBox from './CodeBox';
import MyContext from '@/contexts/firebaseContext/MyContext';
import { getDoc, doc, updateDoc, arrayUnion, increment, collection, query, getDocs, where } from 'firebase/firestore';
import { fireDB } from '@/firebase/firebase';
import { DotLoader } from 'react-spinners';

const TopicPage = () => {
  const { topicid } = useParams(); // Get the topic ID from the route params
  const [openCodeBox, setOpenCodeBox] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(true);
  const { topics, setLoading, loading } = useContext(MyContext);
  const [topic, setTopic] = useState(null);
  const [isMarkedDone, setIsMarkedDone] = useState(false); // Track if the topic is marked as done
  const [userData, setUserData] = useState(null);

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const getTopicData = async () => {
    setLoading(true);
    try {
      const topicDoc = await getDoc(doc(fireDB, "dsaTopics", topicid)); // Get the document from Firestore
      if (topicDoc.exists()) {
        const topicData = topicDoc.data();
        setTopic({ ...topicData, topicid }); // Set the topic data along with its ID
      } else {
        console.error("Topic not found");
      }
    } catch (error) {
      console.error('Error fetching topic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDocumentIdByUid = async (uid) => {
    // Reference to the 'user' collection
    const userCollectionRef = collection(fireDB, 'user');
    
    // Create a query to find documents where 'uid' field matches the given uid
    const q = query(userCollectionRef, where('uid', '==', uid));
    
    try {
      // Execute the query
      const querySnapshot = await getDocs(q);
      
      // Check if any documents match the query
      if (!querySnapshot.empty) {
        // Retrieve the document ID from the first document in the result
        const doc = querySnapshot.docs[0];
        console.log('Document ID:', doc.id);
        return doc.id; // Return the document ID
      } else {
        console.log('No matching document found');
        return null; // Return null if no document is found
      }
    } catch (error) {
      console.error('Error getting document ID:', error);
    }
  };

  const markAsDone = async () => {
    if (!userData) return; // Ensure user data is available

    try {
      const userDocId = await getDocumentIdByUid(userData.uid); // Wait for the document ID
      if (!userDocId) {
        console.error('No user document found for UID:', userData.uid);
        return;
      }

      const userDocRef = doc(fireDB, 'user', userDocId); // Use the document ID to get the reference
      console.log("UID", userData.uid);

      // Update the user's document: Add to recentLearnedTopics and increment totalLearnedTopics
      await updateDoc(userDocRef, {
        recentLearnedTopics: arrayUnion(topicid), // Add topic ID to array
        totalTopicsLearned: increment(1),      // Increment total learned topics
      });

      // Update local state to reflect the change
      setIsMarkedDone(true);
      console.log('User data updated successfully');
      
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Fetch topic data when component mounts or when id changes
  useEffect(() => {
    getTopicData();
  }, [topicid]);

  const toggleView = () => {
    setOpenChatBox(prev => !prev);
    setOpenCodeBox(prev => !prev);
  };

  if (loading) {
    return <div className='w-full mt-4 flex justify-center'>
      <DotLoader color='#e67715' />
    </div>
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* DSA Topic Section (40% of the page) */}
        <div className="w-full lg:w-2/5 bg-white p-6 border-r border-gray-300">
          <h2 className="text-3xl font-semibold text-orange-600 border-b-2 border-orange-300 pb-2 mb-4 text-center">
            {topic?.title}
          </h2>

          {/* Mark as Done Checkbox */}
          <div className=''>
            <input
              type='checkbox'
              id="terms"
              checked={isMarkedDone} // Bind to state
              onChange={markAsDone} // Call markAsDone when changed
              disabled={isMarkedDone} // Disable once marked as done
            />
            <label
              htmlFor="terms"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
            >
              Mark as Done
            </label>
          </div>

          <p className="text-base text-gray-800 leading-relaxed">
            {topic?.description}
          </p>
        </div>

        {/* ChatBox or CodeBox Section (60% of the page) */}
        <div className="w-full lg:w-3/5 bg-white p-6 flex flex-col border-l border-gray-300">
          <div className="flex-1 overflow-y-auto">
            {openChatBox && <ChatBox />}
            {openCodeBox && <CodeBox />}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4 justify-center">
            <Button
              onClick={toggleView}
              variant="outline"
              className="w-32 bg-gray-200 border-gray-400 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-all duration-300 shadow-md"
            >
              {openChatBox ? 'Show CodeBox' : 'Show ChatBox'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
