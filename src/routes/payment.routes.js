import { Router } from 'express'
import { PaymentController } from '../controllers/payment.controller.js'
import { authGuard } from '../middlewares/guard.middleware.js'

const router = Router()

router.use(authGuard)
router.get('/', PaymentController.getAll)
router.get('/:id', PaymentController.getOne)
router.post('/', PaymentController.add)
router.put('/:id', PaymentController.update)
router.delete('/:id', PaymentController.delete)

export { router as paymentRouter }