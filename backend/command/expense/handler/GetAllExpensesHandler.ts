import { Repository } from "../../../data/Repository";
import { Expense } from "../../../model/Expense";
import { CommandHandler } from "../../CommandHandler";
import { GetAllExpenses } from "../GetAllExpenses";

export class GetAllExpensesHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetAllExpenses): Promise<Expense[]> {
        return await this.repository.getMany(command.limit) as Expense[];
    }
}