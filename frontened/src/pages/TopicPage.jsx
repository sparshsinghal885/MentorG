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
  const { topicid } = useParams();
  const [openCodeBox, setOpenCodeBox] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(true);
  const { setLoading, loading, fetchUser } = useContext(MyContext);
  const [topic, setTopic] = useState(null);
  const [isMarkedDone, setIsMarkedDone] = useState(false);
  const [user, setUser] = useState({});

  // Fetch topic data
  const getTopicData = async () => {
    setLoading(true);
    try {
      const topicDoc = await getDoc(doc(fireDB, "dsaTopics", topicid));
      if (topicDoc.exists()) {
        setTopic({ ...topicDoc.data(), topicid });
      } else {
        console.error("Topic not found");
      }
    } catch (error) {
      console.error('Error fetching topic data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get user document ID by UID
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

  // Mark the topic as done
  const markAsDone = async () => {
    if (isMarkedDone || !user) return;

    try {
      const userDocId = await getDocumentIdByUid(user.uid);
      if (!userDocId) {
        console.error('No user document found for UID:', user.uid);
        return;
      }

      const userDocRef = doc(fireDB, 'user', userDocId);
      await updateDoc(userDocRef, {
        recentLearnedTopics: arrayUnion(topicid),
        totalTopicsLearned: increment(1),
      });

      const updatedUserData = {
        ...user,
        recentLearnedTopics: [...user.recentLearnedTopics, topicid],
        totalTopicsLearned: user.totalTopicsLearned + 1,
      };
      setIsMarkedDone(true);
      setUser(updatedUserData);
      localStorage.setItem('user', JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Fetch the latest user data and update local storage
  const refreshUserData = async () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      const latestUserData = await fetchUser(localUser.uid);
      if (latestUserData) {
        localStorage.setItem('user', JSON.stringify(latestUserData));
        setUser(latestUserData);
      }
    }
  };

  useEffect(() => {
    getTopicData();
  }, [topicid]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
    refreshUserData();

    const completedTopics = localUser?.recentLearnedTopics || [];
    if (completedTopics.includes(topicid)) {
      setIsMarkedDone(true);
    } else {
      setIsMarkedDone(false);
    }
  }, [topicid]);

  const toggleView = () => {
    setOpenChatBox(prev => !prev);
    setOpenCodeBox(prev => !prev);
  };

  if (loading) {
    return (
      <div className='w-full mt-4 flex justify-center'>
        <DotLoader color='#e67715' size={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Topic Description Section */}
        <div className="w-full lg:w-2/5 bg-white p-6 border-r border-gray-200 shadow-sm">
          <h2 className="text-3xl font-bold text-orange-500 border-b-2 border-orange-300 pb-2 mb-4 text-center">
            {topic?.title}
          </h2>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={isMarkedDone}
                onChange={(e) => {
                  e.preventDefault();
                  markAsDone();
                }}
                disabled={isMarkedDone}
                className="form-checkbox h-5 w-5 text-orange-500"
              />
              <span className="text-gray-700">Mark as Done</span>
            </label>
          </div>

          <p className="text-base text-gray-800 leading-relaxed mb-4">
            {topic?.description}
          </p>
        </div>

        {/* ChatBox and CodeBox Section */}
        <div className="w-full lg:w-3/5 bg-white p-6 flex flex-col border-l border-gray-200 shadow-sm">
          <div className="flex-1 overflow-y-auto mb-4">
            {openChatBox && <ChatBox />}
            {openCodeBox && <CodeBox />}
          </div>

          <div className="mt-6 flex space-x-4 justify-center">
            <Button
              onClick={toggleView}
              variant="outline"
              className="w-36 bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 shadow-md"
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
