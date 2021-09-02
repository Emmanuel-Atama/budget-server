import { Entity } from "./Entity";
import { Timestamped } from "./Timestamped";

export class Expense implements Timestamped, Entity {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _source: string;
    private readonly _amount: number;
    private readonly _timestamp: Date;

    constructor(id: number, name: string, source: string, amount: number, timestamp: Date) {
        this._id = id;
        this._name = name;
        this._source = source;
        this._amount = amount;
        this._timestamp = timestamp;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get source(): string {
        return this._source;
    }

    get amount(): number {
        return this._amount;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            source: this._source,
            amount: this._amount,
            timestamp: this._timestamp
        };
    }
}