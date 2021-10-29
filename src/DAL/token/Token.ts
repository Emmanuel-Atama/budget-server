import Entity from "../Entity";

export default class Token implements Entity {
    private readonly _id: number;
    private readonly _jwt: string;
    private readonly _userId: number;

    constructor(id: number, jwt: string, userId: number) {
        this._id = id;
        this._jwt = jwt;
        this._userId = userId;
    }

    get id(): number {
        return this._id;
    }

    get jwt(): string {
        return this._jwt;
    }

    get userId(): number {
        return this._userId;
    }

    toJSON() {
        return {
            id: this.id,
            jwt: this.jwt,
            userId: this.userId
        };
    }
}