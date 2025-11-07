import { model, Schema } from "mongoose";

const districtSchema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });

export default model("District", districtSchema);