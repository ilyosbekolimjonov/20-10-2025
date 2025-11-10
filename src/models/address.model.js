import { model, Schema } from 'mongoose'

const adressSchema = new Schema({
    street: { type: String, required: true },
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    address: { type: String, required: true },
    location: { type: String},
    district_id: { type: Schema.Types.ObjectId, ref: 'District', required: true },
}, { timestamps: true })

export default model('Adress', adressSchema)