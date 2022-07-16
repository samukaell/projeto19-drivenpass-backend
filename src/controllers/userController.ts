import { Request, Response } from "express";
import * as userService from "../services/userService.js"
import * as userRepositories from "../repositories/userRepositories.js"
export async function singUp(req: Request, res: Response) {
    const user:userService.CreateUserData = req.body;
    await userService.signUp(user);
    res.sendStatus(200);
}
  
export async function singIn(req: Request, res: Response) {
    const login:userService.CreateUserData = req.body
    const token = await userService.signIn(login);
    res.status(200).send(token);
}
//FIXME -> remover
export async function teste(req: Request, res: Response) {
    const email = req.body;
    const retorno = await userRepositories.findUserByEmail(email.email);
    res.status(200).send(retorno)
}