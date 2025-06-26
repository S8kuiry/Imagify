

import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from "motion/react"

const Steps = () => {
    return (
        <motion.div 
        initial={{opacity:0.2,y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}



        className='flex flex-col items-center justify-start  mt-[10rem] mb-[2rem]'  >
            <div className="text-center">
                <h1 className='text-4xl my-2 font-[500]'>How it Works?</h1>
                <p className='text-xs text-gray-500 mb-8'>Transform Words into Stunning Images</p>
            </div>

            <div className="flex flex-col items-center justify-start ">
                {stepsData.map((itm)=>(
                    <div className="flex items-start justify-start w-[600px] border border-gray-300 rounded-lg 
                    hover:scale-[1.02] transition-all duration-300 cursor-pointer
                    py-4 px-2 my-4 shadow-lg">
                        <div className="mx-2">
                            <img src={itm.icon}></img>
                        </div>
                        <div className="">
                            <p >{itm.title}</p>
                            <p  className='text-xs text-gray-400'>{itm.description}</p>
                            
                        </div>
                    </div>
                ))}

            </div>
        </motion.div>


    )
}

export default Steps
