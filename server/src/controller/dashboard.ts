import { Request, Response } from 'express';
import { createUserDb, getUserByMobile, getUsersDb, saveOtpDb, updatePasswordDb } from '../db/dal';
import { STATUS_CODES } from '../enums';
import { apiRes, dbRes, validateOtpRes } from '../interfaces';
import { generateJwtToken } from '../middleware/auth';
import { comparePassword } from '../middleware/security';
import { sendEmail } from '../utils/email';
import { EMAIL_SUBJECTS, generateOtpSixDigit, getOtpEmailTemplateBySource } from '../utils/helper';
import { validateAndUpdateOtpLogsBLL } from './securityBLL';

export const createUser = async (req: Request, res: Response) => {
    console.log(
        JSON.stringify({
            path: req.route.path,
            body: req.body,
            pathParams: req.params,
            apiPrams: req.query,
        })
    );
    try {
        const user: { [key: string]: any } = req.body;
        const dbResponse: dbRes = await createUserDb(user);
        const resp: apiRes = {
            result: dbResponse.result,
            message: 'User Created Successfully',
            developer_message: 'Success',
        };
        return res.status(STATUS_CODES.SUCCESS).json(resp);
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    console.log(
        JSON.stringify({
            path: req.route.path,
            body: req.body,
            pathParams: req.params,
            apiPrams: req.query,
        })
    );
    try {
        const queryParams: { [key: string]: any } = req.query;
        const dbResponse: dbRes = await getUsersDb(queryParams);
        const resp: apiRes = {
            result: dbResponse.result,
            message: 'Users fetched successfully',
            developer_message: 'Success',
        };
        return res.status(STATUS_CODES.SUCCESS).json(resp);
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};

export const userSignUp = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const resp: dbRes = await createUserDb(body);
        return res.status(STATUS_CODES.SUCCESS).json({
            message: 'Success',
            result: resp,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};

export const userLogIn = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const userData: dbRes = await getUserByMobile(body.mobile);
        console.log(userData);
        const isCorrectPassword: boolean = await comparePassword(body.password, userData.result.password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                message: 'Incorrect Password',
            });
        }
        return res.status(STATUS_CODES.SUCCESS).json({
            message: 'Success',
            result: isCorrectPassword,
            token: await generateJwtToken({ user_id: userData.result.id, mobile: userData.result.mobile }),
        });
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};

export const udpatePasswordReset = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        if (!body.userId || !body.password || !body.newPassword) {
            throw new Error('user details or current password and new password are required ');
        }
        const resp: dbRes = await updatePasswordDb({ id: body.userId }, body.newPassword);
        return res.status(STATUS_CODES.SUCCESS).json({
            message: 'Success',
            result: resp,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};

export const sendOtpForEmailVerification = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const otp = generateOtpSixDigit();
        const { email: resourceId, source: requestSource } = body;
        const [otpResp]: any = await Promise.all([
            saveOtpDb({ otp, resourceId, requestSource }),
            sendEmail(resourceId, EMAIL_SUBJECTS.OPT_VERIFICATION_SUBJECT, getOtpEmailTemplateBySource(requestSource, otp)),
        ]);
        return res.status(STATUS_CODES.SUCCESS).json({
            message: 'Success',
            result: { otpId: otpResp.result.id },
        });
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};

export const validateAndUpdateOtpLogs = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { isValid, message }: validateOtpRes = await validateAndUpdateOtpLogsBLL(body);
        return res.status(STATUS_CODES.SUCCESS).json({
            result: {
                isValid,
                message,
            },
        });
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.developer_message || error.message,
        });
    }
};

export const UpdatePasswordForgot = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const resp: dbRes = await updatePasswordDb({ email: body.email }, body.newPassword);
        return res.status(STATUS_CODES.SUCCESS).json({
            message: 'Success',
            result: resp,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};
