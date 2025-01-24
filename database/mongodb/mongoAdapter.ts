import { MongoClient } from 'mongodb';
import { DBAdapter } from '../db.interface';
import { MongoCounterAdapter } from './adapters/CounterAdapter';
import { MongoGuildAdapter } from './adapters/GuildAdapter';
import { MongoMessageAdapter } from './adapters/MessageAdapter';
import { MongoUserAdapter } from './adapters/UserAdapter';


let client: MongoClient | null = null;

async function initMongoDB(uri: string) {
    if (client) return;
    client = new MongoClient(uri);
    // ready
    client.on('connectionReady', () => {
        console.log('MongoDB connected');
    });
    client.on('close', () => {
        client = null;
    });
    client.on('error', (err) => {
        console.error('MongoDB error:', err);
    });
    await client.connect();
    mongoDBAdapter = {
        user: new MongoUserAdapter(client),
        message: new MongoMessageAdapter(client),
        guild: new MongoGuildAdapter(client),
        counter: new MongoCounterAdapter(client),
    };
}


// We can group multiple adapters if we have more than "user"
export let mongoDBAdapter: Partial<DBAdapter> = {};

// We'll also export an init function
export async function initMongo(uri: string) {
    await initMongoDB(uri);
}
