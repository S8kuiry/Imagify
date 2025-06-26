


import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBin from '../components/GenerateBin'

const Home = () => {
  return (
    <div className='pt-[10rem] flex flex-col items-center justify-start w-full'>
      <Header/>
      <Steps/>
      <Description/>
      <Testimonials/>
      <GenerateBin/>
      
        
      
    </div>
  )
}

export default Home
