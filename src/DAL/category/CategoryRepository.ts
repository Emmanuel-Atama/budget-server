import { PrismaClient } from "@prisma/client";
import Entity from "../Entity";
import Query from "../Query";
import Repository from "../Repository";
import Category from "./Category";
import CategoryHydrator from "./CategoryHydrator";

export default class CategoryRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(category: Category): Promise<Category> {
        const raw = await this.dbClient.category.create({
            data: {
                ...CategoryHydrator.dehydrate(category),
                id: undefined
            }
        });

        return CategoryHydrator.hydrate(raw);
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