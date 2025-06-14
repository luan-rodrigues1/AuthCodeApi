import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
        return;
    }

    console.error(error);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}; 