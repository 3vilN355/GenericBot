import { ApplicationIntegrationType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import logger from '../logger';
import { IChatInputCommand } from '../types/commands';
import BaseCommand from './BaseCommand';

export default class ChatInputCommand extends BaseCommand implements IChatInputCommand {
    // Set any default properties for the command builder
    // By default, we do not allow userinstall of all commands
    // Can be overridden in the command itself
    data = new SlashCommandBuilder().setIntegrationTypes([ApplicationIntegrationType.GuildInstall]);


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(interaction: ChatInputCommandInteraction) {
        // Not implemented
        logger.warn(`Command at ${__filename} not implemented`);
    }


    // Any additional functions that are shared between multiple ChatInputCommands
}