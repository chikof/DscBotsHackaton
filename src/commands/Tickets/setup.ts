import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } from 'discord.js';

@ApplyOptions<Command.Options>({
	preconditions: ['OwnerOnly']
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((cmd) =>
			cmd
				//
				.setName(this.name)
				.setDescription('Tickets owo?')
				.addChannelOption((opt) =>
					opt //
						.setName('channel')
						.setDescription('The channel to send the ticket to')
						.setRequired(true)
				)
		);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction<'cached'>) {
		const channel = interaction.options.getChannel('channel', true);

		if (channel.type !== ChannelType.GuildText) return;
		await this.container.prisma.guild.create({
			data: {
				id: BigInt(interaction.guildId),
				ticketChannel: BigInt(channel.id),
				ticketCategory: channel.parentId ? BigInt(channel.parentId) : null
			}
		});

		await channel.send({
			content: 'Click the button below to create a ticket!',
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents([
					new ButtonBuilder() //
						.setCustomId('create_ticket')
						.setLabel('Create Ticket')
						.setStyle(ButtonStyle.Primary)
						.setEmoji('🎫')
				])
			]
		});

		return interaction.reply('Ticket channel set!');
	}
}
