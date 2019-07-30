import scrapper from '../services/scrapper';
import { STATUS_CODES } from '../constants/constants';
import isValid from '../validations/scrapeInstructions';

export default async event => {
    try {
        const instructions = JSON.parse(event.body || '{}');

        if (!isValid(instructions)) {
            return {
                statusCode: STATUS_CODES.BAD_PARAMETERS,
                body: JSON.stringify({
                    error: 'invalid scrapper instructions'
                })
            };
        }

        const result = await scrapper(instructions);

        return {
            statusCode: STATUS_CODES.OK,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return {
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            body: JSON.stringify({
                error
            })
        };
    }
};
