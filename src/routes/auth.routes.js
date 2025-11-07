import { Router } from 'express'
import { authController } from '../controllers/auth.controller.js'
import { authGuard, refreshGuard, roleGuard } from '../middlewares/guard.middleware.js'
import { validate } from '../validation/validation.js'
import { customerValidate, loginValidate } from '../validation/user.validation.js'

const router = Router()

router.get('/profile', authGuard, roleGuard('admin', 'deliveryStaff', 'customer'), authController.profile)
router.post('/signin', validate(loginValidate, 'body'), authController.signin)
router.post('/signup', validate(customerValidate, 'body'), authController.signup)
router.post('/refresh', refreshGuard, authController.updateAccess)

export { router as authRouter }