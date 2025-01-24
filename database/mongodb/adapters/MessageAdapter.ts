import { Collection, MongoClient } from 'mongodb';
import { DbMessage, MessageDBAdapter } from '../../db.interface';

export class MongoMessageAdapter implements MessageDBAdapter {
    client: MongoClient | null;
    constructor(client: MongoClient | null) {
        this.client = client;
    }

    getMessagesCollection(): Collection<DbMessage> {
        if (!this.client) throw new Error('Mongo not initialized. Call initMongoDB first.');
        // Suppose we store everything in a DB called "myDB"
        return this.client.db('myDB').collection<DbMessage>('messages');
    }

    createMessage(message: Omit<DbMessage, 'id'>): Promise<DbMessage> {
        const coll = this.getMessagesCollection();
        return coll.insertOne({
            ...message,
            createdAt: new Date(),
        }).then(result => {
            return {
                ...message,
                id: result.insertedId.toString(),
                createdAt: new Date(),
            };
        });
    }
    getMessagesByUserId(userId: number | string): Promise<DbMessage[]> {
        const coll = this.getMessagesCollection();
        return coll.find({ authorId: userId }).toArray();
    }

}