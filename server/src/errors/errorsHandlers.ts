export class ServiceException {
    statusCode: number;
    message: string;
    error: any;
    constructor(statusCode: number, message: string, error?: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
