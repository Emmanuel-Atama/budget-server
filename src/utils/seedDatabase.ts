import dbClient from './dbClient';
import commandBus from './commandBus';

async function seed() {
    // await dbClient.income.deleteMany({});
    // await dbClient.expense.deleteMany({});

    // mockIncome.forEach(async (income: Income) => {
    //     await commandBus.dispatch(new CreateIncome(income));
    // });

    // mockExpenses.forEach(async (expense: Expense) => {
    //     await commandBus.dispatch(new CreateExpense(expense));
    // });

    // const allIncome = await commandBus.dispatch(new GetAllIncome);
    // const allExpenses = await commandBus.dispatch(new GetAllExpenses);

    // console.log("Income:", allIncome);
    // console.log("Expense:", allExpenses);
}

seed()
    .catch(async e => {
        await dbClient.$disconnect();
        throw e;
    })
    .finally(async () => {
        await dbClient.$disconnect();
    })