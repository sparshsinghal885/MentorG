import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { fireDB } from "@/firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import MyContext from "@/contexts/firebaseContext/MyContext";
import { useToast } from "../../hooks/use-toast"

// Category list for DSA
const categoryList = [
  {
    name: 'Data Structure'
  },
  {
    name: 'Algorithm'
  }
];

const AddTopicPage = () => {
  const { toast } = useToast()


  const navigate = useNavigate();
  const {
    loading,
    setLoading } = useContext(MyContext);

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

  // Function to add the topic to Firestore
  const addTopicFunction = async () => {
    if (topic.title === "" || topic.category === "" || topic.description === "") {
      return toast({
        title: "All fields are required",
      })
    }

    setLoading(true);
    try {
      // Reference the Firestore collection 'dsaTopics'
      const topicRef = collection(fireDB, 'dsaTopics');
      await addDoc(topicRef, {
        ...topic
      });

      navigate('/admin-dashboard'); // Navigate to your dashboard or another page
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Something went wrong!",
      })
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Add Topic Form */}
        <div className="bg-slate-100 px-8 py-6 border border-neutral-200 rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className="text-center text-4xl font-semibold text-black">
              Add DSA Topic
            </h2>
            <div className="w-full flex justify-center">
              {loading && <HashLoader color="#e67715" />}
            </div>
          </div>

          {/* Topic Title Input */}
          <div className="mb-3">
            <input
              type="text"
              required
              placeholder="Topic Title"
              value={topic.title}
              onChange={(e) => {
                const uppercasedTitle = e.target.value.toUpperCase();
                setTopic({
                  ...topic,
                  title: uppercasedTitle
                });
              }}
              className="bg-slate-100 text-slate-700 border border-neutral-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-300"
            />
          </div>

          {/* Category Selection */}
          <div className="mb-3">
            <select
              value={topic.category}
              onChange={(e) =>
                setTopic({
                  ...topic,
                  category: e.target.value
                })
              }
              className="w-full px-1 py-2 text-slate-700 bg-slate-100 border border-neutral-200 rounded-md outline-none"
            >
              <option>Select Topic Category</option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description Input */}
          <div className="mb-3">
            <textarea
              value={topic.description}
              onChange={(e) =>
                setTopic({
                  ...topic,
                  description: e.target.value
                })
              }
              placeholder="Topic Description"
              rows="5"
              className="w-full px-2 py-1 text-slate-700 bg-slate-100 border border-neutral-200 rounded-md outline-none placeholder-slate-300"
            />
          </div>

          {/* Add Topic Button */}
          <div className="mb-3">
            <button
              type="button"
              onClick={addTopicFunction}
              className="bg-[#e67715] hover:bg-slate-800 w-full text-white text-center py-2 font-bold rounded-md"
            >
              Add Topic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTopicPage;
