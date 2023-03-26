import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String, required: true },
  direction: { type: String, required: true },
  edad: { type: Number, required: true },
  phone: { type: String, required: true },
  image: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, defaultValue: 'customer', allowNull: false }
}, {
  toJSON: {
    transform (doc, ret) {
      delete ret.__v
      delete ret.updatedAt
      delete ret.password
      delete ret.salt
    }
  }
},
{
  timestamps: true
}
)

const User = mongoose.model('user', UserSchema)

export default User
