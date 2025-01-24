import {
    ChatInputCommandInteraction,
    MessageContextMenuCommandInteraction,
    UserContextMenuCommandInteraction,
} from 'discord.js';


export interface IChatInputCommand {
    execute(interaction: ChatInputCommandInteraction): Promise<ChatInputCommandInteractionExecResult>;
}

export type ChatInputCommandInteractionExecResult = void;


export interface IUserContextCommand {
    execute: (interaction: UserContextMenuCommandInteraction) => Promise<UserContextCommandInteractionExecResult>;
}

export type UserContextCommandInteractionExecResult = void;


export interface IMessageContextCommand {
    execute: (interaction: MessageContextMenuCommandInteraction) => Promise<MessageContextCommandInteractionExecResult>;
}

export type MessageContextCommandInteractionExecResult = void;