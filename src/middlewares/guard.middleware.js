import { config } from '../config/index.js'
import { verifyToken } from '../helpers/jwt.js'
import User from '../models/user.model.js'
import { ApiError } from './apiError.js'


export const authGuard = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new ApiError(401, 'Token mavjud emas'))
        }

        const token = authHeader.split(' ')[1]

        const verified = await verifyToken(token, config.jwt.accessSecret)
        const user = await User.findById(verified.id)
        req.user = user
        next()
    } catch (error) {
        return next(error)
    }
}

export const refreshGuard = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new ApiError(401, 'Refresh token mavjud emas'))
        }

        const token = authHeader.split(' ')[1]
        const decoded = await verifyToken(token, process.env.JWT_REFRESH_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        next(new ApiError(401, 'Refresh token yaroqsiz yoki muddati tugagan'))
    }
}

export const roleGuard = (...role) => {
    
    return (req, res, next) => {
        const userRoles = Array.isArray(req.user.role)
            ? req.user.role
            : [req.user.role]

        console.log({ user: req.user })
        console.log({ userRoles })
        console.log({ role })

        const hasAccess = userRoles.some((r) => role.includes(r))
        if (!hasAccess) {
            return next(
                new Error('Sizning rolingiz ushbu yonalishga kirish huquqiga ega emas'),
            )
        }
        next()
    }
}


export const selfGuard = (req, res, next) => {
    try {
        let { id } = req.params
        let { role } = req.user
        if (id == req.user.id || role == 'admin') {
            next()
            return
        }
        res.status(405).send({ message: 'Not allowed !' })
    } catch (error) {
        return next(error)
    }
}