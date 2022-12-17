import { dbRes } from '../../interfaces';
import { User } from '../../models';

export const createUserDb = async (body: Map<any, any>): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    try {
        const resp: any = await User.create(body);
        defaultResp.result = resp;
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        defaultResp.error = err;
        defaultResp.message = err.message;
    }
    return defaultResp;
};
