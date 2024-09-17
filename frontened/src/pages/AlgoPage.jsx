import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import BlurIn from "@/components/magicui/blur-in";
import MyContext from '@/contexts/firebaseContext/MyContext';

// Helper function to limit description to 30 words
const truncateDescription = (description) => {
  const words = description.split(' ');
  return words.length > 30 ? words.slice(0, 30).join(' ') + '...' : description;
};

const AlgorithmCard = ({ name, category, description, link }) => (
  <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300 h-56 flex flex-col justify-between">
    <div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-gray-500 text-sm">{category}</p>
      <p className="mt-2 text-gray-700">{truncateDescription(description)}</p>
    </div>
    <Link to={link} className="text-orange-500 hover:text-orange-700 mt-4 block">Learn With AI</Link>
  </div>
);

const AlgoPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [algorithms, setAlgorithms] = useState([]);

  const { topics } = useContext(MyContext); // Assuming algorithm topics are stored here

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Ensure topics is an array and filter for the "Algorithm" category
    if (Array.isArray(topics)) {
      const filteredAlgorithms = topics.filter(topic =>
        topic.category?.toLowerCase() === 'algorithm' // case-insensitive matching
      );
      setAlgorithms(filteredAlgorithms);
    }
  }, [topics]);

  // Filter algorithms based on search term
  const filteredAlgorithms = algorithms.filter(algo =>
    algo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    algo.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <BlurIn
          word="Choose an Algorithm to Learn"
          className="text-4xl font-bold text-black dark:text-white"
        />
        <p className="text-gray-600 mt-4">Select an algorithm and explore how it works!</p>
        <input
          type="text"
          placeholder="Search for an algorithm..."
          className="border border-gray-300 rounded-md px-4 py-2 mt-6 w-1/3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Algorithm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAlgorithms.length > 0 ? (
          filteredAlgorithms.map((algo) => (
            <AlgorithmCard
              key={algo.id}  // Use a unique key, preferably `algo.id`
              name={algo.title}
              category={algo.category}
              description={algo.description}
              link={`/dsa/${algo.id}`}  // Use `algo.id` for URL instead of name
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No algorithms found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default AlgoPage;
