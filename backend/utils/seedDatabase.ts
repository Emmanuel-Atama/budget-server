import dbClient from './dbClient';
import { mockIncome, mockExpenses } from '../mockData';
import { Income } from '../model/Income';
import { Expense } from '../model/Expense';
import commandBus from './commandBus';
import { CreateExpense } from '../command/expense/CreateExpense';
import { CreateIncome } from '../command/income/CreateIncome';
import { GetAllIncome } from '../command/income/GetAllIncome';
import { GetAllExpenses } from '../command/expense/GetAllExpenses';

async function seed(): Promise<void> {
    await dbClient.income.deleteMany({});
    await dbClient.expense.deleteMany({});

    mockIncome.forEach(async (income: Income) => {
        await commandBus.dispatch(new CreateIncome(income));
    });

    mockExpenses.forEach(async (expense: Expense) => {
        await commandBus.dispatch(new CreateExpense(expense));
    });

    const allIncome = await commandBus.dispatch(new GetAllIncome);
    const allExpenses = await commandBus.dispatch(new GetAllExpenses);

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