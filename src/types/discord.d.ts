import { Collection } from 'discord.js';
import { MessageContextCommand, SlashCommand, UserContextCommand } from './commandTypes';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, SlashCommand | UserContextCommand | MessageContextCommand>;
  }
}
