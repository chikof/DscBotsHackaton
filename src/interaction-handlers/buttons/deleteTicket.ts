import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { TicketStatus } from '@prisma/client';
import type { ButtonInteraction } from 'discord.js';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class UserInteractionHandler extends InteractionHandler {
	public override async run(interaction: ButtonInteraction<'cached'>) {
		if (interaction.customId !== 'close_ticket') return;

		const ticketFound = await this.container.prisma.ticket.findFirst({
			where: {
				guildId: BigInt(interaction.guildId),
				userId: BigInt(interaction.user.id),
				status: TicketStatus.OPEN
			}
		});

		if (!ticketFound) {
			return interaction.reply({
				content: 'You do not have an open ticket to delete.',
				ephemeral: true
			});
		}

		const channel = await this.container.client.channels.fetch(ticketFound.channelId.toString());
		if (!channel) return;

		await this.container.prisma.ticket.delete({
			where: {
				channelId_guildId: {
					channelId: BigInt(interaction.channelId),
					guildId: BigInt(interaction.guildId)
				}
			}
		});

		await channel.delete();
		console.log('Ticket deleted');

		return undefined;
	}
}
