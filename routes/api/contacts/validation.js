const Joi = require('joi');
const mongoose = require('mongoose');
const { HttpCode } = require('../../../helpers/constants');

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/[A-Z]\w+/)
    .min(2)
    .max(30)
    .required(),
  phone: Joi.string().min(7).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/[A-Z]\w+/)
    .min(2)
    .max(30)
    .optional(),
  phone: Joi.string().min(7).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: HttpCode.BAD_REQUEST, message: err.message });
  }
};

module.exports.validateCreateContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateUpdateStatusContact = (req, _res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next);
};

module.exports.validateObjectId = (req, _res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: 'ObjectId is not valid',
    });
  }
  next();
};
