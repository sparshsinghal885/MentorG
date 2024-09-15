import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ChatBox from './ChatBox';
import CodeBox from './CodeBox';

const TopicPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const formattedTopic = topic.replace(/-/g, ' ').toUpperCase();

  const [openCodeBox, setOpenCodeBox] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      <div className="flex flex-col lg:flex-row flex-1">
        {/* DSA Topic Section (40% of the page) */}
        <div className="w-full lg:w-2/5 bg-white p-6 border-r border-gray-300">
          <h2 className="text-3xl font-semibold text-orange-600 border-b-2 border-orange-300 pb-2 mb-4 text-center">
            {formattedTopic}
          </h2>
          <p className="text-base text-gray-800 leading-relaxed">
            {/* Detailed information about the DSA topic */}
            This section provides detailed information about {formattedTopic}.
            Explore the algorithm's structure, time complexity, and its practical applications.
          </p>
        </div>

        {/* ChatBox or CodeBox Section (60% of the page) */}
        <div className='w-full lg:w-3/5 bg-white p-6 flex flex-col border-l border-gray-300'>
          <div className='flex-1 overflow-y-auto'>
            {openChatBox && <ChatBox />}
            {openCodeBox && <CodeBox />}
          </div>
          
          {/* Action Buttons */}
          <div className='mt-6 flex space-x-4 justify-center'>
            <Button
              onClick={() => {
                setOpenChatBox((prev) => !prev);
                setOpenCodeBox((prev) => !prev);
              }}
              variant="outline"
              className="w-32 bg-gray-200 border-gray-400 text-gray-800 hover:bg-gray-300 hover:text-gray-900 transition-all duration-300 shadow-md">
              {openChatBox ? 'Show CodeBox' : 'Show ChatBox'}
            </Button>
            {/* <Button
              onClick={() => {
                setOpenChatBox((prev) => !prev);
                setOpenCodeBox((prev) => !prev);
              }}
              className="w-32 bg-[#e67715] text-white hover:bg-[#d65a10] transition-all duration-300 shadow-md">
              {openCodeBox ? 'Show ChatBox' : 'Show CodeBox'}
            </Button> */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TopicPage;
