import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Result = () => {
  //const navigate = useNavigate('/')
  const [image,setImage]= useState(assets.sample_img_1)
  const [isImageLoaded,setIsImageLoaded] = useState(false)
  const [loading,setLoading] = useState(false)
  const [input,setInput] = useState("")

  const {generateImage,resultImage,navigate,token} = useAppContext()
  console.log(resultImage)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input || !token) {
      toast.error("Please enter a prompt and ensure you're logged in.");
      return;
    }
  
    setLoading(true);
    if(input){
      const imagee = await generateImage(input); // 🔄 Wait for this
      if(imagee){
        setIsImageLoaded(true)
        setImage(imagee)


      }else{
        toast.error("image not loaded")
      }
      
      

    }
    setLoading(false);
  
    
  };
  
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen mb-10 pt-40">

      <motion.form
      initial={{opacity:0.2,y:150}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:1}}

      className="flex flex-col items-center justify-center space-y-10">
        
        {/* Loading image with animated progress bar */}
        <div className="relative">
          <img
            src={image}
            alt="Generated result"
            className="w-80 rounded-md shadow"
          />
          <span
            className={loading?`absolute bottom-6 left-0 w-80 transition-all duration-300s ease-in-out  h-1 bg-blue-500 animate-progress`:`absolute bottom-0 transition-all duration-300s left-0 h-1 bg-blue-500 ease-in-out animate-progress w-0`}
            
            
          />
          <p className={loading?"text-xs text-gray-500 mt-2":"hidden"}>Loading…</p>
        </div>

        {/* Input and generate button */}
        {!isImageLoaded &&
        <motion.div
        initial={{opacity:0.2,y:150}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:1}}
         className="flex items-center w-[38rem] bg-gray-500 rounded-full h-12 px-[0.2rem]">
          <input
            type="text"
            onChange={(e)=> setInput(e.target.value) }
            value={input}       
            placeholder="Describe what you want to generate"
            className="flex-grow bg-transparent text-white text-xs outline-none pl-6 placeholder-gray-300"
          />
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="ml-4 h-[85%] w-[10rem] bg-gray-900 text-white text-xs rounded-full hover:bg-gray-800 transition"
          >
            Generate
          </button>
        </motion.div>}
        {/* Generate another and download button .............. */}
        {isImageLoaded &&
        <motion.div
        initial={{opacity:0.2,y:150}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:1}}
         className="">
          <button onClick={()=>setIsImageLoaded(false)} className='rounded-full text-gray-900 py-3  w-[10rem] border border-gray-900 mr-2'>Generate Another</button>
          <a
  href={URL.createObjectURL(
    new Blob([Uint8Array.from(atob(image.split(',')[1]), c => c.charCodeAt(0))], {
      type: 'image/png',
    })
  )}
  download="generated-image.png"
  className='rounded-full text-white bg-gray-900 py-3 w-[10rem] text-center inline-block'
>
  Download
</a>

        </motion.div>}
      </motion.form>
    </div>
  );
};

export default Result;
