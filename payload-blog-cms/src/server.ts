import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

import { MongoMemoryServer } from 'mongodb-memory-server';

const start = async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    process.env.MONGODB_URI = uri;
    console.log(`MongoDB Memory Server started at ${uri}`);

    await payload.init({
        secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
        express: app,
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        },
    });

    // Serve static files
    app.use(express.static('public'));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, async () => {
        payload.logger.info(`Express is listening on port ${PORT}`);
    });
};

start();
