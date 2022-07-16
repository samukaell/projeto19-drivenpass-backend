import {prisma}  from "../config/db.js"
import { CreateCredentialsData,CreateSiteData } from "../services/credentialsService.js";

async function createSite(data: CreateSiteData) {
    return await prisma.site.create({
        data:data
    })
}

async function addCredentialSite(data: CreateCredentialsData) {
    await prisma.credentials.create({
        data:data
    })
}

async function findSiteByTitle(title: string) {
    return await prisma.site.findFirst({
        where: {
            title:{
                equals:title
            }
        },
    });
}

async function findCredentialsByName(name: string) {
    return await prisma.credentials.findFirst({
        where: {
            name:{
                equals:name
            }
        },
    });
}

export {
    createSite,
    addCredentialSite,
    findSiteByTitle,
    findCredentialsByName
};