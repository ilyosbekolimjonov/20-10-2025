import User from '../models/user.model.js'
import {
    verifyToken,
    generateAccessToken,
    generateRefreshToken,
} from '../helpers/jwt.js'
import { ApiError } from '../middlewares/apiError.js'

export const authController = {
    // Ro‘yxatdan o‘tish
    async signup(req, res, next) {
        try {
            const { name, phone, password, email, role } = req.body

            const userExist = await User.findOne({ email: email.toLowerCase() })
            if (userExist) {
                return next(new ApiError(403, "Email oldin ro'yxatdan o'tgan"))
            }

            const newUser = await User.create({
                name,
                phone,
                email: email.toLowerCase(),
                password,
                role,
            })

            const accessToken = generateAccessToken(newUser)
            const refreshToken = generateRefreshToken(newUser)

            res.status(201).json({
                success: true,
                message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
                data: {
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role,
                    },
                    accessToken,
                    refreshToken,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    // Tizimga kirish
    async signin(req, res, next) {
        try {
            const { email, password } = req.body

            const userData = await User.findOne({ email: email.toLowerCase() })
            if (!userData) return next(new ApiError(404, 'User topilmadi'))

            const isValidPassword = await userData.comparePassword(password)
            if (!isValidPassword)
                return next(new ApiError(401, "Email yoki parol noto'g'ri"))

            const accessToken = generateAccessToken(userData)
            const refreshToken = generateRefreshToken(userData)

            res.status(200).json({
                success: true,
                message: 'Kirish muvaffaqiyatli amalga oshirildi',
                data: {
                    user: {
                        id: userData._id,
                        name: userData.name,
                        email: userData.email,
                        role: userData.role,
                    },
                    accessToken,
                    refreshToken,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    //  Profilni olish
    async profile(req, res, next) {
        try {
            const user = await User.findById(req.user).select('-password')
            if (!user) return next(new ApiError(404, 'User topilmadi'))

            res.status(200).json({
                success: true,
                message: 'Foydalanuvchi profili',
                data: user,
            })
        } catch (error) {
            next(error)
        }
    },

    //  Refresh token orqali yangilash
    async updateAccess(req, res, next) {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return next(new ApiError(401, "Refresh token yo'q"))
            }

            const refreshToken = authHeader.split(' ')[1]
            const decoded = await verifyToken(
                refreshToken,
                process.env.JWT_REFRESH_SECRET,
            )

            const user = await User.findById(decoded.id)
            if (!user) return next(new ApiError(404, 'User topilmadi'))

            const accessToken = generateAccessToken(user)

            res.status(200).json({
                success: true,
                message: 'Access token yangilandi',
                data: { accessToken },
            })
        } catch (error) {
            next(new ApiError(401, 'Yaroqsiz yoki muddati tugagan refresh token'))
        }
    },
}