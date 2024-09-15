import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlurIn from "@/components/magicui/blur-in";

const algorithms = [
  { name: "Bubble Sort", category: "Sorting", description: "A simple comparison-based sorting algorithm where adjacent elements are swapped if they are in the wrong order." },
  { name: "Merge Sort", category: "Sorting", description: "A divide and conquer algorithm that splits an array into smaller arrays, sorts them, and merges them back together." },
  { name: "Quick Sort", category: "Sorting", description: "An efficient, in-place sorting algorithm that uses partitioning and recursion." },
  { name: "Insertion Sort", category: "Sorting", description: "A simple sorting algorithm that builds the sorted list one item at a time." },
  { name: "Heap Sort", category: "Sorting", description: "A comparison-based sorting technique based on Binary Heap data structure." },

  { name: "Binary Search", category: "Searching", description: "A fast searching algorithm that works on sorted arrays by repeatedly dividing the search interval in half." },
  { name: "Linear Search", category: "Searching", description: "A basic searching algorithm that checks each element of the list sequentially." },
  { name: "Jump Search", category: "Searching", description: "A searching algorithm that jumps ahead by a fixed step and then performs a linear search within the range." },

  { name: "Dijkstra's Algorithm", category: "Graph", description: "An algorithm for finding the shortest paths between nodes in a graph, which may represent road networks." },
  { name: "A* Algorithm", category: "Graph", description: "An algorithm for finding the shortest path that uses heuristics to improve performance." },
  { name: "Bellman-Ford Algorithm", category: "Graph", description: "A shortest path algorithm that works even when the graph contains negative weights." },
  { name: "Floyd-Warshall Algorithm", category: "Graph", description: "An algorithm for finding the shortest paths between all pairs of nodes in a weighted graph." },
  { name: "Depth-First Search (DFS)", category: "Graph", description: "An algorithm for traversing or searching graph/tree structures by exploring as far as possible along each branch before backtracking." },
  { name: "Breadth-First Search (BFS)", category: "Graph", description: "An algorithm for traversing or searching graph/tree structures by exploring neighbors level by level." },

  { name: "Knapsack Problem", category: "Dynamic Programming", description: "An optimization problem that finds the most valuable subset of items that fit in a knapsack of limited capacity." },
  { name: "Longest Common Subsequence", category: "Dynamic Programming", description: "A problem of finding the longest subsequence common to two sequences." },
  { name: "Fibonacci Sequence", category: "Dynamic Programming", description: "A sequence of numbers where each number is the sum of the two preceding ones, often implemented using dynamic programming." },
  { name: "Matrix Chain Multiplication", category: "Dynamic Programming", description: "An optimization problem that finds the most efficient way to multiply a given sequence of matrices." },
  { name: "0/1 Knapsack Problem", category: "Dynamic Programming", description: "A knapsack problem where each item must either be included or excluded entirely." },

  { name: "Kruskal's Algorithm", category: "Graph", description: "A minimum spanning tree algorithm that finds a subset of edges that forms a tree, including every vertex, with the minimum possible total edge weight." },
  { name: "Prim's Algorithm", category: "Graph", description: "A minimum spanning tree algorithm that grows a tree by adding the cheapest possible connection from the tree to another vertex." },
  { name: "Topological Sort", category: "Graph", description: "A sorting algorithm for ordering vertices of a directed acyclic graph." },

  { name: "Greedy Algorithm", category: "General", description: "A problem-solving method where the best solution at each step is chosen without considering future consequences." },
  { name: "Huffman Coding", category: "Greedy", description: "A lossless data compression algorithm that assigns variable-length codes to characters based on their frequencies." },
  { name: "KMP Algorithm", category: "String Matching", description: "A string-searching algorithm that searches for occurrences of a word within a main text string efficiently." },
  { name: "Rabin-Karp Algorithm", category: "String Matching", description: "A string-search algorithm that uses hashing to find patterns in strings." }
];


const AlgorithmCard = ({ name, category, description, link }) => (
  <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
    <h2 className="text-2xl font-bold">{name}</h2>
    <p className="text-gray-500 text-sm">{category}</p>
    <p className="mt-2">{description}</p>
    <Link to={link} className="text-orange-500 hover:text-orange-700 mt-4 block">Learn With AI</Link>
  </div>
);

const AlgoPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Filter algorithms based on search term
  const filteredAlgorithms = algorithms.filter(algo =>
    algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    algo.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Header Section */}
      <div className="text-center mb-10">
        <BlurIn
          word="Choose an Algorithm to Learn"
          className="text-4xl font-bold text-black dark:text-white"
        />
        {/* <h1 className="text-4xl font-bold">Choose an Algorithm to Learn</h1> */}
        <p className="text-gray-600 mt-4">Select an algorithm and dive deep into how it works!</p>
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
              key={algo.name}
              name={algo.name}
              category={algo.category}
              description={algo.description}
              link={`/dsa/${algo.name.toLowerCase().replace(/\s/g, '-')}`}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No algorithms found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default AlgoPage
