import Cryptr from "cryptr";
import {Credentials, Site} from "@prisma/client";
import * as credentialRepositories from "../repositories/credentialRepositories.js"

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
        });
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
    })
}
export async function find(id: number) {
    
}
//Auxiliares
export async function addCredential(credential: CreateCredentialsData) {
    //verificar se a credential ja existe
    const credentialExist = await credentialRepositories.findCredentialsByName(credential.name);
    if(credentialExist){
        throw { type: "conflict", message: "site credential already registered" };
    }
    //Se não existir basta criar
    await credentialRepositories.addCredentialSite(credential);
}
export async function findSite(title: string) {
    return await credentialRepositories.findSiteByTitle(title);
}
export async function createSite(site: CreateSiteData){
    return await credentialRepositories.createSite(site)
}