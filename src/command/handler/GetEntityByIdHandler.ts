import Repository from "../../data/Repository";
import Entity from "../../model/Entity";
import CommandHandler from "../CommandHandler";
import IdentityCommand from "../IdentityCommand";

export default class GetEntityByIdHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: IdentityCommand): Promise<Entity | null> {
        return await this.repository.getOne(command.id);
    }
}