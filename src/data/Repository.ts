import Entity from "../model/Entity";
import Query from "./Query";

export default interface Repository {
    create(entity: Entity): void;
    update(entity: Entity): void;
    delete(id: number): void;
    getOne(id: number): Promise<Entity | null>;
    getOneByQuery(query: Query): Promise<Entity | null>;
    getMany(limit?: number): Promise<Entity[]>;
}