import dbClient from './dbClient';
import { IncomeConnection } from '../data/IncomeConnection';
import { ExpenseConnection } from '../data/ExpenseConnection';
import { mockIncome, mockExpenses } from '../mockData';
import { Income } from '../model/Income';
import { Expense } from '../model/Expense';

async function seed(): Promise<void> {
    await dbClient.income.deleteMany({});
    await dbClient.expense.deleteMany({});

    const incomeConnection: IncomeConnection = new IncomeConnection(dbClient);
    const expenseConnection: ExpenseConnection = new ExpenseConnection(dbClient);

    mockIncome.forEach(async (income: Income) => {
        await incomeConnection.create(income);
    });

    mockExpenses.forEach(async (expense: Expense) => {
        await expenseConnection.create(expense);
    });

    const allIncome = await incomeConnection.getMany();
    const allExpenses = await expenseConnection.getMany();

    console.log("Income:", allIncome);
    console.log("Expense:", allExpenses);
}

seed()
    .catch(async e => {
        await dbClient.$disconnect();
        throw e;
    })
    .finally(async () => {
        await dbClient.$disconnect();
    })