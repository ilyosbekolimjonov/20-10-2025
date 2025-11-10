import User from "../models/user.model.js"
import { ApiError } from "../middlewares/apiError.js"

export const UserController = {
    // 🔹 Barcha foydalanuvchilarni olish (faqat admin)
    async getAll(req, res, next) {
        try {
            const users = await User.find().select("-password") // parolni qaytarmaymiz
            res.status(200).json({
                success: true,
                message: "Foydalanuvchilar ro'yxati muvaffaqiyatli olindi",
                count: users.length,
                data: users,
            })
        } catch (err) {
            next(err)
        }
    },

    // 🔹 Bitta foydalanuvchini olish
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findById(id).select("-password")

            if (!user) {
                return next(new ApiError(404, "Foydalanuvchi topilmadi"))
            }

            res.status(200).json({
                success: true,
                message: "Foydalanuvchi topildi",
                data: user,
            })
        } catch (err) {
            next(err)
        }
    },

    // 🔹 Foydalanuvchini yangilash
    async update(req, res, next) {
        try {
            const { id } = req.params
            const { name, phone, email, role } = req.body

            const updated = await User.findByIdAndUpdate(
                id,
                { name, phone, email, role },
                { new: true }
            ).select("-password")

            if (!updated) {
                return next(new ApiError(404, "Foydalanuvchi topilmadi"))
            }

            res.status(200).json({
                success: true,
                message: "Foydalanuvchi ma'lumotlari yangilandi",
                data: updated,
            })
        } catch (err) {
            next(err)
        }
    },

    // 🔹 Foydalanuvchini o'chirish
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const deleted = await User.findByIdAndDelete(id)

            if (!deleted) {
                return next(new ApiError(404, "Foydalanuvchi topilmadi"))
            }

            res.status(200).json({
                success: true,
                message: "Foydalanuvchi o'chirildi",
            })
        } catch (err) {
            next(err)
        }
    },
}