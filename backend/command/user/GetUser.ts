import { Command } from "../Command";

export class GetUser implements Command {
    private readonly _id;

    constructor(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    getName(): string {
        return 'GetUser';
    }
}