import { Request, Response } from "express";
import * as userService from "../services/userService.js"

export async function post(req: Request, res: Response) {
    const user = req.body;
    //Verificar se o login ja esta cadastrado
    await userService.findUser(user.email);
    //Cadastrar o usuario
    await userService.createUser(user);
    res.sendStatus(200);
  }
  