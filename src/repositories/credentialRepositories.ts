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
async function findSiteById(id: number) {
    return await prisma.site.findFirst({
        where: {
            id:{
                equals:id
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

async function findCredentialsAllBySiteId(id: number) {
    return await prisma.site.findFirst({
        where: {
            id:{
                equals:id
            }
        },
        include:{Credentials:true}
    });
}

export {
    createSite,
    addCredentialSite,
    findSiteByTitle,
    findSiteById,
    findCredentialsByName,
    findCredentialsAllBySiteId
};