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
    <div className='border-b border-neutral-300 pb-4 lg:mb-35 ml-10 mr-10 '>
      <div className='flex flex-wrap mb-20'>
        <div className='w-full lg:w-2/3'>
          <div className='flex flex-col items-center lg:items-start'>
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className='pb-16 text-5xl tracking-tight lg:mt-16 lg:text-8xl font-bold'>From Confusion to Clarity: AI-Driven Socratic Teaching</motion.h1>
            <HyperText
              className="text-4xl font-bold text-black dark:text-white mt-10 mb-10"
              text="Start Learning"
            />
            <motion.div
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className='space-x-5'>
              <ShinyButton
                text="Learn with AI >"
                className="font-semibold border-2"
                onClick={() => navigate('/learn')}
              />
              <Button className="bg-[#e67715]" onClick={() => navigate('/codebox')}>Open CodeBox</Button>
            </motion.div>
          </div>
        </div>
        <div className='w-full lg:w-1/3 lg:p-8'>
          <div className='flex justify-center'>
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              src={heroSection} alt="Sparsh Singhal" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
