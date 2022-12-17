import { Request, Response } from 'express';
import { createUserDb } from '../db/dal';
import { STATUS_CODES } from '../enums';
import { apiRes, dbRes } from '../interfaces';

export const createUser = async (req: Request, res: Response) => {
    console.table({
        path: req.route.path,
        body: req.body,
        pathParams: req.params,
        apiaPrams: req.query,
    });
    try {
        const user: Map<any, any> = req.body;
        const dbResponse: dbRes = await createUserDb(user);
        if (dbResponse.error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                result: dbResponse.result,
                message: dbResponse.message,
                developer_message: dbResponse.message,
            });
        }
        const resp: apiRes = {
            result: dbResponse.result,
            message: 'Success',
            developer_message: 'Success',
        };
        return res.status(STATUS_CODES.SUCCESS).json(resp);
    } catch (err: any) {
        return res.status(STATUS_CODES.SERVER_ERROR).json({
            err: err,
            message: err.message,
        });
    }
};
