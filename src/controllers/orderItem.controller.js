import Order_item from '../models/orderItem.model.js'
import { searchAndPaginate } from '../helpers/searchAndPaginate.js'

export const OrderItemController = {
    //  Barcha order itemlarni olish (search + paginate + populate)
    async getAll(req, res, next) {
        try {
            const { limit, page, search } = req.query
            const lim = limit ? parseInt(limit, 10) : 10
            const pa = page ? parseInt(page, 10) : 1
            const off = (pa - 1) * lim

            const { results, total } = await searchAndPaginate(
                search,
                Order_item,
                lim,
                off,
                [{ path: 'order_id' }, { path: 'product_id' }],
            )

            res.status(200).json({
                success: true,
                message: 'Order itemlar muvaffaqiyatli olindi',
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

    //  Bitta order itemni olish
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const order_item = await Order_item.findById(id)
                .populate('order_id')
                .populate('product_id')

            if (!order_item) {
                return res.status(404).json({
                    success: false,
                    message: 'Order item topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: 'Order item topildi',
                data: order_item,
            })
        } catch (err) {
            next(err)
        }
    },

    // ➕ Order item qo‘shish
    async add(req, res, next) {
        try {
            const order_item = await Order_item.create(req.body)

            res.status(201).json({
                success: true,
                message: 'Order item muvaffaqiyatli qo‘shildi',
                data: order_item,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Order itemni o‘chirish
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const order_item = await Order_item.findByIdAndDelete(id)

            if (!order_item) {
                return res.status(404).json({
                    success: false,
                    message: 'Order item topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: "Order item muvaffaqiyatli o'chirildi",
                data: order_item,
            })
        } catch (err) {
            next(err)
        }
    },
}