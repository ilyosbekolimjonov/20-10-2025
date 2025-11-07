import { Router } from 'express'
import { OrderController } from '../controllers/order.controller.js'
import { authGuard } from '../middlewares/guard.middleware.js'

const router = Router()

router.use(authGuard)
router.get('/', OrderController.getAll)
router.get('/:id', OrderController.getOne)
router.post('/', OrderController.add)
router.delete('/:id', OrderController.delete)

export { router as orderRouter }