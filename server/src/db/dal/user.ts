import { dbRes } from '../../interfaces';
import { User } from '../../models';
import { v4 as uuid4 } from 'uuid';
import { ServiceException } from '../../errors/errorsHandlers';
import { STATUS_CODES } from '../../enums';

export const createUserDb = async (body: { [key: string]: any }): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    body.id = uuid4();
    try {
        const resp: any = await User.create(body);
        defaultResp.result = resp;
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};

export const getUsersDb = async (params: { [key: string]: any }): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    const limit = params.limit || 10;
    const skip = params.offset || 0;
    try {
        const resp: any = await User.find({}, { password: 0 }, { limit, skip });
        defaultResp.result = resp;
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};

export const getUserByMobile = async (mobile: Number): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    try {
        const resp: any = await User.find({ mobile });
        if (!resp.length) {
            throw new ServiceException(STATUS_CODES.BAD_REQUEST, 'User Not found, Please SignUp');
        }
        defaultResp.result = resp[0];
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};

export const getUserByFilters = async (filters: { [key: string]: any }): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    try {
        const resp: any = await User.find(filters);
        if (!resp.length) {
            throw new ServiceException(STATUS_CODES.BAD_REQUEST, 'User Not found, Please SignUp');
        }
        defaultResp.result = resp[0];
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};

export const updateUserByQueryDb = async (body: { [key: string]: any }, query: { [key: string]: any }): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    try {
        delete body.password;
        if (body.email) {
            body.isEmailVerified = false;
        }
        const resp: any = await User.updateOne(query, body);
        defaultResp.result = resp;
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};
