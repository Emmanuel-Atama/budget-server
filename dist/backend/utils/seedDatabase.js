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
const IncomeConnection_1 = require("../data/IncomeConnection");
const ExpenseConnection_1 = require("../data/ExpenseConnection");
const mockData_1 = require("../mockData");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dbClient_1.default.income.deleteMany({});
        yield dbClient_1.default.expense.deleteMany({});
        const incomeConnection = new IncomeConnection_1.IncomeConnection(dbClient_1.default);
        const expenseConnection = new ExpenseConnection_1.ExpenseConnection(dbClient_1.default);
        mockData_1.mockIncome.forEach((income) => __awaiter(this, void 0, void 0, function* () {
            yield incomeConnection.create(income);
        }));
        mockData_1.mockExpenses.forEach((expense) => __awaiter(this, void 0, void 0, function* () {
            yield expenseConnection.create(expense);
        }));
        const allIncome = yield incomeConnection.getMany();
        const allExpenses = yield expenseConnection.getMany();
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
