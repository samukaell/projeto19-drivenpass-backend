import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import * as userRepositories from "../repositories/userRepositories.js"
import * as sessonRepositories from "../repositories/sessionRepositories.js"
import { Session, User } from "@prisma/client";

//Type da interface User, que vem do Prisma
export type CreateUserData = Omit<User, "id">;
export type CreateSessonData = Omit<Session, "id">
//Serviços principais
export async function signUp(user: CreateUserData) {
    //verificar se o email ja foi cadastrado
    const emailUser = await findUser(user.email);
    if(emailUser){
        throw { type: "conflict", message: "user already registered" };
    }
    //Cadastrar
    return await createUser(user);
}
export async function signIn(user:CreateUserData) {
    //Buscar o email
    const login = await findUser(user.email);
    if(!login){
        throw { type: "not found", message: "never registered user" };
    }
    //Comparar as senhas
    if (user && bcrypt.compareSync(user.password, login.password)) {
        //verificar se ja existe uma sesson com o user
        const session = await findSession(login.id);
        if(session){
            throw { type: "conflict", message: "user is already in session" };
        }
        //gerando o token
        const token = jwt.sign({user:user},process.env.TOKENKEY);
        //cadastrando na sesson
        await createSession({
            userId:login.id,
            token:token
        })
        //Logando
        return token;
    } else {
        throw { type: "conflict", message: "incompatible password" };
    }

}

//Serviços auxiliares
export async function findUser(email: string) {
    return await userRepositories.findUserByEmail(email);
}

export async function findSession(id:number) {
    return await sessonRepositories.findSessonByUserId(id);
}

export async function createUser(user: CreateUserData){
    const SALT = 10;
	const passwordHash = bcrypt.hashSync(user.password, SALT);
    //Senha crip...
    await userRepositories.createUser({
        email:user.email,
        password: passwordHash
    });

    return "Registered user"
}

export async function createSession(session: CreateSessonData) {
    await sessonRepositories.createSession(session);
}