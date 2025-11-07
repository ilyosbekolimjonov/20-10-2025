import { model, Schema } from 'mongoose'

const orderSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    delivery_staff_id: { type: Schema.Types.ObjectId, ref: 'DeliveryStaff'},
    order_date: { type: Date, default: Date.now },
    status: { 
        type: String, 
        enum: ['pending', 'delivered', 'cancelled'], 
        default: 'pending' },
}, { timestamps: true })

export default model('Order', orderSchema)