import Address from "../models/address.model.js"
import { searchAndPaginate } from "../helpers/searchAndPaginate.js"

export const AddressController = {
    // Hammasini olish (search, paginate, populate bilan)
    async getAll(req, res, next) {
        try {
            const { limit, page, search } = req.query
            const lim = limit ? parseInt(limit, 10) : 10
            const pa = page ? parseInt(page, 10) : 1
            const off = (pa - 1) * lim

            const { results, total } = await searchAndPaginate(
                search,
                Address,
                lim,
                off,
                [
                    { path: "customer_id", select: "name phone" },
                    { path: "district_id", select: "name" },
                ],
            )

            res.status(200).json({
                success: true,
                message: "Manzillar muvaffaqiyatli olindi",
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

    //  Bitta manzilni olish
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const address = await Address.findById(id)
                .populate("customer_id", "name phone")
                .populate("district_id", "name")

            if (!address) {
                return res.status(404).json({
                    success: false,
                    message: "Address topilmadi!",
                })
            }

            res.status(200).json({
                success: true,
                message: "Address topildi",
                data: address,
            })
        } catch (err) {
            next(err)
        }
    },

    // Address qo'shish
    async add(req, res, next) {
        try {
            const address = await Address.create(req.body)
            res.status(201).json({
                success: true,
                message: "Address muvaffaqiyatli qo'shildi",
                data: address,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Address yangilash
    async update(req, res, next) {
        try {
            const { id } = req.params
            const updatedData = req.body

            const address = await Address.findByIdAndUpdate(id, updatedData, {
                new: true,
            })

            if (!address) {
                return res.status(404).json({
                    success: false,
                    message: "Address topilmadi!",
                })
            }

            res.status(200).json({
                success: true,
                message: "Address yangilandi",
                data: address,
            })
        } catch (err) {
            next(err)
        }
    },

    // Address o"chirish
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const address = await Address.findByIdAndDelete(id)

            if (!address) {
                return res.status(404).json({
                    success: false,
                    message: "Address topilmadi!",
                })
            }

            res.status(200).json({
                success: true,
                message: "Address o'chirildi",
                data: address,
            })
        } catch (err) {
            next(err)
        }
    },
}