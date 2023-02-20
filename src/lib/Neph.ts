import { CLIENT_OPTIONS } from '#root/config';
import { SapphireClient } from '@sapphire/framework';

export class NephClient extends SapphireClient {
	public override dev: boolean = process.env.NODE_ENV === 'development';

	public constructor() {
		super(CLIENT_OPTIONS);
	}
}
