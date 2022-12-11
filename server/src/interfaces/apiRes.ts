export interface apiRes {
    result: { [key: string | number]: any  };
    message: string;
    developer_message?: string;
}
