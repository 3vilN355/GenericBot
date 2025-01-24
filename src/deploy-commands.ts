/**
 * Deploys (registers) slash and context commands to Discord.
 * If GUILD_ID is provided, registers commands to that guild (faster).
 * Otherwise, registers globally.
 */
import { APIApplicationCommand, ContextMenuCommandBuilder, REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const token = process.env.DISCORD_TOKEN!;
const clientId = process.env.CLIENT_ID!;
const guildId = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(token);

// Utility to load all .ts files from a directory
function loadFiles(dir: string) {
    const commandsDir = path.join(__dirname, dir);
    if (!fs.existsSync(commandsDir)) return [];

    return fs
        .readdirSync(commandsDir)
        .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
        .map(file => path.join(commandsDir, file));
}

(async () => {
    try {
        console.log('Started refreshing application commands...');

        // Collect all command data
        const textInputFiles = loadFiles('./interactions/textInput');
        const userContextFiles = loadFiles('./interactions/userContext');
        const messageContextFiles = loadFiles('./interactions/messageContext');

        const commandsPayload: (SlashCommandBuilder | ContextMenuCommandBuilder)[] = [];

        // Slash commands
        for (const file of textInputFiles) {
            const { default: slashCommand } = await import(pathToFileURL(file).href);
            const command = new slashCommand();
            if (command?.data) {
                commandsPayload.push(command.data);
            }
        }

        // User context
        for (const file of userContextFiles) {
            const { default: userCommand } = await import(pathToFileURL(file).href);
            const command = new userCommand();
            if (command?.data) {
                commandsPayload.push(command.data);
            }
        }

        // Message context
        for (const file of messageContextFiles) {
            const { default: messageCommand } = await import(pathToFileURL(file).href);
            const command = new messageCommand();
            if (command?.data) {
                commandsPayload.push(command.data);
            }
        }

        if (guildId) {
            // Register commands in a specific guild (faster for dev/testing)
            const data = (await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commandsPayload },
            )) as APIApplicationCommand[];
            console.log(`Successfully reloaded ${data.length} guild command(s).`);
        }
        else {
            // Register commands globally (take up to an hour to update)
            const data = (await rest.put(Routes.applicationCommands(clientId), {
                body: commandsPayload,
            })) as APIApplicationCommand[];
            console.log(`Successfully reloaded ${data.length} global command(s).`);
        }
    }
    catch (error) {
        console.error(error);
    }
})();
