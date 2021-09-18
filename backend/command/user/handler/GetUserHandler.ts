import { Repository } from "../../../data/Repository";
import { User } from "../../../model/User";
import { CommandHandler } from "../../CommandHandler";
import { GetUser } from "../GetUser";

export class GetUserHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetUser): Promise<User | null> {
        return await this.repository.getOne(command.id) as User;
    }
}