import Entity from "../../DAL/Entity";
import Repository from "../../DAL/Repository";
import CommandHandler from "../CommandHandler";
import EntityCommand from "../EntityCommand";

export default class CreateEntityHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: EntityCommand): Promise<Entity> {
        try {
            return await this.repository.create(command.entity);
        } catch (e) {
            throw 'Something went wrong during create.';
        }
    }
}