import type { ArrayString } from '@skyra/env-utilities';

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
	}
}

export default undefined;
