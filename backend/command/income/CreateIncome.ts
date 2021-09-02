import { Income } from "../../model/Income";
import { Command } from "../Command";

export class CreateIncome implements Command {
    private readonly _income: Income;

    constructor(income: Income) {
        this._income = income;
    }

    get income(): Income {
        return this._income;
    }

    getName(): string {
        return 'CreateIncome';
    }
}