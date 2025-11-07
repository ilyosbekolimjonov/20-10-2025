export const validate = (schema, sorov) => {
    return async (req, res, next) => {
        const result = schema.safeParse(req[sorov]);
        if (!result.success) {
            const message = result.error.errors[0]?.message || 'Validatsiya xatosi';
            return res.status(422).json({ message });
        }
        req[sorov] = result.data;
        next();
    };
};
