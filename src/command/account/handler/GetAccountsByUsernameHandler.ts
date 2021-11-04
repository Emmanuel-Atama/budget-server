import Account from "../../../DAL/account/Account";
import AccountQuery from "../../../DAL/account/AccountQuery";
import Repository from "../../../DAL/Repository";
import Command from "../../Command";
import CommandHandler from "../../CommandHandler";
import GetAccountsByUserId from "../GetAccountsByUsername";

export default class GetAccountsByUsernameHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetAccountsByUserId): Promise<Account[] | null> {
        const query = new AccountQuery();
        query.budgetId = command.userId;
        return await this.repository.getManyByQuery(query) as Account[];
    }
}