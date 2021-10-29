import Entity from "../Entity";

export default class CategoryGroup implements Entity {
    private readonly _id: number;
    private readonly _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name
        };
    }
}