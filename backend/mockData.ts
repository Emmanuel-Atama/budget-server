import { Expense } from "./model/Expense";
import { Income } from "./model/Income";

const mockIncome: Income[] = [
    new Income(1, 'Nathan', 2560, 123456789),
    new Income(2, 'Cheryl', 230, 123456789)
];

const mockExpenses: Expense[] = [
    new Expense(1, 'Phone Bill', 'Nathan', 29.99, 123456789),
    new Expense(2, 'Internet', 'Family', 24.99, 123456789),
    new Expense(3, 'Rent', 'Family', 550, 123456789),
];

export {
    mockIncome,
    mockExpenses
};