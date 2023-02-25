import type { ArrayString } from '@skyra/env-utilities';
import type { PrismaClient } from '@prisma/client';

declare module 'discord.js' {
	interface Client {
		dev: boolean;
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
		ReviewerOnly: never;
	}
}

declare module '@skyra/env-utilities' {
	interface Env {
		CLIENT_OWNERS: ArrayString;
		DISCORD_TOKEN: string;

		API_URL: string;
		API_KEY: string;
		DATABASE_URL: string;
	}
}
declare module '@sapphire/pieces' {
	interface Container {
		prisma: PrismaClient;
	}
}

export default undefined;
