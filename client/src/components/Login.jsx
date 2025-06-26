import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { motion } from "motion/react"
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = () => {
    const [state,setState] = useState("Login") 
    const {setShowLogin,backendUrl,setToken,setUser} = useAppContext()

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    useEffect(()=>{
        document.body.style.overflow = 'hidden';

        return()=>{
            document.body.style.overflow='unset';
        }
        
    },[])
    const onSubmitHandler = async (e)=>{
      e.preventDefault()
      try {

        if(state === "Login"){
          const {data} =await axios.post(backendUrl+'/api/user/login',{email,password})
          if(data.success){
             setToken(data.token)
             setUser(data.user)
             localStorage.setItem('token',data.token)
             setShowLogin(false)
          }

        }else{
          const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password})
          if(data.success){
            setToken(data.token)
            setUser(data.user)
            localStorage.setItem('token',data.token)
            setShowLogin(false )
          }
        }
        
      } catch (error) {
        toast.error(error.message)

        
      }

    }
  return (
    <div
    

     className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-filter backdrop-blur-sm">
      <motion.form
      initial={{opacity:0.3,y:50}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.7}}

       className="relative flex flex-col items-center bg-white rounded-lg px-4 py-10 mt-16 shadow-lg w-96">
        <motion.img 
        whileHover={{
          scale: 1.1,
          rotate: 15,
          backgroundColor: '#f87171', // Tailwind's red-400
          transition: { duration: 0.3, ease: 'easeInOut' },
        }}
        whileTap={{
          scale: 0.95,
          rotate: -15,
          backgroundColor: '#ef4444', // Tailwind's red-500
          transition: { duration: 0.2, ease: 'easeInOut' },
        }}
        style={{
          borderRadius: '50%',
          padding: '0.5rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
        onClick={()=>setShowLogin(false)} src={assets.cross_icon} className='absolute top-4
     ease-in-out right-5'></motion.img>
        <h1 className="text-2xl font-semibold mb-2">{state }</h1>
        <p className="text-sm text-gray-600 mb-6">Welcome Back! Please sign in to continue</p>

        {/*user field */}
        {state !="Login" &&<div className="flex items-center gap-3 w-[94%] mb-4">
          
          <div className="flex items-center w-full gap-2 px-4 py-3 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-blue-400">
            <img src={assets.profile_icon} alt="" className="w-5" />
            <input
              type="text"
              onChange={(e)=>setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              required
            />
          </div>
        </div>}


        {/* Email Field */}
        <div className="flex items-center gap-3 w-[94%] mb-4">
          
          <div className="flex items-center w-full gap-2 px-4 py-3 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-blue-400">
            <img src={assets.email_icon} alt="" className="w-5 h-5" />
            <input
            onChange={(e)=>setEmail(e.target.value)}

              type="email"
              value={email}
              placeholder="Email ID"
              className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex items-center gap-3 w-[94%] mb-4">
          
          <div className="flex items-center w-full gap-2 px-4 py-3 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-blue-400">
            <img src={assets.lock_icon} alt="" className="w-5 h-5" />
            <input
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Password"
              className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              required
            />
          </div>
        </div>

        {/* Forgot Password now aligned left */}
        {state === "Login" && <p className="self-start ml-6 text-xs text-blue-600 underline mb-6 cursor-pointer">
          Forgot Password?
        </p>
}
        <button
          type="submit"
          onClick={onSubmitHandler}
          className="w-[94%]  py-3 mb-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          {state==='Login'?'Login': 'Create Account'}
        </button>

        {
            state==='Login'?<p className="text-xs text-gray-600">
            Don't have an account?{' '}
            <span onClick={()=>setState('SignUp')} className="text-blue-600 underline cursor-pointer">Sign Up</span>
          </p>:<p className="text-xs text-gray-600">
          Already have an account?{' '}
          <span onClick={()=>setState('Login')} className="text-blue-600 underline cursor-pointer">Login</span>
        </p>
        }

        
        
      </motion.form>
    </div>
  );
};

export default Login;
