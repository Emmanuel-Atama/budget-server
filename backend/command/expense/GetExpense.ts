import { Command } from "../Command";

export class GetExpense implements Command {
    private readonly _id: number;

    constructor(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    getName(): string {
        return 'GetExpense';
    }
}