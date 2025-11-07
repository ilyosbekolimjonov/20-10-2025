import { Router } from 'express'
import { DeliveryStaffController } from '../controllers/deliveryStaff.controller.js'
import { authGuard, roleGuard } from '../middlewares/guard.middleware.js'

const router = Router()

router.use(authGuard)

router.get('/', roleGuard('admin', 'deliveryStaff', 'customer'), DeliveryStaffController.getAll)
router.get('/profile/:id', roleGuard('admin', 'deliveryStaff', 'customer'), DeliveryStaffController.getOne)
router.put('/:id', roleGuard('admin', 'deliveryStaff'), DeliveryStaffController.update)
router.delete('/:id', roleGuard('admin', 'deliveryStaff'), DeliveryStaffController.delete)

export { router as deliveryStaffRouter }