import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import * as sessionRepositories from "../repositories/sessionRepositories.js"
import * as userRepositories from "../repositories/userRepositories.js"

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers
	const token = authorization?.replace('Bearer ', '').trim()

	if (!token) return res.status(422).send('Token not found.');
	const tokenUser = await sessionRepositories.findSessonToken(token);
	if(!tokenUser){
		return res.status(406).send('Token was not accepted.');
	}	

	const decode:string = jwt.verify(tokenUser.token, process.env.TOKENKEY);
	res.locals.userId = tokenUser.userId;
	res.locals.user = decode


	next()
}