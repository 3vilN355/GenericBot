import {
    ChatInputCommandInteraction,
    Client,
    Events,
    Interaction,
    MessageContextMenuCommandInteraction,
    MessageFlags,
    UserContextMenuCommandInteraction,
} from 'discord.js';
import ChatInputCommand from '../classes/ChatInputCommand';
import MessageContextCommand from '../classes/MessageContextCommand';
import UserContextCommand from '../classes/UserContextCommand';
import logger from '../logger';


export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: Client, interaction: Interaction) {
        if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;

        // Differentiate Slash vs Context
        const commandName = interaction.commandName;
        const commandCollection = interaction.client.commands;

        // Find the corresponding command
        const command = commandCollection.get(commandName);
        if (!command) {
            logger.warn(`No command matching "${commandName}" was found.`);
            return;
        }

        try {
            if (interaction.isChatInputCommand()) {
                const chatInputCommand = command as ChatInputCommand;
                await chatInputCommand.execute(interaction as ChatInputCommandInteraction);
            }
            else if (interaction.isUserContextMenuCommand()) {
                const userCtxCmd = command as UserContextCommand;
                await userCtxCmd.execute(interaction as UserContextMenuCommandInteraction);
            }
            else if (interaction.isMessageContextMenuCommand()) {
                const messageCtxCmd = command as MessageContextCommand;
                await messageCtxCmd.execute(interaction as MessageContextMenuCommandInteraction);
            }
        }
        catch (error) {
            logger.error(`Error executing ${commandName}: ${error}`);
            if (interaction.isRepliable()) {
                await interaction.reply({ content: 'There was an error!', flags: MessageFlags.Ephemeral });
            }
        }
    },
};
