import { Repository } from "../../../data/Repository";
import { CommandHandler } from "../../CommandHandler";
import { CreateIncome } from "../CreateIncome";

export class CreateIncomeHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: CreateIncome): Promise<void> {
        this.repository.create(command.income);
    }
}