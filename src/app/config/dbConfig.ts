// src/config/dbConfig.ts
import mongoose from 'mongoose';
import config from '.';

const connectCentralDB = async () => {
    try {
        await mongoose.connect(config.central_db_uri as string);
        console.log(`Central DB connected successfully on ${config.port}.`);
    } catch (error) {
        console.error('Error connecting to Central DB:', error);
        process.exit(1);
    }
};

const connectCompanyDB = async (companyDbUri: string) => {
    try {
        const connection = await mongoose.createConnection(companyDbUri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`Connected to Company DB: ${companyDbUri}`);
        return connection;
    } catch (error) {
        console.error('Error connecting to Company DB:', error);
    }
};

export { connectCentralDB, connectCompanyDB };