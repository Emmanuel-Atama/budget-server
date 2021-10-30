import Entity from "../Entity";

export default class Account implements Entity {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _userId: number;

    constructor(id: number, name: string, userId: number) {
        this._id = id;
        this._name = name;
        this._userId = userId;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get userId(): number {
        return this._userId;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            userId: this.userId
        };
    }
}