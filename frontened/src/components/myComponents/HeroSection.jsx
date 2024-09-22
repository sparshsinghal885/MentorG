import React from 'react'
import heroSection from '../../assets/images/heroSection.jpg'
import { motion } from "framer-motion"
import ShinyButton from "@/components/magicui/shiny-button";
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import HyperText from "@/components/magicui/hyper-text";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay }
  }
})

const HeroSection = () => {

  const navigate = useNavigate()

  return (
    <div className='border-b border-neutral-300 pb-8 lg:pb-12 lg:mb-20 mx-6 md:mx-10 lg:mx-20 xl:mx-32 mt-10 '>
      <div className='flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8'>
        <div className='w-full lg:w-2/3 text-center lg:text-left'>
          <motion.h1
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className='text-3xl md:text-5xl xl:text-8xl font-bold leading-snug md:leading-tight lg:leading-snug tracking-tight mt-8 lg:mt-16'>
            From Confusion to Clarity: <br className='hidden md:block' /> AI-Driven Socratic Teaching
          </motion.h1>
          <HyperText
            className="text-xl md:text-2xl xl:text-3xl font-semibold text-gray-800 dark:text-white mt-6 "
            text="Start Learning"
          />
          <motion.div
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 mt-6'>
            <ShinyButton
              text="Learn with AI >"
              className="font-semibold border-2 px-6 py-3"
              onClick={() => navigate('/learn')}
            />
            <Button className="bg-[#e67715] text-white px-6 py-3 hover:bg-[#d05c10] transition-colors duration-300" onClick={() => navigate('/codebox')}>
              Open CodeBox
            </Button>
          </motion.div>
        </div>
        <div className='w-full lg:w-1/3 mt-10 lg:mt-0'>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className='flex justify-center lg:justify-end'>
            <img
              className="w-4/5 lg:w-full rounded-lg shadow-lg mb-10"
              src={heroSection} alt="Hero Image"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
