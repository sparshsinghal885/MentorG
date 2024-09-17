import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ChatBox from './ChatBox';
import CodeBox from './CodeBox';
import MyContext from '@/contexts/firebaseContext/MyContext';
import { getDoc, doc } from 'firebase/firestore';
import { fireDB } from '@/firebase/firebase';

const TopicPage = () => {
  const { topicid } = useParams();
  const [openCodeBox, setOpenCodeBox] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(true);
  const { topics,setLoading } = useContext(MyContext);
  const [topic, setTopic] = useState(null)

  const getTopicData = async () => {
    setLoading(true);
    try {
      console.log("Id", topicid);
      const topicDoc = await getDoc(doc(fireDB, "dsaTopics", topicid)); // Get the document from Firestore
      console.log('object')
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

  // Fetch topic data when component mounts or when id changes
  useEffect(() => {

    getTopicData();

  }, [topicid]);

  const toggleView = () => {
    setOpenChatBox(prev => !prev);
    setOpenCodeBox(prev => !prev);
  };
  // console.log(topics)
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* DSA Topic Section (40% of the page) */}
        <div className="w-full lg:w-2/5 bg-white p-6 border-r border-gray-300">
          <h2 className="text-3xl font-semibold text-orange-600 border-b-2 border-orange-300 pb-2 mb-4 text-center">
            {topic?.title}
          </h2>
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
