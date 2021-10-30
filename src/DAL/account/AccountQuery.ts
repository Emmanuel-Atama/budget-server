import Query from "../Query";

export default class AccountQuery implements Query {
    private _userId: number | null = null;

    set userId(userId: number | null) {
        this._userId = userId;
    }

    get userId(): number | null {
        return this._userId;
    }
}