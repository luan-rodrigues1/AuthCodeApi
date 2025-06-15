import { Repository } from "typeorm";
import { AuthCode } from "../entities/authCode";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";

export const createAuthCodeService = async (email: string) => {
    const authCodeRepo: Repository<AuthCode> =
    AppDataSource.getRepository(AuthCode);

    const existingAuthCode = await authCodeRepo.findOne({ where: { email, isRedeemed: false } });

    if (existingAuthCode) {
        await authCodeRepo.update(existingAuthCode.id, { isRedeemed: true });
    }

    const createCode = Math.floor(100000 + Math.random() * 900000);
    
    const createAuthCode = authCodeRepo.create({
        email,
        code: createCode.toString(),
    });
    
    await authCodeRepo.save(createAuthCode);
    
    await sendCodeEmailService(email, createCode.toString(), createAuthCode.id);
    
    return createAuthCode;
}

export const verifyAuthCodeService = async (email: string, code: string) => {
    const authCodeRepo: Repository<AuthCode> =
    AppDataSource.getRepository(AuthCode);

    const authCode = await authCodeRepo.findOne({ where: { email, code, isRedeemed: false } });

    if (!authCode) {
        throw new AppError('Invalid or expired code', 404);
    }

    const now = new Date();
    const codeAge = now.getTime() - authCode.createdAt.getTime();
    const fifteenMinutesInMs = 15 * 60 * 1000;

    if (codeAge > fifteenMinutesInMs) {
        await authCodeRepo.update(authCode.id, { isRedeemed: true });
        throw new AppError('Code has expired', 400);
    }

    await authCodeRepo.update(authCode.id, { isRedeemed: true });
}

export const sendCodeEmailService = async (email: string, code: string, authCodeId: string) => {
    const authCodeRepo: Repository<AuthCode> =
    AppDataSource.getRepository(AuthCode);

    const response = await fetch('https://n8n.jrmendonca.com.br/webhook/sendmail', {
        method: 'POST',
        headers: {
            'Token': 'xptoxptoxptoxptoxptoxpto',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: email,
            subject: "Código de autenticação",
            message: `Seu código de autenticação é: ${code}`
        })
    });

    if (!response.ok) {
        await authCodeRepo.update(authCodeId, { isRedeemed: true });
        throw new AppError('Error sending email', 500);
    }
}