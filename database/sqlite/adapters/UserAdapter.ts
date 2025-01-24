import { DbUser, UserDBAdapter } from '../../db.interface';
import knex from '../knex';

const userTable = 'users';

type UserRow = {
    id: number;
    discord_id: string;
    created_at: Date;
    username?: string;
};

function toUser(row: UserRow): DbUser {
    if (!row) return row;
    return {
        id: row.id,
        discordId: row.discord_id,
        createdAt: row.created_at,
    };
}

export const sqliteUserAdapter: UserDBAdapter = {
    async createUser(userData) {
        const [id] = await knex(userTable).insert({
            discord_id: userData.discordId,
            created_at: new Date(),
        });

        // Now fetch the inserted row
        const inserted = await knex(userTable).where({ id }).first();
        return toUser(inserted);
    },

    async getUserByDiscordId(discordId) {
        const row = await knex(userTable).where({ discord_id: discordId }).first();
        return row ? toUser(row) : null;
    },

    async updateUser(discordId, userData) {
        // Build an object that matches table columns
        const updateObj: Partial<UserRow> = {};
        if (userData.username) updateObj.username = userData.username;

        await knex(userTable).where({ discord_id: discordId }).update(updateObj);
    },
};