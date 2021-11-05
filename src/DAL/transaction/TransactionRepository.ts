import { PrismaClient } from ".prisma/client";
import Entity from "../Entity";
import Query from "../Query";
import Repository from "../Repository";
import Transaction from "./Transaction";
import TransactionHydrator from "./TransactionHydrator";

export default class TransactionRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(transaction: Transaction): Promise<Transaction> {
        const raw = await this.dbClient.transaction.create({
            data: {
                ...TransactionHydrator.dehydrate(transaction),
                id: undefined
            }
        });

        return TransactionHydrator.hydrate(raw);
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
    getOneByQuery(query: Query): Promise<Entity | null> {
        throw new Error("Method not implemented.");
    }
    getManyByQuery(query: Query): Promise<Entity[]> {
        throw new Error("Method not implemented.");
    }
    getMany(limit?: number): Promise<Entity[]> {
        throw new Error("Method not implemented.");
    }

}