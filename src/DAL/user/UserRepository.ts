import { PrismaClient } from "@prisma/client";
import User from "./User";
import Repository from "../Repository";
import UserHydrator from "./UserHydrator";
import DuplicateEntityError from "../DuplicateEntityError";
import bcrypt from 'bcrypt';
import UserQuery from "./UserQuery";
import Entity from "../Entity";
import Query from "../Query";

export default class UserRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(user: User): Promise<User> {
        const foundUser = await this.dbClient.user.findFirst({
            where: {
                username: user.username
            }
        });

        if (foundUser) {
            return Promise.reject(`User with username '${user.username}' already exists!`);
        }

        const hash = await bcrypt.hash(user.password, 10);
        const rawUser = await this.dbClient.user.create({
            data: {
                ...UserHydrator.dehydrate(user),
                password: hash,
                id: undefined,
                timestamp: undefined
            }
        });
        
        return UserHydrator.hydrate(rawUser);
    }

    async update(user: User): Promise<void> {
        await this.dbClient.user.update({
            where: { id: user.id },
            data : {
                ...UserHydrator.dehydrate(user),
                id: undefined,
                timestamp: undefined
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.dbClient.user.delete({
            where: { id }
        });
    }

    async getOne(id: number): Promise<User | null> {
        const raw = await this.dbClient.user.findFirst({
            where: { id }
        });

        return raw ? UserHydrator.hydrate(raw) : null;
    }

    async getMany(limit?: number): Promise<User[]> {
        const raw = await this.dbClient.user.findMany({
            take: limit
        });

        return raw.map(data => UserHydrator.hydrate(data));
    }

    async getOneByQuery(query: UserQuery): Promise<User | null> {
        if (query.username) {
            const raw = await this.dbClient.user.findFirst({
                where: { username: query.username }
            });

            return raw ? UserHydrator.hydrate(raw) : null;
        }

        return null;
    }

    getManyByQuery(query: Query): Promise<Entity[]> {
        throw new Error("Method not implemented.");
    }
}