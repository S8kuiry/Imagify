
import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const GenerateBin = () => {
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
    initial={{opacity:0.2,y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1,y:0}}
     className='w-full flex flex-col items-center justify-start gap-2 mt-[10rem] mb-8' >
        <div className="flex flex-col items-center justify-start">
            <h1 className='text-4xl my-2 font-[500] '>See the magic.Try now</h1>
            <motion.button 
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{default:{duration:0.5},opacity:{delay:0.8},duration:1}}
            onClick={onClickHandler}


            className='flex items-center justify-center gap-2
        text-white  rounded-full px-8 py-4 text-xs  mt-6
         bg-gray-900 '>Generate Images <img src={assets.star_group} className='w-4'></img></motion.button>
        </div>


      
    </motion.div>
  )
}

export default GenerateBin
