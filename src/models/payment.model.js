import { model, Schema } from 'mongoose'

const paymentSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    payment_date: { type: Date, default: Date.now },
    method: { 
        type: String, 
        enum: ['cash', 'card'], 
        required: true },
}, { timestamps: true })

export default model('Payment', paymentSchema)