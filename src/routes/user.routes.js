import express from "express"
import { UserController } from "../controllers/user.controller.js"
import { authGuard, roleGuard } from "../middlewares/guard.middleware.js"

const router = express.Router()

// faqat admin foydalanuvchilarga CRUD huquqi beramiz
router.get("/", authGuard, roleGuard(["admin"]), UserController.getAll)
router.get("/:id", authGuard, roleGuard(["admin"]), UserController.getOne)
router.post("/", authGuard, roleGuard(["admin"]), UserController.create)
router.put("/:id", authGuard, roleGuard(["admin"]), UserController.update)
router.delete("/:id", authGuard, roleGuard(["admin"]), UserController.delete)

export { router as UserRouter }