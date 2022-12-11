import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../enums/apiRes';

export const authenticatedRouter = async (req: Request, res: Response, next: NextFunction) => {
    let accessTokenFromClient = req.headers.authorization || req.headers.Authorization;

    if (!accessTokenFromClient) return res.status(STATUS_CODES.UNAUTHORIZED).json({ response: 'unauthorized' });
    // need to add jwt validation
    next();
};
