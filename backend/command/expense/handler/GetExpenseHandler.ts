import { Repository } from "../../../data/Repository";
import { Expense } from "../../../model/Expense";
import { CommandHandler } from "../../CommandHandler";
import { GetExpense } from "../GetExpense";

export class GetExpenseHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetExpense): Promise<Expense | null> {
        return await this.repository.getOne(command.id) as Expense;
    }
}