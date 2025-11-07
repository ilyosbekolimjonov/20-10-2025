import Water_product from '../models/waterProduct.model.js'
import { searchAndPaginate } from '../helpers/searchAndPaginate.js'

export const WaterProductController = {
    // Barcha mahsulotlarni olish (search + paginate)
    async getAll(req, res, next) {
        try {
            const { limit, page, search } = req.query
            const lim = limit ? parseInt(limit, 10) : 10
            const pa = page ? parseInt(page, 10) : 1
            const off = (pa - 1) * lim

            const { results, total } = await searchAndPaginate(
                search,
                Water_product,
                lim,
                off,
            )

            res.status(200).json({
                success: true,
                message: 'Mahsulotlar muvaffaqiyatli olindi',
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

    // Bitta mahsulotni olish
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const water_product = await Water_product.findById(id)

            if (!water_product) {
                return res.status(404).json({
                    success: false,
                    message: 'Mahsulot topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: 'Mahsulot topildi',
                data: water_product,
            })
        } catch (err) {
            next(err)
        }
    },

    // Mahsulot qo‘shish
    async add(req, res, next) {
        try {
            const water_product = await Water_product.create(req.body)

            res.status(201).json({
                success: true,
                message: 'Mahsulot muvaffaqiyatli qo‘shildi',
                data: water_product,
            })
        } catch (err) {
            next(err)
        }
    },

    // Mahsulotni yangilash
    async update(req, res, next) {
        try {
            const { id } = req.params
            const updatedData = req.body

            const updatedWaterProduct = await Water_product.findByIdAndUpdate(
                id,
                updatedData,
                { new: true, runValidators: true },
            )

            if (!updatedWaterProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Mahsulot topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: 'Mahsulot muvaffaqiyatli yangilandi',
                data: updatedWaterProduct,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Mahsulotni o‘chirish
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const water_product = await Water_product.findByIdAndDelete(id)

            if (!water_product) {
                return res.status(404).json({
                    success: false,
                    message: 'Mahsulot topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: "Mahsulot muvaffaqiyatli o'chirildi",
                data: water_product,
            })
        } catch (err) {
            next(err)
        }
    },
}