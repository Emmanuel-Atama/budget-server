import { PrismaClient } from "@prisma/client";
import { Expense } from "../model/Expense";
import { DatabaseConnection } from "./DatabaseConnection";
import { ExpenseHydrator } from "./hydration/ExpenseHydrator";

export class ExpenseConnection implements DatabaseConnection {
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

        if (raw) {
            return ExpenseHydrator.hydrate(raw);
        }

        return null;
    }

    async getMany(limit?: number): Promise<Expense[]> {
        const raw = await this.dbClient.expense.findMany({
            take: limit
        });

        return raw.map(data => ExpenseHydrator.hydrate(data));
    }
}