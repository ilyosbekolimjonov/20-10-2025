import { TokenHelper } from "../helpers/token.js"
import { ApiError } from "./apiError.js"

export const authGuard = (req, res, next) => {
    try {
        const header = req.headers.authorization
        if (!header || !header.startsWith("Bearer ")) {
            throw ApiError.unauthorized("Token does not exist or is in the wrong format")
        }

        const token = header.split(" ")[1]
        const decoded = TokenHelper.verifyAccessToken(token)

        req.user = decoded // foydalanuvchini request’ga biriktiramiz
        next()
    } catch (err) {
        next(ApiError.unauthorized("Token is invalid or expired"))
    }
}