import { model, Schema } from 'mongoose'

const customerScheme = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
}, { timestamps: true })

export default model('Customer', customerScheme)