import { Router } from "express";
import {createCredentials,findCredentials} from "../controllers/credentialsController.js"
import validateSchema from "../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidator.js";
import credentialsSchema from "../schemas/credentialsSchema.js";

const credentialRouter = Router();

credentialRouter.post('/credential/:title',validateSchema(credentialsSchema),tokenValidator, createCredentials);
credentialRouter.post('/credentialfind',tokenValidator, findCredentials);


export default credentialRouter;