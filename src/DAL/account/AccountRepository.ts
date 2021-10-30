import Entity from "../Entity";
import Query from "../Query";
import Repository from "../Repository";
import { PrismaClient } from "@prisma/client";
import Account from "./Account";
import AccountHydrator from "./AccountHydrator";
import AccountQuery from "./AccountQuery";

export default class AccountRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(account: Account): Promise<void> {
        await this.dbClient.account.create({
            data: {
                ...AccountHydrator.dehydrate(account),
                id: undefined
            }
        });
    }

    async getManyByQuery(query: AccountQuery): Promise<Account[]> {
        if (query.userId) {
            const raw = await this.dbClient.account.findMany({
                where: {
                    userId: query.userId
                }
            });

            const hydrated = raw.map(rawAccount => AccountHydrator.hydrate(rawAccount));

            return hydrated;
        }

        return [];
    }

    async getOneByQuery(query: AccountQuery): Promise<Account | null> {
        // if (query.userId) {
        //     const raw = await this.dbClient.account.findMany({
        //         where: {
        //             userId: query.userId
        //         }
        //     });

        //     const hydrated = raw.map(rawAccount => AccountHydrator.hydrate(rawAccount));

        //     return hydrated;
        // }

        // return null;
        throw 'Not implemented';
    }

    update(entity: Entity): void {
        throw new Error("Method not implemented.");
    }
    delete(id: number): void {
        throw new Error("Method not implemented.");
    }
    getOne(id: number): Promise<Entity | null> {
        throw new Error("Method not implemented.");
    }
    getMany(limit?: number): Promise<Entity[]> {
        throw new Error("Method not implemented.");
    }

}