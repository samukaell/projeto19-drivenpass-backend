import Cryptr from "cryptr";
import {Credentials, Site} from "@prisma/client";
import * as credentialRepositories from "../repositories/credentialRepositories.js"
import { CreateUserData } from "./userService.js";

export type CreateCredentialsData = Omit<Credentials, "id">
export type CreateSiteData = Omit<Site, "id">
//Constante de criptografia
const cryptr = new Cryptr(process.env.KEY);

//Principais
export async function create(credentials: CreateCredentialsData,title:string,userId:number) {
    //verificar se ja existe o site
    const site = await findSite(title);
    //Se ja existe este site, basta acidionar a credential nele
    if(site){
        return await addCredential({
            url:credentials.url,
            name:credentials.name,
            password: cryptr.encrypt(credentials.password),
            siteId:site.id
        }, userId);
    }
    //Se não cadastrar o Site tb
    const newSite = await createSite({
        title,
        userId: userId//Usuario logado
    });
    return await addCredential({
        url:credentials.url,
        name:credentials.name,
        password: cryptr.encrypt(credentials.password),
        siteId:newSite.id
    },userId)
}
export async function find(id: number, userId:number) {
    //Buscar o site
    const site = await findSiteId(id);
    console.log("Site",site);
    console.log("userId",userId)
    if(!site || userId !== site.userId){
        return {message:"No access to this credential"}
    }
    return await findCredentialsAll(id);
    
}   

//Auxiliares
export async function addCredential(credential: CreateCredentialsData,userId: number) {
    //verificar se a credential ja existe
    /*
    const credentialExist = await credentialRepositories.findCredentialsByName(credential.name);
    if(credentialExist){
        throw { type: "conflict", message: "site credential already registered" };
    }*/
    //Se não existir basta criar
    await credentialRepositories.addCredentialSite(credential);
}
export async function findSite(title: string) {
    return await credentialRepositories.findSiteByTitle(title);
}
export async function createSite(site: CreateSiteData){
    return await credentialRepositories.createSite(site)
}
//___________
export async function findSiteId(id: number) {
    return await credentialRepositories.findSiteById(id);
}

export async function findCredentialsAll(id:number) {
    return credentialRepositories.findCredentialsAllBySiteId(id);
}
