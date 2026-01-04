import { buildConfig } from 'payload/config';
import path from 'path';
import dotenv from 'dotenv';
import { Users } from './collections/Users';

dotenv.config();
import { Posts } from './collections/Posts';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';

export default buildConfig({
    serverURL: 'http://localhost:3001',
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
    },
    editor: slateEditor({}),
    collections: [
        Users,
        Posts,
    ],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    plugins: [],
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || '',
    }),
});
