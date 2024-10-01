
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
// import seedSuperAdmin from './app/DB';
import config from './app/config';
import { connectCentralDB } from './app/config/dbConfig';

let server: Server;

async function main() {
    try {
        // connectCentralDB();

        if (!config.central_db_name) {
            throw new Error("Central DB name is not defined in the configuration.");
        }
        const db = config.cluster_url + config.central_db_name + '?retryWrites=true&w=majority' + '&appName=cluster0';

        await mongoose.connect(db);
        server = app.listen(config.port, () => {
            console.log(`Central DB: Server running on port ${config.port}`);
        }
        );

    } catch (err) {
        console.log(err);
    }
}

main();

process.on('unhandledRejection', (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});
