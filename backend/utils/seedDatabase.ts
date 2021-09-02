import dbClient from './dbClient';

async function seed(): Promise<void> {
    await dbClient.income.create({
        data: {
            source: 'Nathan',
            amount: 2048.00
        }
    });

    await dbClient.expense.create({
        data: {
            name: 'Phone',
            source: 'Nathan',
            amount: 29.99
        }
    });

    const allIncome = await dbClient.income.findMany();
    const allExpenses = await dbClient.expense.findMany();

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