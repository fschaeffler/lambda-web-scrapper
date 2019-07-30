import * as chromium from 'chrome-aws-lambda';
import { EXCLUDED_RESOURCE_TYPES } from '../constants/constants';

/* eslint-disable no-plusplus, no-await-in-loop */

const evaluateXPath = async (page, xpath, uniqueResults) => {
    const results = [];

    await page.waitForXPath(xpath);
    const xpathItems = await page.$x(xpath);

    for (let i = 0; i < xpathItems.length; i++) {
        const text = await page.evaluate(
            element => element.textContent,
            xpathItems[i]
        );

        if (text && text.length > 0) {
            if (uniqueResults !== true || !results.includes(text)) {
                results.push(text);
            }
        }
    }

    return results;
};

const evaluateXPathes = async (page, xpathes, uniqueResults) => {
    const results = {};

    for (let i = 0; i < xpathes.length; i++) {
        const xpath = xpathes[i];
        const xpathResults = await evaluateXPath(page, xpath, uniqueResults);

        results[xpath] = xpathResults;
    }

    return results;
};

/* eslint-enable no-plusplus, no-await-in-loop */

export default async instructions => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
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

    await page.goto(instructions.url);

    const results = await evaluateXPathes(
        page,
        instructions.xpathes,
        instructions.uniqueResults
    );

    await browser.close();

    return results;
};
