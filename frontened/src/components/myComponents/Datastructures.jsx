import React from 'react'
import DataStructures from '../../assets/images/DataStructures.webp'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/magicui/box-reveal";
import { useNavigate } from 'react-router-dom';

const Datastructures = () => {
  const navigate = useNavigate()
  
  return (
    <div className='border-b border-neutral-300 ml-10 mr-10 pb-4'>
      <h2 className='my-20 text-center text-4xl'>Data
        <span className='text-neutral-500'> Structures</span></h2>

      <div className='flex flex-wrap'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-1/2 lg:p-8'>
          <div className='flex items-center justify-center '>
            <img className='rounded-2xl h-80' src={DataStructures} alt="Data Structures" />
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-1/2 '>
          {/* <div className='flex justify-center lg:justify-start'>
            <p className='my-2 max-w-xl py-6'>ABOUT_TEXT</p>
          </div> */}
          <div className="h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8">
            <BoxReveal boxColor={"#e67715"} duration={0.5}>
              <p className="text-[3.5rem] font-semibold">
                MentorG<span className="text-[#e67715]">.</span>
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"#e67715"} duration={0.5}>
              <h2 className="mt-[.5rem] text-[1rem]">
                Best platform for{" "}
                <span className="text-[#e67715]">learning DSA</span>
              </h2>
            </BoxReveal>

            <BoxReveal boxColor={"#e67715"} duration={0.5}>
              <div className="mt-[1.5rem]">
                <p>
                  &rarr; Our Socratic AI tutor helps you explore solutions to complex problems by encouraging
                  <span className="font-semibold text-[#e67715]"> critical thinking</span>,
                  and
                  <span className="font-semibold text-[#e67715]"> problem-solving skills.</span>
                  <br />
                  &rarr; Leads you step by step toward deeper understanding and real-world coding proficiency.<br />
                </p>
              </div>
            </BoxReveal>

            <BoxReveal boxColor={"#e67715"} duration={0.5}>
              <Button
                className="mt-[1.6rem] bg-[#e67715]"
                onClick={() => navigate('/ds')}
              >Learn &rarr;</Button>
            </BoxReveal>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Datastructures
