import { MessageContextMenuCommandInteraction } from 'discord.js';
import MessageContextCommand from '../../classes/MessageContextCommand';

export default class QuoteMessage extends MessageContextCommand {

    constructor() {
        super();
        this.data.setName('Quote Message');
    }

    async execute(interaction: MessageContextMenuCommandInteraction) {
        const message = interaction.targetMessage;
        this.ephReply(interaction, `Quote: "${message.content}"`);
    }
}
