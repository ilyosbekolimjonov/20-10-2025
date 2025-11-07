import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"
import { errorHandler } from "./src/middlewares/errorHandler.js"
import { MainRouter } from "./src/routes/index.js"

dotenv.config()

const app = express()
app.use(express.json())

// Routes
app.use("/", MainRouter)

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000

async function bootstrap() {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

bootstrap()