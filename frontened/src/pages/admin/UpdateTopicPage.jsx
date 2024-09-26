import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp, getDoc, setDoc, doc } from "firebase/firestore";
import { fireDB, storage } from "@/firebase/firebase";
import { HashLoader } from "react-spinners";
import MyContext from "@/contexts/firebaseContext/MyContext";


const categoryList = [
  {
    name: 'Data Structure'
  },
  {
    name: 'Algorithm'
  }
];

const UpdateTopicPage = () => {

  const {  loading, setLoading, fetchAllTopics } = useContext(MyContext)

  const navigate = useNavigate();

  const { topicid } = useParams()

  const userData = JSON.parse(localStorage.getItem('user'))

  const [topic, setTopic] = useState({
    title: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const getSingleTopicFunction = async () => {
    setLoading(true);
    try {
      const topiocTemp = await getDoc(doc(fireDB, "dsaTopics", topicid))
      const topic = topiocTemp.data();
      setTopic({
        title: topic?.title,
        category: topic?.category,
        description: topic?.description,
        time: topic?.time,
        date: topic?.date
      })
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleTopicFunction();
  }, []);

  const updateTopic = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, 'dsaTopics', topicid), { ...topic })
      fetchAllTopics();
      setLoading(false)
      navigate(`/admin-dashboard/${userData.uid}`);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        {/* Login Form  */}
        <div className="login_Form bg-orange-100 px-8 py-6 border border-orange-200 rounded-xl shadow-md">

          {/* Top Heading  */}
          <div className="mb-5 ">
            <h2 className='text-center text-4xl font-semibold text-black '>
              Update Topic
            </h2>
            <div className="w-full flex justify-center">
              {loading && <HashLoader color='#e67715' />}
            </div>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              required
              placeholder='Product Title'
              value={topic.title}
              onChange={(e) => {
                setTopic({
                  ...topic,
                  title: e.target.value
                })
              }}
              className='bg-orange-100 text-slate-700 border border-orange-300 px-2 py-2 w-96 rounded-md outline-none placeholder-orange-300'
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={topic.category}
              onChange={(e) => {
                setTopic({
                  ...topic,
                  category: e.target.value
                })
              }}
              className="w-full px-1 py-2 text-slate-700 bg-orange-100 border border-orange-300 rounded-md outline-none  ">
              <option >Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value
                return (
                  <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>


          {/* Input six  */}
          <div className="mb-3">
            <textarea
              value={topic.description}
              onChange={(e) => {
                setTopic({
                  ...topic,
                  description: e.target.value
                })
              }}
              name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-slate-700 bg-orange-100 border border-orange-300 rounded-md outline-none placeholder-orange-300 ">

            </textarea>
          </div>

          {/* Add Product Button  */}
          <div className="mb-3">
            <button
              type='button'
              onClick={updateTopic}
              className='bg-[#e67715] hover:bg-slate-900 w-full text-white text-center py-2 font-bold rounded-md '
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTopicPage;