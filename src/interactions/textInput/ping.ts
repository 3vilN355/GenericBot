import { ChatInputCommandInteraction } from 'discord.js';
import ChatInputCommand from '../../classes/ChatInputCommand';

export default class PingCommand extends ChatInputCommand {

    constructor() {
        super();
        this.data.setName('ping').setDescription('Replies with Pong!');
    }

    async execute(interaction: ChatInputCommandInteraction) {
        // Example of using the `ephReply` method to send an ephemeral reply
        await this.ephReply(interaction, 'Pong!');
    }
};

