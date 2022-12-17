export interface apiRes {
    result: any[] | Map<any, any> | number;
    message: string;
    developer_message?: string;
}

export interface dbRes {
    result: any[] | Map<any, any> | number;
    error?: any;
    message?: string;
}
