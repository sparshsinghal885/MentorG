import Algorithms from '@/components/myComponents/Algorithms'
import Datastructures from '@/components/myComponents/Datastructures'
import HeroSection from '@/components/myComponents/HeroSection'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <Datastructures/>
      <Algorithms/>
    </div>
  )
}

export default HomePage
