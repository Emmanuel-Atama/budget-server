import Repository from "../../data/Repository";
import CommandHandler from "../CommandHandler";
import EntityCommand from "../EntityCommand";

export default class CreateEntityHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: EntityCommand): Promise<void> {
        this.repository.create(command.entity);
    }
}