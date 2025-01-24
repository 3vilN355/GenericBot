import { Collection, MongoClient } from 'mongodb';
import { DbUser, UserDBAdapter } from '../../db.interface';


// Implementation of the UserDBAdapter interface for Mongo
export class MongoUserAdapter implements UserDBAdapter {
    client: MongoClient | null;
    constructor(client: MongoClient | null) {
        // You can initialize stuff here if needed
        this.client = client;
    }

    getUsersCollection(): Collection<DbUser> {
        if (!this.client) throw new Error('Mongo not initialized. Call initMongoDB first.');
        // Suppose we store everything in a DB called "myDB"
        return this.client.db('myDB').collection<DbUser>('users');
    }

    async createUser(user: Omit<DbUser, 'id'>) {
        const coll = this.getUsersCollection();
        const result = await coll.insertOne({
            ...user,
            createdAt: new Date(),
        });
        return {
            ...user,
            id: result.insertedId.toString(),
            createdAt: new Date(),
        };
    }

    async getUserByDiscordId(discordId: string) {
        const coll = this.getUsersCollection();
        return coll.findOne({ discordId });
    }

    async updateUser(discordId: string, updates: Partial<DbUser>) {
        const coll = this.getUsersCollection();
        await coll.updateOne({ discordId }, { $set: updates });
    }
};