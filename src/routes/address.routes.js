import { Router } from 'express'
import { AddressController } from '../controllers/address.controller.js'
import { authGuard, roleGuard, selfGuard } from '../middlewares/guard.middleware.js'
import { addressValidate, addressUpdate } from '../validation/address.validation.js'
import { validate } from '../validation/validation.js'

const router = Router()

router.use(authGuard)

router.get('/', roleGuard('admin'), AddressController.getAll)
router.get('/:id', roleGuard('admin', 'customer', 'deliveryStaff'), AddressController.getOne)
router.post('/', selfGuard, validate(addressValidate, 'body'), AddressController.add)
router.put('/:id', selfGuard, validate(addressUpdate, 'body'), AddressController.update)
router.delete('/:id', selfGuard, AddressController.delete)

export { router as addressRouter }