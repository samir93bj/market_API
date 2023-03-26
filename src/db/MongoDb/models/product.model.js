import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
  externalID: { type: Number, required: true },
  timestamp: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
},
{
  toJSON: {
    transform (doc, ret) {
      delete ret.__v
      delete ret.updatedAt
    }
  }
},
{
  timestamps: true
})

const Product = mongoose.model('product', ProductSchema)

export default Product
