import { model, Schema } from 'mongoose'

const orderItemSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'WaterProduct', required: true },
    quantity: { type: Number, required: true, min: 1 },
    total_price: { type: Number, required: true },
}, { timestamps: true })

export default model('OrderItem', orderItemSchema)