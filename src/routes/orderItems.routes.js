import { Router } from 'express'
import { OrderItemController } from '../controllers/orderItem.controller.js'
import { authGuard } from '../middlewares/guard.middleware.js'

const router = Router()

router.use(authGuard)
router.get('/', OrderItemController.getAll)
router.get('/:id', OrderItemController.getOne)
router.post('/', OrderItemController.add)
router.delete('/:id', OrderItemController.delete)

export { router as orderItemsRouter }