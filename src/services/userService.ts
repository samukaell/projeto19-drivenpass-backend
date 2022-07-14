import * as userRepositories from "../repositories/userRepositories.js"
import { User } from "@prisma/client";

//Type da interface User, que vem do Prisma
export type CreateUserData = Omit<User, "id">;


export async function findUser(email: string) {
    const user = await userRepositories.findUserByEmail(email);
    if (user){
        throw { type: "conflict", message: "user already registered" };
    }
}

export async function createUser(user: CreateUserData){
    await userRepositories.createUser(user);
}