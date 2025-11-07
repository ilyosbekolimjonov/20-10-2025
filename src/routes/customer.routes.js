import { Router } from 'express'
import { CustomerController } from '../controllers/customer.controller.js'
import { authGuard } from '../middlewares/guard.middleware.js'
import { validate } from '../validation/validation.js'
import { customerUpdate, adminUpdateUserValidate } from '../validation/user.validation.js'

const router = Router()

router.get('/', authGuard, CustomerController.getAll)
router.put(
    '/:id',
    authGuard,
    (req, res, next) => {
        // Admin yoki customer validatsiyasini tanlash
        const schema =
            req.user.role === 'admin' ? adminUpdateUserValidate : customerUpdate
        return validate(schema, 'body')(req, res, next)
    },
    CustomerController.update,
)

export { router as customerRouter }