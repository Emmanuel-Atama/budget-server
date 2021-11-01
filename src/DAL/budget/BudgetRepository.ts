import { PrismaClient } from "@prisma/client";
import Entity from "../Entity";
import Query from "../Query";
import Repository from "../Repository";
import Budget from "./Budget";
import BudgetHydrator from "./BudgetHydrator";

export default class BudgetRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(budget: Budget): Promise<void> {
        await this.dbClient.budget.create({
            data: BudgetHydrator.dehydrate(budget)
        });
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