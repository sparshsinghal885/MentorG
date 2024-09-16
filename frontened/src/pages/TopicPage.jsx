import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ChatBox from './ChatBox';
import CodeBox from './CodeBox';
import MyContext from '@/contexts/firebaseContext/MyContext';

const TopicPage = () => {
  const { topic } = useParams();
  const formattedTopic = topic.replace(/-/g, ' ').toUpperCase();

  const [openCodeBox, setOpenCodeBox] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(true);
  const { topics } = useContext(MyContext);
  const [filteredTopic, setFilteredTopic] = useState(null);

  // Find topic by title
  const findTopicByTitle = (title) => {
    const normalizedTitle = title.toUpperCase();
    return topics.find(topic => topic.title.toUpperCase() === normalizedTitle) || null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setFilteredTopic(findTopicByTitle(formattedTopic));
  }, [formattedTopic, topics]); // Add dependencies to ensure useEffect runs when these change

  const toggleView = () => {
    setOpenChatBox(prev => !prev);
    setOpenCodeBox(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* DSA Topic Section (40% of the page) */}
        <div className="w-full lg:w-2/5 bg-white p-6 border-r border-gray-300">
          <h2 className="text-3xl font-semibold text-orange-600 border-b-2 border-orange-300 pb-2 mb-4 text-center">
            {filteredTopic?.title}
          </h2>
          <p className="text-base text-gray-800 leading-relaxed">
            {filteredTopic?.description}
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
