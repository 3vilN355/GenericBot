import { Collection, MongoClient } from 'mongodb';
import { CounterDBAdapter, DbCounter } from '../../db.interface';

export class MongoCounterAdapter implements CounterDBAdapter {
    client: MongoClient | null;
    constructor(client: MongoClient | null) {
        this.client = client;
    }

    getCountersCollection(): Collection<DbCounter> {
        if (!this.client) throw new Error('Mongo not initialized. Call initMongoDB first.');
        // Suppose we store everything in a DB called "myDB"
        return this.client.db('myDB').collection<DbCounter>('counters');
    }

    incrementCounter(id: string): Promise<number> {
        const coll = this.getCountersCollection();
        return coll.findOneAndUpdate({ id }, { $inc: { count: 1 } }, { upsert: true, returnDocument: 'after',
        }).then(result => {
            return result!.count;
        });
    }

    getCounter(id: string): Promise<number> {
        const coll = this.getCountersCollection();
        return coll.findOne({ id }).then(result => {
            return result?.count || 0;
        });
    }
}