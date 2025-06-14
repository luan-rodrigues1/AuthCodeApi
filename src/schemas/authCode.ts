import { z } from 'zod';

export const sendCodeSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
});

export const verifyCodeSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    code: z.string().min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'),
}); 