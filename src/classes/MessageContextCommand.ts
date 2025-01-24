import { ApplicationCommandType, ContextMenuCommandBuilder, MessageContextMenuCommandInteraction } from 'discord.js';
import logger from '../logger';
import { IMessageContextCommand } from '../types/commands';
import BaseCommand from './BaseCommand';

export default class MessageContextInputCommand extends BaseCommand implements IMessageContextCommand {
    // Set any default properties for the command builder
    data = new ContextMenuCommandBuilder().setType(ApplicationCommandType.Message);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(interaction: MessageContextMenuCommandInteraction) {
        // Not implemented
        logger.warn(`Command at ${__filename} not implemented`);
    }


    // Any additional functions that are shared between multiple MessageContextCommands

    // Example: Get the member who sent the target message
    async getMessageMember(interaction: MessageContextMenuCommandInteraction) {
        if (!interaction.guild) return null;
        const member = await interaction.guild.members.fetch(interaction.targetMessage.author.id);
        return member;
    }
}