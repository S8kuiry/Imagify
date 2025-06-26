

import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';



const Header = () => {
    const {user,setShowLogin} = useAppContext()
    const navigate = useNavigate()


    const onClickHandler =()=>{
        if(user){
            navigate('/result')
        }else{
            setShowLogin(true)

        }


    }
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
           
            className='max-w-md'>
            <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay:0.2 , transition:0.8 }}
            className="flex items-center  justify-center gap-2 bg-white rounded-full px-2  py-2
        border border-gray-300 text-gray-500
         text-xs font-medium  w-auto">
                <p>Best text to image generator</p>
                <img src={assets.star_icon}></img>
            </motion.div>

            <motion.p
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            
             className='text-5xl text-gray-900  my-4
            
        text-center  mt-6'>Turn Text To <br></br><span className='text-blue-600'>image</span>, in Seconds.</motion.p>

            <motion.p
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            
             className='w-full flex items-center justify-center text-xs text-gray-500 text-center mt-6 max-w-sm'>Unleash Your Creativity with AI . Turn your Imagination into visual art in seconds - just type and watch the magic happen</motion.p>

            <div className="max-w-md   flex items-center justify-center mt-6">
                <motion.button
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{default:{duration:0.5},opacity:{delay:0.8},duration:1}}
                onClick={onClickHandler}

                 className='flex items-center justify-center gap-2
        text-white  rounded-full px-8 py-4 text-xs
         bg-gray-900 '>Generate Images <img src={assets.star_group} className='w-4'></img></motion.button>


            </div>

            <div className="flex items-center justify-center gap-4 mt-10">
                {Array(6).fill("").map((itm, indx) => (

                    <motion.img
                    whileHover={{scale:1.05}}
                    transition={{default:{duration:0.5}}}
                     src={indx % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2} key={indx} className='w-25 rounded-lg'></motion.img>
                ))}
            </div>


            <p className='w-full flex items-center justify-center text-xs text-gray-500 text-center mt-6 max-w-sm'>Generated Images from imagify</p>

        </motion.div>
    )
}

export default Header
