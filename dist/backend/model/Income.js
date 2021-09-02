"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Income = void 0;
class Income {
    constructor(id, source, amount, timestamp) {
        this._id = id;
        this._source = source;
        this._amount = amount;
        this._timestamp = timestamp;
    }
    get id() {
        return this._id;
    }
    get source() {
        return this._source;
    }
    get amount() {
        return this._amount;
    }
    get timestamp() {
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
exports.Income = Income;
