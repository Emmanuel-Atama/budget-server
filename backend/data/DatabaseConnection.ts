import { Entity } from "../model/Entity";

export interface DatabaseConnection {
    create(entity: Entity): void;
    update(entity: Entity): void;
    delete(id: number): void;
    getOne(id: number): Promise<Entity | null>;
    getMany(limit?: number): Promise<Entity[]>;
}