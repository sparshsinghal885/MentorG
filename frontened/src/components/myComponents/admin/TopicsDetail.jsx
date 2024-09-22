import React from 'react'
import TopicRow from './TopicRow';
import { useContext } from 'react';
import MyContext from '@/contexts/firebaseContext/MyContext';
import { Link } from 'react-router-dom';

const TopicsDetail = () => {
  const { topics } = useContext(MyContext)

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        <h1 className=" text-2xl text-slate-900 font-bold">All Topics</h1>
        <Link to={'/add-topic'}>
          <button className="px-5 py-2 bg-[#e67715] border border-white text-white 
          transform hover:scale-105 transition-all duration-200  rounded-lg">Add Topic</button>
        </Link>
      </div>
      {/* table  */}
      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full text-left border border-collapse sm:border-separate border-orange-200 text-slate-400" >
          <tbody>
            <tr>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100 font-bold fontPara">S.No.</th>

              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100">Title</th>

              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100">Category</th>

              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100">Date</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100">Action</th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100">Action</th>
            </tr>

            {topics.map((topic, index) => {
              return (
                <TopicRow
                  key={topic.id}
                  item={topic}
                  index={index}
                />
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopicsDetail
