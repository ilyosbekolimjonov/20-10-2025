import Order from '../models/order.model.js'
import { searchAndPaginate } from '../helpers/searchAndPaginate.js'

export const OrderController = {
    //  Barcha orderlarni olish (search + paginate + populate)
    async getAll(req, res, next) {
        try {
            const { limit, page, search } = req.query
            const lim = limit ? parseInt(limit, 10) : 10
            const pa = page ? parseInt(page, 10) : 1
            const off = (pa - 1) * lim

            const { results, total } = await searchAndPaginate(
                search,
                Order,
                lim,
                off,
                [{ path: "customer_id" }, { path: "delivery_staff_id" }],
            )

            res.status(200).json({
                success: true,
                message: "Orderlar muvaffaqiyatli olindi",
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

    //  Bitta orderni olish
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const order = await Order.findById(id)
                .populate("customer_id")
                .populate("delivery_staff_id")

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order topilmadi",
                })
            }

            res.status(200).json({
                success: true,
                message: "Order topildi",
                data: order,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Order qo'shish
    async add(req, res, next) {
        try {
            const order = await Order.create(req.body)

            res.status(201).json({
                success: true,
                message: "Order muvaffaqiyatli qo'shildi",
                data: order,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Orderni o'chirish
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const order = await Order.findByIdAndDelete(id)

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order topilmadi",
                })
            }

            res.status(200).json({
                success: true,
                message: "Order muvaffaqiyatli o'chirildi",
                data: order,
            })
        } catch (err) {
            next(err)
        }
    },
}