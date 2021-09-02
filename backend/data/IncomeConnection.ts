import { PrismaClient } from "@prisma/client";
import { Income } from "../model/Income";
import { DatabaseConnection } from "./DatabaseConnection";
import { IncomeHydrator } from "./hydration/IncomeHydrator";

export class IncomeConnection implements DatabaseConnection {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(income: Income): Promise<void> {
        await this.dbClient.income.create({
            data: {
                ...IncomeHydrator.dehydrate(income),
                id: undefined,
                timestamp: undefined
            }
        });
    }

    async update(income: Income): Promise<void> {
        await this.dbClient.income.update({
            where: { id: income.id },
            data : {
                ...IncomeHydrator.dehydrate(income),
                id: undefined,
                timestamp: undefined
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.dbClient.income.delete({
            where: { id }
        });
    }

    async getOne(id: number): Promise<Income | null> {
        const raw = await this.dbClient.income.findFirst({
            where: { id }
        });

        if (raw) {
            return IncomeHydrator.hydrate(raw);
        }

        return null;
    }

    async getMany(limit?: number): Promise<Income[]> {
        const raw = await this.dbClient.income.findMany({
            take: limit
        });

        return raw.map(data => IncomeHydrator.hydrate(data));
    }
}