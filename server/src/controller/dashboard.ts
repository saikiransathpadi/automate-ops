import { Request, Response } from 'express';
import { STATUS_CODES } from '../enums/apiRes';
import { apiRes } from '../interfaces/apiRes';

export const testRoute = (req: Request, res: Response) => {
    console.table({
        path: req.route.path,
        body: req.body,
        pathParams: req.params,
        apiaPrams: req.query
    });
    const resp: apiRes = {
        result: {},
        message: 'Success',
        developer_message: 'Success',
    };
    res.status(STATUS_CODES.SUCCESS).json(resp);
};
