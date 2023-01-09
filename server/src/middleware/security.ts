import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { getUserByFilters } from '../db/dal';
import { STATUS_CODES } from '../enums';
import { dbRes } from '../interfaces';

export const encryptPassword = async (password: string): Promise<string> => {
    const salt: string = await bcrypt.genSalt(10);
    const passwordHash: string = await bcrypt.hash(password, salt);
    return passwordHash;
};

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
    const resp: boolean = await bcrypt.compare(password, hashPassword);
    return resp;
};

export const validateCurrentPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: dbRes = await getUserByFilters({ userId: req.body.userId });
        console.log('users data', userData)
        const isCorrectPassword: boolean = await comparePassword(req.body.password, userData.result.password);
        console.log('validating current pass =>', isCorrectPassword)
        if (!isCorrectPassword) {
            return res.status(400).json({
                message: "Current password doesn't match",
            });
        }
        next();
    } catch (error: any) {
        console.log(error);
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            message: error.message,
            developer_message: error.message,
        });
    }
};
