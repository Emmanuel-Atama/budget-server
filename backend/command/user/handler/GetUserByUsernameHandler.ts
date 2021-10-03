import UserQuery from "../../../data/query/UserQuery";
import Repository from "../../../data/Repository";
import Entity from "../../../model/Entity";
import CommandHandler from "../../CommandHandler";
import IdentityCommand from "../../IdentityCommand";
import GetUserByUsername from "../GetUserByUsername";

export default class GetUserByUsernameHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetUserByUsername): Promise<Entity | null> {
        return await this.repository.getOneByQuery((new UserQuery).username = command.username);
    }
}