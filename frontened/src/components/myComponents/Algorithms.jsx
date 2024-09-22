import React from 'react'
import Algo from '../../assets/images/Algorithms.webp'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import WordRotate from "@/components/magicui/word-rotate";
import { useNavigate } from 'react-router-dom';

const Algorithms = () => {
  const navigate = useNavigate()
  return (
    <div className='border-b border-neutral-300 mx-6 md:mx-10 lg:mx-20 xl:mx-32 py-10'>
      <h2 className='text-center text-3xl md:text-4xl font-bold mb-16'>
        Algorithms
      </h2>

      <div className='flex flex-col lg:flex-row items-center lg:space-x-8'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-1/2 flex justify-center lg:justify-start lg:p-8'>
          <div className='flex flex-col justify-start items-center lg:items-start text-center lg:text-left'>
            <h2 className='text-2xl md:text-3xl font-semibold mb-4'>
              Learn Different Algorithms...
            </h2>
            <WordRotate
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e67715] dark:text-white mb-6"
              words={["Sorting", "Searching", "Divide And Conquer", "Dynamic Programming", "Greedy Algorithms"]}
            />
            <Button
              className="mt-6 bg-[#e67715] text-white px-6 py-3 hover:bg-[#d05c10] transition duration-300"
              onClick={() => navigate('/algo')}
            >
              Learn &rarr;
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-1/2 mt-10 lg:mt-0'>
          <div className='flex justify-center'>
            <img className='rounded-2xl shadow-lg w-4/5 lg:w-full h-auto' src={Algo} alt="Algorithms" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Algorithms
