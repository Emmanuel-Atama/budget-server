"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseConnection = void 0;
const ExpenseHydrator_1 = require("./hydration/ExpenseHydrator");
class ExpenseConnection {
    constructor(dbClient) {
        this.dbClient = dbClient;
    }
    create(expense) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbClient.expense.create({
                data: Object.assign(Object.assign({}, ExpenseHydrator_1.ExpenseHydrator.dehydrate(expense)), { id: undefined, timestamp: undefined })
            });
        });
    }
    update(expense) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbClient.expense.update({
                where: { id: expense.id },
                data: Object.assign(Object.assign({}, ExpenseHydrator_1.ExpenseHydrator.dehydrate(expense)), { id: undefined, timestamp: undefined })
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbClient.expense.delete({
                where: { id }
            });
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield this.dbClient.expense.findFirst({
                where: { id }
            });
            if (raw) {
                return ExpenseHydrator_1.ExpenseHydrator.hydrate(raw);
            }
            return null;
        });
    }
    getMany(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield this.dbClient.expense.findMany({
                take: limit
            });
            return raw.map(data => ExpenseHydrator_1.ExpenseHydrator.hydrate(data));
        });
    }
}
exports.ExpenseConnection = ExpenseConnection;
