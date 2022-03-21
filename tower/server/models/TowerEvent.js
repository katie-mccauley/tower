import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerEventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: Date, min: new Date(), required: true },
    isCanceled: { type: Boolean, default: false },
    type: { type: String, enum: ['Concert', 'concert', 'Sports', 'sports', 'Convention', 'convention', 'Digital', 'digital', 'Expos', 'expos'], required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
