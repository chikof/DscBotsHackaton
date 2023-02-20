import '#root/config';

import '@kaname-png/plugin-subcommands-advanced/register';
import '@sapphire/plugin-logger/register';

import * as colorette from 'colorette';
import { inspect } from 'util';

inspect.defaultOptions.depth = 1;
colorette.createColors({ useColor: true });
