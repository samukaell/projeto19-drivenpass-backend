import { Router } from "express";
import {createCredentials,findCredentials} from "../controllers/credentialsController.js"
import validateSchema from "../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import credentialsSchema from "../schemas/credentialsSchema.js";
import idCredentialsSchema from "../schemas/idCredentialsSchema.js";

const credentialRouter = Router();

credentialRouter.post('/credential/:title',validateSchema(credentialsSchema),tokenValidator, createCredentials);
credentialRouter.post('/credentialfind',validateSchema(idCredentialsSchema) ,tokenValidator, findCredentials);


export default credentialRouter;