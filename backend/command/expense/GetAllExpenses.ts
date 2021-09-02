import { Command } from "../Command";

export class GetAllExpenses implements Command {
    private readonly _limit;

    constructor(limit?: number) {
        this._limit = limit;
    }

    get limit(): number | undefined {
        return this._limit;
    }

    getName(): string {
        return 'GetAllExpenses';
    }
}