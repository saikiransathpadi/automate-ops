import bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
    const salt: string = await bcrypt.genSalt(10);
    const passwordHash: string = await bcrypt.hash(password, salt);
    return passwordHash;
};

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
    const resp: boolean = await bcrypt.compare(password, hashPassword);
    return resp;
};
