// import { Request, Response, NextFunction } from 'express';
// import { connectCompanyDB } from '../config/dbConfig';
// import config from '../config';
// // import CompanyModel from '../models/Company'; // Model for the central database storing company details

// interface CustomRequest extends Request {
//     companyDb?: any;
// }

// // In-memory cache for storing database connections
// const dbConnections: { [key: string]: any } = {};

// const companies: {
//     id: number,
//     name: string,
//     email: string,
//     dbName: string,
// }[] = [
//         {
//             id: 1,
//             name: 'ABC Company',
//             email: 'test@gmal.com',
//             dbName: 'company1',
//         },
//         {
//             id: 2,
//             name: 'XYZ Company',
//             email: 'b@gmail.com',
//             dbName: 'company2',
//         },
//         {
//             id: 3,
//             name: 'MNO Company',
//             email: 'mno@gmail.com',
//             dbName: 'company3',
//         }
//     ]


// export const companyDbMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const companyId = req.headers['x-company-id'] as string;

//     if (!companyId) {
//         return res.status(400).json({ error: 'Company ID is required in the headers' });
//     }

//     try {
//         // Fetch company details from the central database
//         // const companyDetails = await CompanyModel.findOne({ companyId });

//         const companyDetails = companies.find((company) => company.id === parseInt(companyId));

//         const dbName = companyDetails?.dbName;

//         if (!dbName) {
//             return res.status(400).json({ error: 'Database  not found for the given company ID' });
//         }

//         // Check if a connection for this company already exists
//         if (!dbConnections[dbName]) {
//             // If not, create a new connection and store it in the cache
//             const companyDbURI = `${config.cluster_url}${dbName}?retryWrites=true&w=majority&appName=softcar`;
//             console.log('Connecting to new Company DB URI:', companyDbURI);

//             // Connect to the company's specific database
//             const companyDbConnection = await connectCompanyDB(companyDbURI);
//             dbConnections[dbName] = companyDbConnection; // Cache the connection
//         } else {
//             console.log(`Using cached connection for company: ${companyDetails.name}`);
//         }

//         // Set the connection to the request object
//         req.companyDb = dbConnections[dbName];

//         next();
//     } catch (error) {
//         console.error('Error connecting to company database:', error);
//         return res.status(500).json({ error: 'Failed to connect to company database' });
//     }
// };



import { Request, Response, NextFunction } from 'express';
import ConnectionManager from '../config/ConnectionManager';

interface CustomRequest extends Request {
    companyDb?: any;
}

const companies: {
    id: number,
    name: string,
    email: string,
    dbName: string,
}[] = [
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
        // const companyDetails = await CompanyModel.findOne({ id: companyId });

        const companyDetails = companies.find((company) => company.id === parseInt(companyId));

        if (!companyDetails || !companyDetails.dbName) {
            return res.status(404).json({ error: 'Company not found or database name missing' });
        }

        const dbName = companyDetails.dbName;

        // Get or create a connection to the company's database
        const companyDbConnection = await ConnectionManager.getConnection(dbName);

        // Attach the database connection to the request object
        req.companyDb = companyDbConnection;

        next();
    } catch (error) {
        console.error('Error connecting to company database:', error);
        return res.status(500).json({ error: 'Failed to connect to company database' });
    }
};
