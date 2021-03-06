import Repository from "../../DAL/Repository";
import CommandHandler from "../CommandHandler";
import Entity from "../../DAL/Entity";
import GetManyCommand from "../GetManyCommand";

export default class GetManyEntitiesHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetManyCommand): Promise<Entity[]> {
        return await this.repository.getMany(command.limit);
    }
}