import Repository from "../../DAL/Repository";
import CommandHandler from "../CommandHandler";
import EntityCommand from "../EntityCommand";

export default class CreateEntityHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: EntityCommand): Promise<void> {
        try {
            await this.repository.create(command.entity);
        } catch (e) {
            Promise.reject(e)
        }
    }
}