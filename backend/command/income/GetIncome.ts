import { IdentityCommand } from "../IdentityCommand";

export class GetIncome implements IdentityCommand {
    private readonly _id;

    constructor(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    getName(): string {
        return 'GetIncome';
    }
}