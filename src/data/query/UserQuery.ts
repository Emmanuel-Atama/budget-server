import Query from "../Query";

export default class UserQuery implements Query {
    private _username: string | null = null;

    set username(username: string | null) {
        this._username = username;
    }

    get username(): string | null {
        return this._username;
    }
}