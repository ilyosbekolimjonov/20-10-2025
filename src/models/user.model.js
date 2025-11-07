import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number}
}, { timestamps: true })


userSchema.methods.getFullName= function() {
    return `${this.name} <${this.age}>`
}


userSchema.methods.comparePassword = function (candidatePassword) {
    return candidatePassword === this.password
}


export default model('User', userSchema)