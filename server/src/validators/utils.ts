import { STATUS_CODES, VALIDATION_MESSAGES } from '../enums';
import { ServiceException } from '../errors/errorsHandlers';

const validators = {
    email: (userEmail: string) => {
        const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        return Boolean(userEmail.match(regex));
    },
    mobile: (userMobile: string) => {
        const regex = /^[1-9]\d*$/;
        return userMobile.length === 10 && Boolean(userMobile.match(regex));
    },
    password: (userPassword: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return Boolean(userPassword.match(regex));
    },
};

export const validateField = (field: string, value: string) => {
    const validator = validators[field];
    if (!validator(value)) {
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, `Invalid ${field}. ${VALIDATION_MESSAGES[field] || ''}`);
    }
};
