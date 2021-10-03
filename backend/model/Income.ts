import Entity from "./Entity";
import Timestamped from "./Timestamped";

export default class Income implements Timestamped, Entity {
    private readonly _id: number;
    private readonly _source: string;
    private readonly _amount: number;
    private readonly _timestamp: Date;

    constructor(id: number, source: string, amount: number, timestamp: Date) {
        this._id = id;
        this._source = source;
        this._amount = amount;
        this._timestamp = timestamp;
    }

    get id(): number {
        return this._id;
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
            source: this._source,
            amount: this._amount,
            timestamp: this._timestamp
        };
    }
}