import { Request, Response } from "express";
import { createAuthCodeService, verifyAuthCodeService } from "../services/authCode";

export const sendCodeController = async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;

    await createAuthCodeService(email);
    res.status(201).json({ message: 'Code sent successfully!' });
}

export const verifyCodeController = async (req: Request, res: Response) => {
    const { email, code }: { email: string, code: string } = req.body;

    await verifyAuthCodeService(email, code);
    res.status(200).json({ message: 'Code verified successfully!' });
}