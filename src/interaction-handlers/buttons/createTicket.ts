import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ChannelType } from 'discord.js';
import { ButtonStyle, PermissionFlagsBits } from 'discord-api-types/v10';
import { TicketStatus } from '@prisma/client';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class UserInteractionHandler extends InteractionHandler {
	public override async run(interaction: ButtonInteraction<'cached'>) {
		if (interaction.customId !== 'create_ticket') return;

		const ticketFound = await this.container.prisma.ticket.findFirst({
			where: {
				guildId: BigInt(interaction.guildId),
				userId: BigInt(interaction.user.id),
				status: TicketStatus.OPEN
			}
		});

		if (ticketFound) {
			return interaction.reply({
				content: 'You already have a ticket open!',
				ephemeral: true
			});
		}

		const { ticketCategory } = await this.container.prisma.guild.findUniqueOrThrow({
			where: {
				id: BigInt(interaction.guildId)
			}
		});

		const channel = await interaction.guild.channels.create({
			name: `ticket-${interaction.user.username}`,
			type: ChannelType.GuildText,
			parent: ticketCategory ? ticketCategory.toString() : null,
			permissionOverwrites: [
				{
					id: interaction.guild.roles.everyone,
					deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
				},
				{
					id: interaction.user.id,
					allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
				}
			]
		});

		const userId = BigInt(interaction.user.id);
		const guildId = BigInt(interaction.guildId);
		await this.container.prisma.ticket.create({
			data: {
				guild: {
					connect: {
						id: guildId
					}
				},
				user: {
					connectOrCreate: {
						where: {
							id: userId
						},
						create: {
							id: userId
						}
					}
				},
				channelId: BigInt(channel.id)
			}
		});

		await channel.send({
			content: `Hello ${interaction.user.toString()}!`,
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents([
					new ButtonBuilder() //
						.setCustomId('close_ticket')
						.setLabel('Close Ticket')
						.setStyle(ButtonStyle.Danger)
						.setEmoji('🔒')
				])
			]
		});

		return undefined;
	}
}
