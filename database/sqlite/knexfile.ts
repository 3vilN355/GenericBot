import type { Knex } from 'knex';
import path from 'path';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'better-sqlite3',
        connection: {
            filename: path.join(__dirname, 'dev.sqlite3'),
        },
        migrations: {
            directory: path.join(__dirname, 'migrations'),
            extension: 'ts',
        },
        seeds: {
            directory: path.join(__dirname, 'seeds'),
            extension: 'ts',
        },
        useNullAsDefault: true,
    },
    // You can define "production" too if you want
};

export default config;
