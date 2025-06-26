import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from "motion/react"

const Testimonials = () => {
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}
     className='w-full flex flex-col items-center justify-start gap-2 mt-[8rem] mb-8'>
        <div className="flex flex-col items-center justify-start">
            <h1 className='text-4xl my-2 font-[500] '>Customer Testimonials</h1>
            <p className='text-xs text-gray-500 mb-8'>What our users are saying</p>
        </div>

        <div className="flex items-center justify-center gap-4">
            {testimonialsData.map((itm,idx)=>(
                <motion.div
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{default:{duration:0.5},opacity:{delay:0.8},duration:1}}
    
    
                 key={idx}
                withH
                 className=" flex flex-col items-center 
                w-[17rem] py-4 px-4
                justify-center border border-gray-300 rounded-md ">
                    <img src={itm.image}></img>
                    <p className='font-semibold'>{itm.name}</p>
                    <p className='text-[0.8rem] font-medium text-gray-400 my-2'>{itm.role}</p>
                    <div className="flex iems-center justify-center gap-2 ">
                        {Array(itm.stars).fill("").map((itm)=>(
                            <img src={assets.rating_star}></img>
                        ))}
                    </div>
                    <p className='text-xs text-gray-500 mt-2 w-[80%] text-center'>{itm.text}</p>
                    
                </motion.div>
            ))}
        </div>
      
    </motion.div>
  )
}

export default Testimonials
