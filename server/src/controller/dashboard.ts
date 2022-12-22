import { Request, Response } from 'express';
import { createUserDb, getUserByMobile, getUsersDb } from '../db/dal';
import { STATUS_CODES } from '../enums';
import { apiRes, dbRes } from '../interfaces';
import { generateJwtToken } from '../middleware/auth';
import { comparePassword } from '../middleware/security';

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
