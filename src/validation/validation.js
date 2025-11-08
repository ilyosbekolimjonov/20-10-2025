export const validate = (schema, sorov) => {
    return async (req, res, next) => {
        try {
            const data = req[sorov]
            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: `So'rovda ${sorov} topilmadi`,
                })
            }

            const result = schema.safeParse(data)

            if (!result.success) {
                const message = result.error?.errors?.[0]?.message || 'Validatsiya xatosi'
                return res.status(422).json({ success: false, message })
            }

            req[sorov] = result.data
            next()
        } catch (err) {
            console.error('Validatsiya xatosi:', err)
            res.status(500).json({
                success: false,
                message: 'Validator ishlashida kutilmagan xato',
                error: err.message,
            })
        }
    }
}