import Entity from "./Entity";
import Query from "./Query";

export default interface Repository {
    create(entity: Entity): Promise<Entity>;
    update(entity: Entity): void;
    delete(id: number): void;
    getOne(id: number): Promise<Entity | null>;
    getOneByQuery(query: Query): Promise<Entity | null>;
    getManyByQuery(query: Query): Promise<Entity[]>;
    getMany(limit?: number): Promise<Entity[]>;
}