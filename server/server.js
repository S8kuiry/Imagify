import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './config/db.js' // Note the .js extension!
import 'dotenv/config'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// --- MongoDB Connection ---
connectDB()

// Routes
app.get('/', (req, res) => {
  res.send('Hello there')
})
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

// Start server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Successfully running on port ${port}`)
})


