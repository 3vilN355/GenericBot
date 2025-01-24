import { EmbedBuilder, UserContextMenuCommandInteraction } from 'discord.js';
import UserContextCommand from '../../classes/UserContextCommand';

export default class UserInfo extends UserContextCommand {

    constructor() {
        super();
        this.data.setName('User Info');
    }

    async execute(interaction: UserContextMenuCommandInteraction) {
        const user = interaction.targetUser;
        await this.ephReply(interaction, { embeds: [
            new EmbedBuilder()
                .setTitle('User Info')
                .addFields([
                    { name: 'Username', value: user.username, inline: true },
                    { name: 'ID', value: user.id, inline: true },
                    { name: 'Bot', value: user.bot ? 'Yes' : 'No', inline: true },
                    { name: 'Created At', value: user.createdAt.toDateString(), inline: true },
                ]),
        ] });
    }
};
