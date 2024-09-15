import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlurIn from "@/components/magicui/blur-in";

const dataStructures = [
  { name: "Array", category: "Linear", description: "A collection of elements stored in a contiguous memory location." },
  { name: "Linked List", category: "Linear", description: "A linear data structure where each element points to the next." },
  { name: "Stack", category: "Linear", description: "A linear data structure that follows the Last In First Out (LIFO) principle." },
  { name: "Queue", category: "Linear", description: "A linear data structure that follows the First In First Out (FIFO) principle." },
  { name: "Hash Table", category: "Non-Linear", description: "A data structure that implements an associative array, mapping keys to values using a hash function." },

  { name: "Binary Tree", category: "Tree", description: "A tree data structure where each node has at most two children." },
  { name: "Binary Search Tree", category: "Tree", description: "A binary tree where the left child of a node is smaller and the right child is larger." },
  { name: "Heap", category: "Tree", description: "A special tree-based data structure that satisfies the heap property." },
  { name: "Trie", category: "Tree", description: "A tree data structure used for efficient retrieval of keys stored in a dataset, usually used in text processing." },

  { name: "Graph", category: "Non-Linear", description: "A collection of nodes connected by edges, used to represent relationships between entities." },
  { name: "Adjacency Matrix", category: "Graph", description: "A 2D array used to represent a graph, where each cell indicates whether there is an edge between two vertices." },
  { name: "Adjacency List", category: "Graph", description: "A collection of lists where each list represents a vertex and contains the vertices adjacent to it." },

  { name: "Set", category: "Non-Linear", description: "A collection of distinct elements with no particular order." },
  { name: "Priority Queue", category: "Non-Linear", description: "An abstract data type similar to a queue, but where each element has a priority." },
];

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

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Filter data structures based on search term
  const filteredDS = dataStructures.filter(ds =>
    ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ds.category.toLowerCase().includes(searchTerm.toLowerCase())
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
              key={ds.name}
              name={ds.name}
              category={ds.category}
              description={ds.description}
              link={`/dsa/${ds.name.toLowerCase().replace(/\s/g, '-')}`}
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
