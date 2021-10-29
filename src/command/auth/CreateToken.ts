import User from "../../DAL/user/User";
import Command from "../Command";

export default class CreateToken implements Command {
    private readonly _user: User;

    constructor(user: User) {
        this._user = user;
    }

    get user(): User {
        return this._user;
    }

    getName(): string {
        return 'CreateToken';
    }
}