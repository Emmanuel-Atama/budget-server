import { PrismaClient } from "@prisma/client";
import Entity from "../Entity";
import Query from "../Query";
import Repository from "../Repository";
import CategoryGroup from "./CategoryGroup";
import CategoryGroupHydrator from "./CategoryGroupHydrator";

export default class CategoryGroupRepository implements Repository {
    private dbClient: PrismaClient;

    constructor(dbClient: PrismaClient) {
        this.dbClient = dbClient;
    }

    async create(categoryGroup: CategoryGroup): Promise<CategoryGroup> {
        const raw = await this.dbClient.categoryGroup.create({
            data: {
                ...CategoryGroupHydrator.dehydrate(categoryGroup),
                id: undefined
            }
        });

        return CategoryGroupHydrator.hydrate(raw);
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