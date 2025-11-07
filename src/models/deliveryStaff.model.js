import { model, Schema } from 'mongoose';

const deliveryStaffSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    vehicle_number: { type: String },
    district_id: { type: Schema.Types.ObjectId, ref: 'District', required: true },
}, { timestamps: true });

export default model('DeliveryStaff', deliveryStaffSchema);