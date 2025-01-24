// The single point where you choose which adapter to export
import { DBAdapter } from './db.interface';
import { initMongo, mongoDBAdapter } from './mongodb/mongoAdapter';
import { initSQLite, sqliteDBAdapter } from './sqlite/sqliteAdapter';
// import { initSQLite, sqliteDBAdapter } from './sqlite/sqliteAdapter';

// You might detect from an env var or rename the folder you want to "activate".
const DB_TYPE = process.env.DB_TYPE || 'mongo';

let db: Partial<DBAdapter>;
let initFn: () => Promise<void>;

switch (DB_TYPE) {
case 'mongo':
    initFn = async () => {
        await initMongo(process.env.MONGO_URI || 'mongodb://localhost:27017');
        db = mongoDBAdapter;
    };
    break;
case 'sqlite':
    db = sqliteDBAdapter;
    initFn = async () => {
        await initSQLite();
        // or do nothing if you run migrations externally
    };
    break;
default:
    throw new Error(`Unknown DB_TYPE: ${DB_TYPE}`);
}

export { db, initFn };

