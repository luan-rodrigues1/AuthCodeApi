import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    message: 'Validation error',
                    errors: JSON.parse(error.message)
                });
                return;
            }
            res.status(400).json({
                message: 'Validation error',
                errors: error
            });
            return;
        }
    };
}; 