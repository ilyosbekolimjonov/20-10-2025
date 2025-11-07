import Payment from '../models/payment.model.js'
import { searchAndPaginate } from '../helpers/searchAndPaginate.js'

export const PaymentController = {
    //  Barcha paymentlarni olish (search + paginate + populate)
    async getAll(req, res, next) {
        try {
            const { limit, page, search } = req.query
            const lim = limit ? parseInt(limit, 10) : 10
            const pa = page ? parseInt(page, 10) : 1
            const off = (pa - 1) * lim

            const { results, total } = await searchAndPaginate(
                search,
                Payment,
                lim,
                off,
                [{ path: 'order_id' }],
            )

            res.status(200).json({
                success: true,
                message: 'Paymentlar muvaffaqiyatli olindi',
                total,
                page: pa,
                limit: lim,
                count: results.length,
                data: results,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Bitta paymentni olish
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const payment = await Payment.findById(id).populate('order_id')

            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: 'Payment topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: 'Payment topildi',
                data: payment,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Payment qo‘shish
    async add(req, res, next) {
        try {
            const payment = await Payment.create(req.body)

            res.status(201).json({
                success: true,
                message: 'Payment muvaffaqiyatli qo‘shildi',
                data: payment,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Paymentni yangilash
    async update(req, res, next) {
        try {
            const { id } = req.params
            const updatedData = req.body

            const updatedPayment = await Payment.findByIdAndUpdate(id, updatedData, {
                new: true,
                runValidators: true,
            })

            if (!updatedPayment) {
                return res.status(404).json({
                    success: false,
                    message: 'Payment topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: 'Payment muvaffaqiyatli yangilandi',
                data: updatedPayment,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Paymentni o‘chirish
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const payment = await Payment.findByIdAndDelete(id)

            if (!payment) {
                return res.status(404).json({
                    success: false,
                    message: 'Payment topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: "Payment muvaffaqiyatli o'chirildi",
                data: payment,
            })
        } catch (err) {
            next(err)
        }
    },
}