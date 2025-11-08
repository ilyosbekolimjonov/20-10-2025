import { Router } from "express"
import { addressRouter } from "./address.routes.js"
import { deliveryStaffRouter } from "./deliveryStaff.routes.js"
import { orderItemsRouter } from "./orderItems.routes.js"
import { orderRouter } from "./order.routes.js"
import { districtRouter } from "./district.routes.js"
import { paymentRouter } from "./payment.routes.js"
import { waterProductRouter } from "./water.routes.js"
import { authRouter } from "./auth.routes.js"
import { UserRouter } from "./user.routes.js"

const MainRouter = Router()

MainRouter.use("/users", UserRouter)
MainRouter.use("/addresses", addressRouter)
MainRouter.use("/delivery-staff", deliveryStaffRouter)
MainRouter.use("/order-items", orderItemsRouter)
MainRouter.use("/orders", orderRouter)
MainRouter.use("/districts", districtRouter)
MainRouter.use("/payments", paymentRouter)
MainRouter.use("/water-products", waterProductRouter)
MainRouter.use("/auth", authRouter)

export { MainRouter }