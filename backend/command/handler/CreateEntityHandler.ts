import { Repository } from "../../data/Repository";
import { CommandHandler } from "../CommandHandler";
import { CreateEntityCommand } from "../CreateEntityCommand";

export class CreateEntityHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: CreateEntityCommand): Promise<void> {
        this.repository.create(command.entity);
    }
}