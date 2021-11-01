import Account from "../../DAL/account/Account";
import Entity from "../../DAL/Entity";
import EntityCommand from "../EntityCommand";

export default class CreateAccount implements EntityCommand {
    private readonly _account: Account;

    constructor(account: Account) {
        this._account = account;
    }

    get entity(): Account {
        return this._account;
    }

    getName(): string {
        return 'CreateAccount';
    }
}