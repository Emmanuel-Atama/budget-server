import Entity from "../Entity";

export default class Budget implements Entity {
    private readonly _id: number;
    private readonly _userId: number;

    constructor(id: number, userId: number) {
        this._id = id;
        this._userId = userId;
    }

    get id(): number {
        return this._id;
    }

    get userId(): number {
        return this._userId;
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId
        };
    }
}