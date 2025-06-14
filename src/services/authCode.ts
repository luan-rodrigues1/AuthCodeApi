import { Repository } from "typeorm";
import { AuthCode } from "../entities/authCode";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";

export const createAuthCodeService = async (email: string) => {
    const authCodeRepo: Repository<AuthCode> =
    AppDataSource.getRepository(AuthCode);
    const createCode = Math.floor(100000 + Math.random() * 900000);
    
    const createAuthCode = authCodeRepo.create({
        email,
        code: createCode.toString(),
    });
    
    await authCodeRepo.save(createAuthCode);
    
    return createAuthCode;
}

export const verifyAuthCodeService = async (email: string, code: string) => {
    const authCodeRepo: Repository<AuthCode> =
    AppDataSource.getRepository(AuthCode);

    const authCode = await authCodeRepo.findOne({ where: { email, code, isRedeemed: false } });

    if (!authCode) {
        throw new AppError('Invalid or expired code', 401);
    }

    await authCodeRepo.update(authCode.id, { isRedeemed: true });
}