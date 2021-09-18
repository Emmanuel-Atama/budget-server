import { PrismaClient } from "@prisma/client";
import { User } from "../model/User";
import { Repository } from "./Repository";
import { UserHydrator } from "./hydration/UserHydrator";

export class UserRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(user: User): Promise<void> {
        await this.dbClient.user.create({
            data: {
                ...UserHydrator.dehydrate(user),
                id: undefined,
                timestamp: undefined
            }
        });
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
}