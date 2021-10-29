import { PrismaClient } from ".prisma/client";
import Entity from "../Entity";
import Query from "../Query";
import Repository from "../Repository";
import Token from "./Token";
import TokenHydrator from "./TokenHydrator";

export default class TokenRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(token: Token): Promise<void> {
        const foundToken = await this.dbClient.token.findFirst({
            where: {
                userId: token.userId
            }
        });

        // If a token exists, check if it's still valid
        // If it's still valid, throw an exception
        // If it's not valid, delete it and create a new one
        if (foundToken) {

            return;
        }

        // Otherwise just create a new token
        await this.dbClient.token.create({
            data: {
                ...TokenHydrator.dehydrate(token),
                id: undefined
            }
        });
    }

    update(entity: Entity): void {
        throw new Error("Method not implemented.");
    }

    delete(id: number): void {
        throw new Error("Method not implemented.");
    }

    getOne(id: number): Promise<Token | null> {
        throw new Error("Method not implemented.");
    }

    getOneByQuery(query: Query): Promise<Token | null> {
        throw new Error("Method not implemented.");
    }

    getMany(limit?: number): Promise<Token[]> {
        throw new Error("Method not implemented.");
    }
}