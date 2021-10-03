import Command from "../Command";

export default class GetUserByUsername implements Command {
    private readonly _username;

    constructor(username: string) {
        this._username = username;
    }

    get username(): string {
        return this._username;
    }

    getName(): string {
        return 'GetUserByUsername';
    }
}