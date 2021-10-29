import UserQuery from "../../../DAL/user/UserQuery";
import Repository from "../../../DAL/Repository";
import Entity from "../../../DAL/Entity";
import CommandHandler from "../../CommandHandler";
import GetUserByUsername from "../GetUserByUsername";

export default class GetUserByUsernameHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetUserByUsername): Promise<Entity | null> {
        const query = new UserQuery();
        query.username = command.username;
        return await this.repository.getOneByQuery(query);
    }
}