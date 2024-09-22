import React from 'react'
import DataStructures from '/home/sparsh/Desktop/Mentorg/MentorG/frontened/src/assets/images/DataStructures.webp'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/magicui/box-reveal";
import { useNavigate } from 'react-router-dom';

const Datastructures = () => {
  const navigate = useNavigate()
  
  return (
    <div className='border-b border-neutral-300 mx-6 md:mx-10 lg:mx-20 xl:mx-32 py-10 space-x-5'>
      <h2 className='text-center text-3xl md:text-4xl font-bold mb-16'>
        Data <span className='text-neutral-500'>Structures</span>
      </h2>

      <div className='flex flex-col lg:flex-row items-center lg:space-x-8'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-1/2 mb-10 lg:mb-0'>
          <div className='flex justify-center shadow-lg p-3'>
            <img className='rounded-2xl  w-4/5 lg:w-full h-auto' src={DataStructures} alt="Data Structures" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full lg:w-1/2 '>
          <div className="h-full w-full max-w-[32rem] text-center lg:text-left md:ml-20">
            <BoxReveal boxColor={"#e67715"} duration={0.5}>
              <p className="text-4xl md:text-[3.5rem] font-semibold">
                MentorG<span className="text-[#e67715]">.</span>
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"#e67715"} duration={0.5}>
              <h2 className="mt-2 text-lg md:text-xl font-medium">
                Best platform for{" "}
                <span className="text-[#e67715]">learning DSA</span>
              </h2>
            </BoxReveal>

            <BoxReveal boxColor={"#e67715"} duration={0.5}>
              <div className="mt-6 text-sm md:text-base leading-relaxed">
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
                className="mt-6 bg-[#e67715] text-white px-6 py-3 hover:bg-[#d05c10] transition-colors duration-300"
                onClick={() => navigate('/ds')}
              >
                Learn &rarr;
              </Button>
            </BoxReveal>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Datastructures
