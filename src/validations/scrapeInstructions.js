import Joi from '@hapi/joi';

const schema = Joi.object().keys({
	url: Joi.string().uri().required(),
	xpathes: Joi.array().items(Joi.string()).min(1).required()
});

export default input => {
	const validation = Joi.validate(input, schema);
	return !validation.error;
};