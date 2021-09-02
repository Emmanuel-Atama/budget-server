"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
class Expense {
    constructor(id, name, source, amount, timestamp) {
        this._id = id;
        this._name = name;
        this._source = source;
        this._amount = amount;
        this._timestamp = timestamp;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
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
            name: this._name,
            source: this._source,
            amount: this._amount,
            timestamp: this._timestamp
        };
    }
}
exports.Expense = Expense;
