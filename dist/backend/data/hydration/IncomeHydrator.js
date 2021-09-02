"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeHydrator = void 0;
const Income_1 = require("../../model/Income");
class IncomeHydrator {
    static hydrate(raw) {
        const { id, source, amount, timestamp } = raw;
        return new Income_1.Income(id, source, amount, timestamp);
    }
    static dehydrate(income) {
        return income.toJSON();
    }
}
exports.IncomeHydrator = IncomeHydrator;
