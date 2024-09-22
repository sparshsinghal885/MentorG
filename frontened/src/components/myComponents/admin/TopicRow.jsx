import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '@/contexts/firebaseContext/MyContext';
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from '@/firebase/firebase';

const TopicRow = ({ item, index }) => {

  const { id, title, category, date } = item;
  const { fetchAllTopics } = useContext(MyContext); 
  const navigate = useNavigate();

  const deleteTopic = async (id) => {
    try {
      await deleteDoc(doc(fireDB, 'dsaTopics', id));  
      fetchAllTopics();
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  return (
    <tr key={id} className="text-slate-300">  
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 ">
        {index + 1}
      </td>
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
        {title}
      </td>
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
        {category}
      </td>
      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-slate-500 first-letter:uppercase ">
        {date}
      </td>
      <td
        onClick={() => navigate(`/updateproduct/${id}`)}
        className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-green-500 cursor-pointer ">
        Edit
      </td>
      <td
        onClick={() => deleteTopic(id)}
        className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-neutral-200 stroke-slate-500 text-red-500 cursor-pointer ">
        Delete
      </td>
    </tr>
  );
};

export default TopicRow;
