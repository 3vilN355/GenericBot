import { MongoClient } from 'mongodb';
import { DbGuild, GuildDBAdapter } from '../../db.interface';

export class MongoGuildAdapter implements GuildDBAdapter {
    client: MongoClient | null;
    constructor(client: MongoClient | null) {
        this.client = client;
    }

    getGuildsCollection() {
        if (!this.client) throw new Error('Mongo not initialized. Call initMongoDB first.');
        return this.client.db('myDB').collection<DbGuild>('guilds');
    }

    createGuild(guild: Omit<DbGuild, 'id'>): Promise<DbGuild> {
        const coll = this.getGuildsCollection();
        return coll.insertOne({
            ...guild,
            createdAt: new Date(),
        }).then(result => {
            return {
                ...guild,
                id: result.insertedId.toString(),
                createdAt: new Date(),
            };
        });
    }

    getGuildByDiscordId(discordId: string): Promise<DbGuild | null> {
        const coll = this.getGuildsCollection();
        return coll.findOne({ discordId });
    }

    async updateGuild(discordId: string, updates: Partial<DbGuild>): Promise<void> {
        const coll = this.getGuildsCollection();
        await coll.updateOne({ discordId }, { $set: updates });
    }
}