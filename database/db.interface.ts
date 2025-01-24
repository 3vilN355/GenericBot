export interface DbUser {
    // number for SQL, string for Mongo _id or such
    id?: number | string;
    discordId: string;
    username?: string;
    createdAt?: Date;
}

export interface DbCounter {
    id: string;
    count: number;
}

export interface DbMessage {
    id?: number | string;
    authorId: number | string;
    replyToUserId?: number | string;
    guildId?: number | string;
    channelId?: number | string;
    threadId?: number | string;
    messageId?: number | string;
    content: string;
    createdAt?: Date;
}

export interface DbGuild {
    id?: number | string;
    discordId: string;
    createdAt?: Date;
}


export interface UserDBAdapter {
    createUser(user: Omit<DbUser, 'id'>): Promise<DbUser>;
    getUserByDiscordId(discordId: string): Promise<DbUser | null>;
    updateUser(discordId: string, updates: Partial<DbUser>): Promise<void>;
}

export interface MessageDBAdapter {
    createMessage(message: Omit<DbMessage, 'id'>): Promise<DbMessage>;
    getMessagesByUserId(userId: number | string): Promise<DbMessage[]>;
}

export interface GuildDBAdapter {
    createGuild(guild: Omit<DbGuild, 'id'>): Promise<DbGuild>;
    getGuildByDiscordId(discordId: string): Promise<DbGuild | null>;
    updateGuild(discordId: string, updates: Partial<DbGuild>): Promise<void>;
}

export interface CounterDBAdapter {
    incrementCounter(id: string): Promise<number>;
    getCounter(id: string): Promise<number>;
}

export interface DBAdapter {
    user: UserDBAdapter;
    message: MessageDBAdapter;
    guild: GuildDBAdapter;
    counter: CounterDBAdapter;
}

// The final shape you want to expose from "database/index.ts".
