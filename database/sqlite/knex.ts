import Knex from 'knex';
import knexConfig from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const knexInstance = Knex(config);

export default knexInstance;
