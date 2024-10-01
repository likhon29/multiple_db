import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../../../../utils/sendResponse';
import { getSingleCompanyService } from '../services';

const getSingleCompany = async (req: Request, res: Response) => {

    const { id } = req.params;

    const company = getSingleCompanyService(Number(id));

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Company is retrieved successfully',
        data: company,
    });
};

const createCompany = async (req: Request, res: Response) => {
    sendResponse(req, res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Company is created successfully',
        data: {
            id: 1,
            name: 'Softcar',
            email: 'ab@gmail.com',
        },
    });
};

const getAllCompanies = async (req: Request, res: Response) => {
    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Companies are retrieved successfully',
        data: [
            {
                id: 1,
                name: 'Softcar',
                email: '',
            },
            {
                id: 2,
                name: 'Softcar',
                email: '',
            },
        ],
    });
};

export const CompanyController = {
    getSingleCompany,
    createCompany,
    getAllCompanies,
};
