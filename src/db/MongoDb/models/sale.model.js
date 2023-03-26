import mongoose, { Schema } from 'mongoose'

const SaleSchema = new Schema({
  idUser: { type: Schema.Types.ObjectId, ref: 'user' },
  idCart: { type: Schema.Types.ObjectId, ref: 'cart' }
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
}
)

const Sale = mongoose.model('sale', SaleSchema)

export default Sale
