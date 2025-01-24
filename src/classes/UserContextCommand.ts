import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction } from 'discord.js';
import logger from '../logger';
import { IUserContextCommand } from '../types/commands';
import BaseCommand from './BaseCommand';

export default class UserContextCommand extends BaseCommand implements IUserContextCommand {
    // Set any default properties for the command builder
    data = new ContextMenuCommandBuilder().setType(ApplicationCommandType.User);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(interaction: UserContextMenuCommandInteraction) {
        // Not implemented
        logger.warn(`Command at ${__filename} not implemented`);
    }


    // Any additional functions that are shared between multiple MessageContextCommands

    // Example: Get the member who initiated the command
    async getCommandMember(interaction: UserContextMenuCommandInteraction) {
        if (!interaction.guild) return null;
        const member = await interaction.guild.members.fetch(interaction.user.id);
        return member;
    }
}