import { Repository } from "../../../data/Repository";
import { CommandHandler } from "../../CommandHandler";
import { CreateExpense } from "../CreateExpense";

export class CreateExpenseHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: CreateExpense): Promise<void> {
        await this.repository.create(command.expense);
    }
}