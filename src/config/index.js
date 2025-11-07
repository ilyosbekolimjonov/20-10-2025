import dotenv from 'dotenv'
dotenv.config()

export const config = {
    app: {
        port: process.env.PORT,
    },
    db: {
        url: process.env.MONGO_URL,
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
    },
}