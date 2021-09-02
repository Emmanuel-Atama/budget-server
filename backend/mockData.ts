import { Expense } from "./model/Expense";
import { Income } from "./model/Income";

const mockIncome: Income[] = [
    new Income(1, 'Nathan', 2560, new Date()),
    new Income(2, 'Cheryl', 230, new Date())
];

const mockExpenses: Expense[] = [
    new Expense(1, 'Phone Bill', 'Nathan', 29.99, new Date()),
    new Expense(2, 'Internet', 'Family', 24.99, new Date()),
    new Expense(3, 'Rent', 'Family', 550, new Date()),
];

export {
    mockIncome,
    mockExpenses
};