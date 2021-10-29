import Entity from "../Entity";

export default class Token implements Entity {
    private readonly _id: number;
    private readonly _token: string;
    private readonly _userId: number;

    constructor(id: number, token: string, userId: number) {
        this._id = id;
        this._token = token;
        this._userId = userId;
    }

    get id(): number {
        return this._id;
    }

    get token(): string {
        return this._token;
    }

    get userId(): number {
        return this._userId;
    }

    toJSON() {
        return {
            id: this.id,
            token: this.token,
            userId: this.userId
        };
    }
}