import * as core from '@actions/core';
import { ShieldedAPI, type ShieldOptions } from 'shielded-cli';

(async function run() {
	try {
		const token = (core.getInput('shielded-token') || process.env.SHIELDED_TOKEN || '').trim();
		const shieldKey = core.getInput('shielded-key');
		const endpoint = core.getInput('endpoint');
		const title = core.getInput('title');
		const color = core.getInput('color');
		const text = core.getInput('text');

		if (!token) {
			throw new Error('Missing token: set the shielded-token input or the SHIELDED_TOKEN environment variable.');
		}

		const options: Partial<ShieldOptions> = { token };

		if (endpoint) {
			options.endpoint = endpoint;
		}

		if (shieldKey) {
			options.shieldKey = shieldKey;
		}

		if (title) {
			options.title = title;
		}

		if (text) {
			options.text = text;
		}

		if (color) {
			options.color = color;
		}

		const shield = await new ShieldedAPI().updateShield(options);
		if (!shield || !shield.ShieldURL) {
			throw new Error('Shielded API response did not include ShieldURL.');
		}

		core.setOutput('shield-url', shield.ShieldURL);
	} catch (error) {
		core.setFailed(error instanceof Error ? error.message : String(error));
	}
})();
