import { Request, Response, NextFunction } from 'express';
import { connectCompanyDB } from '../config/dbConfig';
import config from '../config';
// import CompanyModel from '../models/Company'; // Model for the central database storing company details

interface CustomRequest extends Request {
    companyDb?: any;
}


const companies = [
    {
        id: 1,
        name: 'ABC Company',
        email: 'test@gmal.com',
        dbName: 'company1',
    },
    {
        id: 2,
        name: 'XYZ Company',
        email: 'b@gmail.com',
        dbName: 'company2',
    },
    {
        id: 3,
        name: 'MNO Company',
        email: 'mno@gmail.com',
        dbName: 'company3',
    }
]


export const companyDbMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const companyId = req.headers['x-company-id'] as string;

    if (!companyId) {
        return res.status(400).json({ error: 'Company ID is required in the headers' });
    }

    try {
        // Fetch company details from the central database
        // const companyDetails = await CompanyModel.findOne({ companyId });

        const companyDetails = companies.find((company) => company.id === Number(companyId));

        if (!companyDetails || !companyDetails.dbName) {
            return res.status(404).json({ error: 'Company not found or database name missing' });
        }

        // Construct the full database URI using the common MongoDB cluster URI and the company's database name
        const companyDbURI = `${config.cluster_url}${companyDetails.dbName}?retryWrites=true&w=majority&appName=softcar`;


        console.log('Company DB URI:', companyDbURI);


        // Connect to the company's specific database
        const companyDbConnection = await connectCompanyDB(companyDbURI);
        req.companyDb = companyDbConnection;

        next();
    } catch (error) {
        console.error('Error connecting to company database:', error);
        return res.status(500).json({ error: 'Failed to connect to company database' });
    }
};
