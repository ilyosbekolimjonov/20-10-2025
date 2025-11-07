import { model, Schema } from "mongoose";

const waterProductSchema = new Schema({
    name: { type: String, required: true },
    volume_liters: { type: Number, required: true }, // in liters
    price: { type: Number, required: true },
}, { timestamps: true });

export default model("WaterProduct", waterProductSchema);