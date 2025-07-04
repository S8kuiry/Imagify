import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import razorpay  from 'razorpay'
import transactionModel from "../models/transactionModel.js";

export const  registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password) {
            res.json({success:true,message:"Missing Details"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }
        const newUser = new  userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token,user:{name:user.name}})
    
        
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}
export  const   loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        const  user = await userModel.findOne({email})

        if(!user){
            res.json({success:false,message:"User does not exist "})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token,user:{name:user.name},message:"login succesfull"})
        }else{
            return res.json({success:false,message:"Invalid Credential"})
        }
        
    } catch (error) {
        res.json({success:true,message:error.message})
        
    }
}

export const userCredit = async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID missing from request" });
      }
  
      const user = await userModel.findById(userId);
      if (user) {
        return res.json({
          success: true,
          credits: user.creditBalance,
          user: { name: user.name },
        });
      } else {
        return res.status(404).json({ success: false, message: "User doesn't exist" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET

  });

  export const paymentRazorpay = async(req,res)=>{
    try {
      const userId = req.userId;
      const {planId} = req.body
      const userData = await userModel.findById(userId)
      if( !userId || !planId){
        return res.json({success:false,message:"Missing  Details"})

      }
      let credits,plan,amount,date

      switch(planId){
        case 'Basic' :
          plan = 'Basic'
          credits = 100
          amount = 10
          break;
        case 'Advanced' :
          plan = 'Advanced'
          credits = 500
          amount = 50
          break;
        case 'Business' :
          plan = 'Business'
          credits = 5000
          amount = 250
          break;
        default :
          return res.json({success:false,message:"Plan not found"})
      }
      date = Date.now();
      const transactionData = {
        userId,plan,amount,credits,date
      }
      const newTransaction = await transactionModel.create(transactionData)

      const options = {
        amount:amount * 100,
        currency : process.env.CURRENCY,
        receipt: newTransaction._id
      }
      await razorpayInstance.orders.create(options,(error,order)=>{
        if(error){
          console.log(error)
          return res.json({success:false,message:error.message})
        }
        res.json({success:true,order,userData})

      })


      
    } catch (error) {
      console.log(error.message)
      res.json({success:false,message:error.message})
      
    }
  }

  export const verifyRazorpay = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body;
  
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
  
      if (orderInfo.status === 'paid') {
        const transactionData = await transactionModel.findById(orderInfo.receipt);
        if (transactionData.payment) {
          return res.json({ success: false, message: 'Payment already processed' });
        }
  
        const userData = await userModel.findById(transactionData.userId);
        const updatedCredit = userData.creditBalance + transactionData.credits;
  
        await userModel.findByIdAndUpdate(userData._id, { creditBalance: updatedCredit });
        await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
  
        return res.json({ success: true, message: "Credits Added" });
      } else {
        return res.json({ success: false, message: "Payment not completed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  




