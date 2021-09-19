import { IdentityCommand } from "../IdentityCommand";

export class GetExpense implements IdentityCommand {
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