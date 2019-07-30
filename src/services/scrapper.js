import { EXCLUDED_RESOURCE_TYPES } from '../constants/constants';
import * as chromium from 'chrome-aws-lambda';

export default async instructions => {
	const browser = await chromium.puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath,
		// headless: true
		headless: chromium.headless
	});

	const page = await browser.newPage();

	await page.setRequestInterception(true);

	page.on('request', request => {
		if (EXCLUDED_RESOURCE_TYPES.includes(request.resourceType())) {
			request.abort();
			return;
		}

		request.continue();
	});

	await page.goto('https://google.de');
	const result = await page.title();
	await browser.close();

	return result;
};