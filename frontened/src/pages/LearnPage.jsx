import React,{useEffect} from 'react';
import { MagicCard } from "@/components/magicui/magic-card";
import { Link, Outlet } from 'react-router-dom';

const LearnPage = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='w-full'>
      <h1 className='text-center text-7xl mt-20'>
        Tell us what you want to <span className="text-[#e67715]">learn</span>
      </h1>

      <div
        className={
          "flex w-3/4 flex-col gap-4 lg:flex-row mx-auto justify-center items-center mt-32 lg:space-x-10"
        }
      >

        <Link to='/algo'>
          <MagicCard
            className="cursor-pointer flex flex-col items-center justify-center shadow-2xl whitespace-normal text-3xl p-6 h-60"
            gradientColor={"#FAC898"}
          >
            <span className="block text-center mb-2">Algorithms</span>
            <p className="text-lg text-[#e67715] mt-4">
              An algorithm in Data Structures and Algorithms (DSA) is a step-by-step procedure or set of rules to solve a specific problem.
              Algorithms are the core of computer science, enabling us to solve complex problems efficiently.
            </p>
          </MagicCard>
        </Link>

        <Link to='/ds'>
          <MagicCard
            className="cursor-pointer flex flex-col items-center justify-center shadow-2xl whitespace-normal text-3xl p-6 h-60"
            gradientColor={"#FAC898"}
          >
            <span className="block text-center">Data Structure</span>
            <p className="text-lg text-[#e67715] mt-4">
              A data structure is a way of organizing and storing data so that it can be accessed and modified efficiently. It's like a container or blueprint that defines how data is arranged and how relationships between different pieces of data are maintained.
            </p>
          </MagicCard>
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default LearnPage;
