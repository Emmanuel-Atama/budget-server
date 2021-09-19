import { Income } from "../../model/Income";
import { EntityCommand } from "../EntityCommand";

export class CreateIncome implements EntityCommand {
    private readonly _income: Income;

    constructor(income: Income) {
        this._income = income;
    }

    get entity(): Income {
        return this._income;
    }

    getName(): string {
        return 'CreateIncome';
    }
}