import { User } from "../../model/User";
import { CreateEntityCommand } from "../CreateEntityCommand";

export class CreateUser implements CreateEntityCommand {
    private readonly _user: User;

    constructor(user: User) {
        this._user = user;
    }

    get entity(): User {
        return this._user;
    }

    getName(): string {
        return 'CreateUser';
    }
}