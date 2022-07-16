import {prisma}  from "../config/db.js"
import { CreateSessonData } from "../services/userService.js";

async function createSession(data: CreateSessonData) {
    await prisma.session.create({
        data:data
    })
}
async function findSessonByUserId(id: number) {
    return await prisma.session.findFirst({
        where: {
            userId:{
                equals:id
            }
        },
    });
}

export {
    createSession,
    findSessonByUserId
};