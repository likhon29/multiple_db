import { Request, Response } from 'express';

type TMeta = {
    limit?: number;
    page?: number;
    total?: number;
    totalPage?: number;
};

type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    meta?: TMeta;
    data: T;
    path?: string;
};

const sendResponse = <T>(req: Request, res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        status: data?.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data,
        path: req.originalUrl,  // Add API path to the response
    });
};

export default sendResponse;
