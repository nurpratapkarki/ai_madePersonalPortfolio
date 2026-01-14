import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

type ValidationSource = 'body' | 'params' | 'query';

// Generic validation middleware factory
export const validate = (
  schema: Joi.ObjectSchema,
  source: ValidationSource = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const dataToValidate = req[source];
    
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errorMessages,
      });
      return;
    }

    // Replace with validated value
    req[source] = value;
    next();
  };
};

// Validate body
export const validateBody = (schema: Joi.ObjectSchema) => validate(schema, 'body');

// Validate params
export const validateParams = (schema: Joi.ObjectSchema) => validate(schema, 'params');

// Validate query
export const validateQuery = (schema: Joi.ObjectSchema) => validate(schema, 'query');
