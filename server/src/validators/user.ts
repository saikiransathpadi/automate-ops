import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../enums';
import { validateField } from './utils';

const validateFieldsArr = ['email', 'mobile', 'password'];

export const signUpValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        validateFieldsArr.forEach((field) => {
            body[field] && validateField(field, body[field]);
        });
        next();
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};
