import District from '../models/district.model.js'
import { searchAndPaginate } from '../helpers/searchAndPaginate.js'

export const DistrictController = {
    //  Barcha districtlarni olish (search + paginate)
    async getAll(req, res, next) {
        try {
            const { limit, page, search } = req.query
            const lim = limit ? parseInt(limit, 10) : 10
            const pa = page ? parseInt(page, 10) : 1
            const off = (pa - 1) * lim

            const { results, total } = await searchAndPaginate(
                search,
                District,
                lim,
                off,
            )

            res.status(200).json({
                success: true,
                message: 'Districtlar muvaffaqiyatli olindi',
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

    // Bitta districtni olish
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const district = await District.findById(id)

            if (!district) {
                return res.status(404).json({
                    success: false,
                    message: 'District topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: 'District topildi',
                data: district,
            })
        } catch (err) {
            next(err)
        }
    },

    //  District qo‘shish
    async add(req, res, next) {
        try {
            const district = await District.create(req.body)

            res.status(201).json({
                success: true,
                message: 'District muvaffaqiyatli qo‘shildi',
                data: district,
            })
        } catch (err) {
            next(err)
        }
    },

    //  Districtni yangilash
    async update(req, res, next) {
        try {
            const { id } = req.params
            const updatedData = req.body

            const district = await District.findByIdAndUpdate(id, updatedData, {
                new: true,
            })

            if (!district) {
                return res.status(404).json({
                    success: false,
                    message: 'District topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: 'District muvaffaqiyatli yangilandi',
                data: district,
            })
        } catch (err) {
            next(err)
        }
    },

    // Districtni o‘chirish
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const district = await District.findByIdAndDelete(id)

            if (!district) {
                return res.status(404).json({
                    success: false,
                    message: 'District topilmadi',
                })
            }

            res.status(200).json({
                success: true,
                message: "District muvaffaqiyatli o'chirildi",
                data: district,
            })
        } catch (err) {
            next(err)
        }
    },
}