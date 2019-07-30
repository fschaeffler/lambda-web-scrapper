# Web Scrapper

This web scrapper runs on AWS with a headless Chromium browser and Puppeteer.

## Development Setup

-   install Node.js 8.10 because this is the version being used by the Serverless service

-   install yarn from https://yarnpkg.com

-   install dependencies via `yarn install`

-   install serverless globally via `yarn global add serverless`

## Run (Local)

-   run the service via `npm run deploy`

## Deploy (Production)

-   deploy the Serverless service via `yarn deploy`

-   note down the created API-key from the deployment output

## Usage (Production)

The actualy endpoint URL is displayed in the deployment output. It looks like `https://<Gateway ID>.execute-api.eu-central-1.amazonaws.com/prod/scrape`.

In order to ensure only authorized clients can call this API, an API-key is needed for the call. This key needs to get specified in the HTTP Request Header for `x-api-key`.

An exemplary call of the endpoint would look like the following one.

Content of `request.json`

```
{
	"url": "https://www.sfit.services",
	"xpathes": [
		"//*/div/div/div/a",
		"//*/div/div/div"
	],
	"uniqueResults": true
}
```

`curl -X POST -H "x-api-key: API-SECRET-KEY" -d @request.json https://GATEWAY-ID.execute-api.eu-central-1.amazonaws.com/prod/scrape`

### Request Options

The request options get handed in as JSON-data. This data need to adhere the following structure.

-   `url`: [string] The URL which should get scrapped

-   `xpathes`: [array of strings] A list of XPathes of which the content should get retrieved

-   `uniqueResults` (optional): [boolean] When set to `true`, only unique results will get returned
