import { Router } from 'express'
import { WaterProductController } from '../controllers/water.controller.js'
import { authGuard } from '../middlewares/guard.middleware.js'

const router = Router()

router.use(authGuard)
router.get('/', WaterProductController.getAll)
router.get('/:id', WaterProductController.getOne)
router.post('/', WaterProductController.add)
router.put('/:id', WaterProductController.update)
router.delete('/:id', WaterProductController.delete)

export { router as waterProductRouter }