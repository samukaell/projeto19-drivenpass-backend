import { Request, Response } from "express";
import * as credentialService from "../services/credentialsService.js"

export async function  createCredentials(req: Request, res: Response) {
    const credentials:credentialService.CreateCredentialsData = req.body;
    const { title } = req.params;
    const userId = res.locals.userId;
    //Title -> Site
    //UserId -> usuario que esta salvando, pegando esta informação pelo token
    //Credentials-> o conteudo
    await credentialService.create(credentials,title,userId);
    res.sendStatus(200);
}

export async function findCredentials(req: Request, res: Response) {
    const {id} = req.body;//id do site
    const userId = res.locals.userId;
    const credentials = await credentialService.find(id,userId);

    res.status(200).send(credentials);
}