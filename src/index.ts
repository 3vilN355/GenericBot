import { Client, Collection, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { initFn } from '../database';
import ChatInputCommand from './classes/ChatInputCommand';
import MessageContextCommand from './classes/MessageContextCommand';
import UserContextCommand from './classes/UserContextCommand';
import logger from './logger';
import expressApp from './server';
// import db from './database'; // optional, if you use the SQLite module


// Setup Discord client
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// We'll store all commands in client.commands
client.commands = new Collection<string, ChatInputCommand | UserContextCommand | MessageContextCommand>();

// Utility function to load .ts files
function loadFiles(dir: string) {
    const commandsDir = path.join(__dirname, dir);
    if (!fs.existsSync(commandsDir)) return [];
    return fs
        .readdirSync(commandsDir)
        .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
        .map(file => path.join(commandsDir, file));
}

// Load slash commands
const textInputFiles = loadFiles('./interactions/textInput');
for (const file of textInputFiles) {
    import(pathToFileURL(file).href).then((obj) => {
        const cmd = obj.default?.default ? obj.default.default : obj.default;
        const command = new cmd() as ChatInputCommand;
        if (command?.data?.name) {
            client.commands.set(command.data.name, command);
            logger.info(`Loaded slash command: ${command.data.name}`);
        }
    });
}

// Load user context commands
const userContextFiles = loadFiles('./interactions/userContext');
for (const file of userContextFiles) {
    import(pathToFileURL(file).href).then((obj) => {
        const cmd = obj.default?.default ? obj.default.default : obj.default;
        const command = new cmd() as UserContextCommand;
        if (command?.data?.name) {
            client.commands.set(command.data.name, command);
            logger.info(`Loaded user context command: ${command.data.name}`);
        }
    });
}

// Load message context commands
const messageContextFiles = loadFiles('./interactions/messageContext');
for (const file of messageContextFiles) {
    import(pathToFileURL(file).href).then((obj) => {
        const cmd = obj.default?.default ? obj.default.default : obj.default;
        const command = new cmd() as MessageContextCommand;
        if (command?.data?.name) {
            client.commands.set(command.data.name, command);
            logger.info(`Loaded message context command: ${command.data.name}`);
        }
    });
}

// Load events
const eventFiles = loadFiles('./events');
for (const file of eventFiles) {
    import(pathToFileURL(file).href).then((obj) => {
        const event = obj.default?.default ? obj.default.default : obj.default;
        if (!event?.name) return;
        if (event.once) {
            client.once(event.name, (...args: unknown[]) => event.execute(client, ...args));
        }
        else {
            client.on(event.name, (...args: unknown[]) => event.execute(client, ...args));
        }
        logger.info(`Loaded event: ${event.name}`);
    });
}

// Load database
initFn().then(() => {
    logger.info('Database initialized');
}).catch(err => {
    logger.error(`Database error: ${err}`);
});

// Login to Discord
const token = process.env.DISCORD_TOKEN;
client.login(token).then(() => {
    logger.info('Logging in to Discord...');
}).catch(err => {
    logger.error(`Login error: ${err}`);
});

// Optionally start Express server
const port = process.env.PORT || 3000;
expressApp.listen(port, () => {
    logger.info(`Express server running on port ${port}`);
});