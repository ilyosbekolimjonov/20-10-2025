import { Router } from 'express'
import { DistrictController } from '../controllers/district.controller.js'
import { authGuard, roleGuard } from '../middlewares/guard.middleware.js'

const router = Router()

router.use(authGuard)

router.get('/', roleGuard('admin', 'deliveryStaff', 'customer'), DistrictController.getAll)
router.get('/:id', roleGuard('admin', 'deliveryStaff', 'customer'), DistrictController.getOne)
router.post('/', roleGuard('admin', 'deliveryStaff', 'customer'), DistrictController.add)
router.put('/:id', roleGuard('admin', 'deliveryStaff', 'customer'), DistrictController.update)
router.delete('/:id', roleGuard('admin', 'deliveryStaff', 'customer'), DistrictController.delete)

export { router as districtRouter }