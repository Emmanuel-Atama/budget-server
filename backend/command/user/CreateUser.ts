import { User } from "../../model/User";
import { Command } from "../Command";

export class CreateUser implements Command {
    private readonly _user: User;

    constructor(user: User) {
        this._user = user;
    }

    get user(): User {
        return this._user;
    }

    getName(): string {
        return 'CreateUser';
    }
}