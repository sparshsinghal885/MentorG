import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import BlurIn from "@/components/magicui/blur-in";
import MyContext from '@/contexts/firebaseContext/MyContext';

const DSCard = ({ name, category, description, link }) => (
  <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
    <h2 className="text-2xl font-bold">{name}</h2>
    <p className="text-gray-500 text-sm">{category}</p>
    <p className="mt-2">{description}</p>
    <Link to={link} className="text-orange-500 hover:text-orange-700 mt-4 block">Learn With AI</Link>
  </div>
);

const DSPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataStructures, setDataStructures] = useState([]);

  const { topics } = useContext(MyContext);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
    
    // Ensure topics is an array and filter for the "Data Structure" category
    if (Array.isArray(topics)) {
      const filteredDataStructures = topics.filter(topic => 
        topic.category?.toLowerCase() === 'data structure' // case-insensitive matching
      );
      setDataStructures(filteredDataStructures);
    }
  }, [topics]);

  // Filter data structures based on search term
  const filteredDS = dataStructures.filter(ds =>
    ds.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ds.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <BlurIn
          word="Choose a Data Structure to Learn"
          className="text-4xl font-bold text-black dark:text-white"
        />
        <p className="text-gray-600 mt-4">Select a data structure and explore how it works!</p>
        <input
          type="text"
          placeholder="Search for a data structure..."
          className="border border-gray-300 rounded-md px-4 py-2 mt-6 w-1/3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Structure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDS.length > 0 ? (
          filteredDS.map((ds) => (
            <DSCard
              key={ds.id || ds.name}  // Use a unique key, preferably `ds.id`
              name={ds.title}
              category={ds.category}
              description={ds.description}
              link={`/dsa/${ds.id}`}  // Use `ds.id` for URL instead of name
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No data structures found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default DSPage;
