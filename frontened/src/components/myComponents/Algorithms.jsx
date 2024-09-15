import React from 'react'
import Algo from '../../assets/images/Algorithms.webp'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import WordRotate from "@/components/magicui/word-rotate";
import { useNavigate } from 'react-router-dom';

const Algorithms = () => {
  const navigate = useNavigate()
  return (
    <div className='border-b border-neutral-300 ml-10 mr-10 pb-4'>
      <h2 className='my-20 text-center text-4xl'>Algo
        <span className='text-neutral-500'>rithms</span></h2>

      <div className='flex flex-wrap'>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-2/3 lg:p-8'>
          <div className='flex items-start justify-start flex-col md:ml-32 mb-5 '>
            <h2 className='text-4xl'>Learn Different Algorithms...</h2>
            <WordRotate
              className="text-5xl md:text-7xl font-bold text-[#e67715] dark:text-white "
              words={["Sorting", "Searching", "Divide And Conquer", "Dynamic Programming", "Greedy Algorithms"]}
            />
            <Button
              className="mt-[1.6rem] bg-[#e67715]"
              onClick={() => navigate('/algo')}
            >Learn &rarr;</Button>
          </div>

        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-1/3 lg:p-8'>
          <div className='flex items-center justify-center '>
            <img className='rounded-2xl h-80' src={Algo} alt="Data Structures" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Algorithms
