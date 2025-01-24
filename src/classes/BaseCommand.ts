import { CommandInteraction, InteractionReplyOptions, MessageFlags } from 'discord.js';

export default class BaseCommand {

    // Define some colors for easy access
    colors = {
        red: '#FF0000',
        green: '#00FF00',
        blue: '#0000FF',
    };

    // Utility methods that can be used in any command
    async ephReply(interaction: CommandInteraction, options: string | InteractionReplyOptions) {
        if (typeof options === 'string') {
            options = { content: options };
        }
        await interaction.reply({
            ...options,
            flags: MessageFlags.Ephemeral,
        });
    }

    async reply(interaction: CommandInteraction, options: string | InteractionReplyOptions) {
        if (typeof options === 'string') {
            options = { content: options };
        }
        await interaction.reply({
            ...options,
        });
    }
}