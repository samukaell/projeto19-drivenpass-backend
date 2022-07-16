import { Request, Response, NextFunction } from "express";

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers
	const token = authorization?.replace('Bearer ', '').trim()

	if (!token) return res.status(422).send('Token not found.');

	next()
}