import Joi from '@hapi/joi';

const schema = Joi.object().keys({
    url: Joi.string()
        .uri()
        .required(),
    xpathes: Joi.array()
        .items(Joi.string())
        .unique()
        .min(1)
        .required(),
    uniqueResults: Joi.boolean()
});

export default input => {
    const validation = Joi.validate(input, schema);
    return !validation.error;
};
