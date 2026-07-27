import * as core from '@actions/core';
import { ShieldedAPI } from 'shielded-cli';

(async function run() {
	try {
		const token    = (core.getInput('shielded-token') || process.env.SHIELDED_TOKEN || '').trim();
		const shieldKey = core.getInput('shielded-key');
		const endpoint = core.getInput('endpoint');
		const title    = core.getInput('title');
		const color    = core.getInput('color');
		const text     = core.getInput('text');

		if (!token) {
			throw new Error('Missing token: set the shielded-token input or the SHIELDED_TOKEN environment variable.');
		}

		let options = {
			token: token,
		};

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

		const s = new ShieldedAPI();
		const shield = await s.updateShield(options);
		core.setOutput('shield-url', shield.ShieldURL);
	} catch (error) {
		core.setFailed(error.message);
	}
})();
