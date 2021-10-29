import User from "../../DAL/user/User";
import EntityCommand from "../EntityCommand";

export default class CreateUser implements EntityCommand {
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