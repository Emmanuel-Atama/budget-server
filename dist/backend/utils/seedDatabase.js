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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbClient_1 = __importDefault(require("./dbClient"));
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dbClient_1.default.income.create({
            data: {
                source: 'Nathan',
                amount: 2048.00
            }
        });
        yield dbClient_1.default.expense.create({
            data: {
                name: 'Phone',
                source: 'Nathan',
                amount: 29.99
            }
        });
        const allIncome = yield dbClient_1.default.income.findMany();
        const allExpenses = yield dbClient_1.default.expense.findMany();
        console.log("Income:", allIncome);
        console.log("Expense:", allExpenses);
    });
}
seed()
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    yield dbClient_1.default.$disconnect();
    throw e;
}))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbClient_1.default.$disconnect();
}));
