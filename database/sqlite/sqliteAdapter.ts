import { DBAdapter } from '../db.interface';
import { sqliteUserAdapter } from './adapters/UserAdapter';

export const sqliteDBAdapter: Partial<DBAdapter> = {
    user: sqliteUserAdapter,
};

// If you have an init or migrations step, you can do it here or via separate CLI:
export async function initSQLite() {
    // e.g., run migrations or do nothing if you run them via CLI
    console.log('SQLite DB adapter is ready (assuming migrations are run).');
}
