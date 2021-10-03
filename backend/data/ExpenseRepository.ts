import { PrismaClient } from "@prisma/client";
import Expense from "../model/Expense";
import Repository from "./Repository";
import ExpenseHydrator from "./hydration/ExpenseHydrator";
import Query from "./Query";

export default class ExpenseRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(expense: Expense): Promise<void> {
        await this.dbClient.expense.create({
            data: {
                ...ExpenseHydrator.dehydrate(expense),
                id: undefined,
                timestamp: undefined
            }
        });
    }

    async update(expense: Expense): Promise<void> {
        await this.dbClient.expense.update({
            where: { id: expense.id },
            data : {
                ...ExpenseHydrator.dehydrate(expense),
                id: undefined,
                timestamp: undefined
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.dbClient.expense.delete({
            where: { id }
        });
    }

    async getOne(id: number): Promise<Expense | null> {
        const raw = await this.dbClient.expense.findFirst({
            where: { id }
        });

        return raw ? ExpenseHydrator.hydrate(raw) : null;
    }

    async getMany(limit?: number): Promise<Expense[]> {
        const raw = await this.dbClient.expense.findMany({
            take: limit
        });

        return raw.map(data => ExpenseHydrator.hydrate(data));
    }

    async getOneByQuery(query: Query): Promise<Expense | null> {
        return null;
    }
}