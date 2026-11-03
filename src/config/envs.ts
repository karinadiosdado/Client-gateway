// @prefix micro-envs
// @description 
/* eslint-disable */


import 'dotenv/config';
import joi from 'joi';


interface EnVars {
    PORT: number;
    PRODUCTS_MIROSERVICE_HOST: string;
    PRODUCTS_MIROSERVICE_PORT: number;
     ORDERS_MIROSERVICE_HOST: string;
    ORDERS_MIROSERVICE_PORT: number;

}
// validador de esquema
const envsSchema = joi.object<EnVars>({
    PORT: joi.number().integer().min(1).max(65535).required(), 
    PRODUCTS_MIROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MIROSERVICE_PORT: joi.number().required(),
    ORDERS_MIROSERVICE_HOST: joi.string().required(),
    ORDERS_MIROSERVICE_PORT: joi.number().required(),
})
    .unknown(true);


const result = envsSchema.validate(process.env, { abortEarly: false });// reporta errores que pueda tener 

// validar si llega un error 
if (result.error) {
    throw new Error(`Config validation error: ${result.error.message}`);
}
const envVars = result.value;


// variable de entorno puerto
export const envs = {
    port: envVars.PORT,
    productsMicroserviceHost: envVars.PRODUCTS_MIROSERVICE_HOST,
    productsMicroservicePort: envVars.PRODUCTS_MIROSERVICE_PORT,
    ordersMicroserviceHost: envVars.ORDERS_MIROSERVICE_HOST,
    ordersMicroservicePort: envVars.ORDERS_MIROSERVICE_PORT,



} as const;// solo lectura 