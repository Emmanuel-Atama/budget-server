import { Repository } from "../../../data/Repository";
import { CommandHandler } from "../../CommandHandler";
import { CreateUser } from "../CreateUser";

export class CreateUserHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: CreateUser): Promise<void> {
        this.repository.create(command.user);
    }
}