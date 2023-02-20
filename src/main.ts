import { NephClient } from '#lib/Neph';
import { container } from '@sapphire/framework';

import '#lib/setup';

const client = new NephClient();

const main = async () => {
	try {
		await client.login();
	} catch (error) {
		container.logger.error(error);
		client.destroy();
		process.exit(1);
	}
};

main().catch(container.logger.error.bind(container.logger));
