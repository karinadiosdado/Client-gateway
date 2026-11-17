import 'dotenv/config';
import joi from 'joi';

interface EnVars {
  PORT: number;
  PRODUCTS_MIROSERVICE_HOST: string;
  PRODUCTS_MIROSERVICE_PORT: number;
  ORDERS_MIROSERVICE_HOST: string;
  ORDERS_MIROSERVICE_PORT: number;
  CATEGORIES_MS_HOST: string;
  CATEGORIES_MS_PORT: number;
  CLIENTS_MS_HOST: string;
  CLIENTS_MS_PORT: number;
}

const envsSchema = joi
  .object<EnVars>({
    PORT: joi.number().integer().min(1).max(65535).required(),
    PRODUCTS_MIROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MIROSERVICE_PORT: joi.number().required(),
    ORDERS_MIROSERVICE_HOST: joi.string().required(),
    ORDERS_MIROSERVICE_PORT: joi.number().required(),
    CATEGORIES_MS_HOST: joi.string().required(),
    CATEGORIES_MS_PORT: joi.number().required(),
    CLIENTS_MS_HOST: joi.string().required(),
    CLIENTS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const result = envsSchema.validate(process.env, { abortEarly: false });

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}
const envVars = result.value;

export const envs = {
  port: envVars.PORT,
  productsMicroserviceHost: envVars.PRODUCTS_MIROSERVICE_HOST,
  productsMicroservicePort: envVars.PRODUCTS_MIROSERVICE_PORT,
  ordersMicroserviceHost: envVars.ORDERS_MIROSERVICE_HOST,
  ordersMicroservicePort: envVars.ORDERS_MIROSERVICE_PORT,
  categoriesMicroserviceHost: envVars.CATEGORIES_MS_HOST,
  categoriesMicroservicePort: envVars.CATEGORIES_MS_PORT,
  clientsMicroserviceHost: envVars.CLIENTS_MS_HOST,
  clientsMicroservicePort: envVars.CLIENTS_MS_PORT,
} as const;
