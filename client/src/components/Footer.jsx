
import React from 'react'
import { assets } from '../assets/assets';


const Footer = () => {
  return (
    <div className=' left-0 w-full flex items-center justify-between mb-4 mt-[8rem]'>
        <div className="flex items-center justify-center gap-4">
            <img src={assets.logo}></img>
            <p className='text-gray-300'>|</p>
            <p  className='text-gray-400'>All right reserved. Copyright @imagify</p>
        </div>
        <div className="flex items-center justify-center  gap-2">
            <img src={assets.facebook_icon}></img>
            <img src={assets.instagram_icon}></img>
            <img src={assets.twitter_icon}></img>

        </div>
      
    </div>
  )
}

export default Footer
