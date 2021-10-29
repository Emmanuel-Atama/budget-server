import Entity from "../Entity";

export default class Budget implements Entity {
    private readonly _id: number;

    constructor(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    toJSON() {
        return {
            id: this._id
        };
    }
}