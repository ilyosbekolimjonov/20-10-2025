import Customer from "../models/customers.model.js"
import { ApiError } from "../middlewares/apiError.js"

export const CustomerController = {
    async getAll(req, res, next) {
        try {
            const customers = await Customer.find()
            res.status(200).json({
                success: true,
                message: "Mijozlar muvaffaqiyatli olindi",
                count: customers.length,
                data: customers,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Bitta mijozni olish
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const customer = await Customer.findById(id)

            if (!customer) {
                return next(new ApiError(404, "Mijoz topilmadi"))
            }

            res.status(200).json({
                success: true,
                message: "Mijoz topildi",
                data: customer,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Yangi mijoz qo'shish
    async create(req, res, next) {
        try {
            const { name, phone } = req.body

            if (!name || !phone) {
                return next(new ApiError(400, "Ism va telefon raqam kiritilishi shart"))
            }

            const existing = await Customer.findOne({ phone })
            if (existing) {
                return next(new ApiError(400, "Bu telefon raqam allaqachon mavjud"))
            }

            const customer = await Customer.create({ name, phone })

            res.status(201).json({
                success: true,
                message: "Mijoz muvaffaqiyatli qo'shildi",
                data: customer,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Mijozni yangilash
    async update(req, res, next) {
        try {
            const { id } = req.params
            const { name, phone } = req.body

            const updated = await Customer.findByIdAndUpdate(
                id,
                { name, phone },
                { new: true }
            )

            if (!updated) {
                return next(new ApiError(404, "Mijoz topilmadi"))
            }

            res.status(200).json({
                success: true,
                message: "Mijoz ma'lumotlari yangilandi",
                data: updated,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Mijozni o'chirish
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const deleted = await Customer.findByIdAndDelete(id)

            if (!deleted) {
                return next(new ApiError(404, "Mijoz topilmadi"))
            }

            res.status(200).json({
                success: true,
                message: "Mijoz o'chirildi",
            })
        } catch (err) {
            next(err)
        }
    },
}