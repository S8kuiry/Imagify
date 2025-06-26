

import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"


const Description = () => {
  return (
    <motion.div
    initial={{opacity:0.2,y:100,scale:1.02}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:0.5}}
     className='w-full flex flex-col items-center justify-start gap-2 mt-[10rem] mb-8'>
        <div className="flex flex-col items-center justify-start">
            <h1 className='text-4xl my-2 font-[500] '>Create AI Images</h1>
            <p className='text-xs text-gray-500 mb-8'>Turn your imagination into visuals</p>
        </div>

        <div className="flex items-start justify-content gap-4 w-[46rem]">
            <div className="">
                <img src={assets.sample_img_1} className='w-[60rem]'></img>
            </div>
            <div className="">
                <h1 className='text-2xl my-2 font-[500] text-gray-600'>
                Introducing the AI-Powered Text to <br></br>Image Generator
                </h1>
                <p className='text-xs text-gray-500 mt-8'>
                Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
                    <br></br><br></br>
                Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!

                </p>
            </div>
        </div>
      
    </motion.div>
  )
}

export default Description
