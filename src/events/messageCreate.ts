import { Client, Events, Message } from 'discord.js';
import { db } from '../../database';
import logger from '../logger';

export default {
    name: Events.MessageCreate,
    once: false,
    async execute(client: Client, message: Message) {
        if (message.author.bot) return;

        // Increment the message counter, example of using the database
        await db.counter?.incrementCounter('messages');

        logger.info(`[${message.author.tag}]: ${message.content}`);
    },
};
