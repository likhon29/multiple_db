import mongoose from 'mongoose';
import config from '../config';

class ConnectionManager {
    private static instances: { [key: string]: any } = {};

    static async getConnection(dbName: string) {
        // If a connection for the given dbName already exists, return it
        if (ConnectionManager.instances[dbName]) {
            console.log(`Reusing existing connection for database: ${dbName}`);
            return ConnectionManager.instances[dbName];
        }

        // Otherwise, create a new connection
        const dbURI = `${config.cluster_url}${dbName}?retryWrites=true&w=majority&appName=softcar`;
        console.log(`Creating new connection for database: ${dbURI}`);

        const connection = mongoose.createConnection(dbURI, {
            maxPoolSize: 50, // Use connection pooling with a max of 50 connections
        });

        // Store the connection in the instances cache
        ConnectionManager.instances[dbName] = connection;

        return connection;
    }

    // Optionally, a method to close connections (e.g., for shutdown or cleanup)
    static async closeConnection(dbName: string) {
        if (ConnectionManager.instances[dbName]) {
            await ConnectionManager.instances[dbName].close();
            delete ConnectionManager.instances[dbName];
            console.log(`Connection to database ${dbName} closed.`);
        }
    }

    // Optional: Close all connections
    static async closeAllConnections() {
        const dbNames = Object.keys(ConnectionManager.instances);
        for (const dbName of dbNames) {
            await ConnectionManager.closeConnection(dbName);
        }
    }
}

export default ConnectionManager;