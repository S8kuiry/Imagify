

import React from 'react'
import { assets, plans } from '../assets/assets'
import { useAppContext } from '../../context/AppContext.jsx';
import { motion } from "motion/react"
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const BuyCredit = () => {
  const {user,backendUrl, loadCreditData,token,setShowLogin} = useAppContext()
  const navigate= useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      handler: async (response) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
  
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            { razorpay_order_id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          if (data.success) {
            toast.success('Credit added successfully!');
            await loadCreditData(); // ✅ Make sure to await
            navigate('/'); // ✅ Navigate after state update
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong during verification");
        }
      },
      theme: {
        color: "#333",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  
  

  const paymentRazorpay = async (planId) =>{
    try {
      if(!user){
        setShowLogin(true)

      }
      const {data} = await axios.post(backendUrl+'/api/user/pay-razor',{planId},{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        initPay(data.order)

      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }
  return (
    <motion.div
    initial={{opacity:0.2,y:150}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1}}
    
    
    
    className='flex flex-col items-center justify-center mt-[6rem] mb-14'>
      <p className='rounded-full  text-gray-500  py-2 px-6 bg-white shadow shadow-lg'>OUR PLANS</p>

      <p className='text-4xl text-gray-900 mt-18 font-semibold '>Choose the Plan</p>

      <motion.div
      initial={{opacity:0.2,y:100}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:1}}

       className="flex items-center justify-center gap-6 w-full pt-16 ">
        {plans.map((itm)=>(
          <div className="h-[21rem] w-[17rem] flex flex-col items-start
          p-8 pt-10 hover:scale-[1.03] transition-all duration-500 bg-white
           justify-start gap-2 rounded-md shadow-lg">
            <img src={assets.logo_icon} className='mt-2'></img>
            <p className='font-semibold my-2'>{itm.id}</p>
            <p className='text-gray-500  text-[0.9rem]'>{itm.desc}</p>
            <div className="w-full flex items-end justify-start">
              <p className='text-3xl font-[500] text-gray-600 mr-2'>₹{itm.price} </p><p className='text-xs text-gray-500'>  /{itm.credits} Credits</p>
            </div>
            <div className="w-full flex items-center justify-center mt-8">
            <button onClick={()=> paymentRazorpay(itm.id)} className='text-white bg-gray-900 w-[12rem] h-[3rem] rounded-md '>{user !== null?"Purchase":"Get Started"}</button>
            </div>
          </div>
        ))}

      </motion.div>

        
      
    </motion.div>
  )
}
 
export default BuyCredit
