import joi from 'joi';
import { CreateCredentialsData } from '../services/credentialsService';

const credenciaisSchema = joi.object<CreateCredentialsData>({
  url: joi
		.string()
		.pattern(/^[a-zA-Z0-9-_]+[:./\\]+([a-zA-Z0-9 -_./:=&"'?%+@#$!])+$/)
		.required(),
  name: joi.string().required(),
  password: joi.string().min(10).required(),
});

export default credenciaisSchema;