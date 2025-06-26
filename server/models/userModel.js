import mongoose from 'mongoose'

const userModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creditBalance: { type: Number, default: 5 }
})

// ⚠️ Fix the model name: It should not have a slash ('/user').
// It should be a simple string like 'User' or 'user'.
const userModel = mongoose.model('User', userModelSchema)

export default userModel;
