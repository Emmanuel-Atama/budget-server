import { CommandRegistry } from "../command/CommandRegistry";
import dbClient from "./dbClient";
import { ExpenseRepository } from "../data/ExpenseRepository";
import { IncomeRepository } from "../data/IncomeRepository";
import { CreateExpenseHandler } from "../command/expense/handler/CreateExpenseHandler";
import { CommandBus } from "../command/CommandBus";
import { GetAllExpensesHandler } from "../command/expense/handler/GetAllExpensesHandler";
import { GetExpenseHandler } from "../command/expense/handler/GetExpenseHandler";
import { GetIncomeHandler } from "../command/income/handler/GetIncomeHandler";
import { GetAllIncomeHandler } from "../command/income/handler/GetAllIncomeHandler";
import { CreateIncomeHandler } from "../command/income/handler/CreateIncomeHandler";

const expenseRepository: ExpenseRepository = new ExpenseRepository(dbClient);
const incomeRepository: IncomeRepository = new IncomeRepository(dbClient);

const registry: CommandRegistry = new CommandRegistry([
    ['CreateExpense', new CreateExpenseHandler(expenseRepository)],
    ['GetAllExpenses', new GetAllExpensesHandler(expenseRepository)],
    ['GetExpense', new GetExpenseHandler(expenseRepository)],
    ['GetIncome', new GetIncomeHandler(incomeRepository)],
    ['GetAllIncome', new GetAllIncomeHandler(incomeRepository)],
    ['CreateIncome', new CreateIncomeHandler(incomeRepository)]
]);

const commandBus: CommandBus = new CommandBus(registry);

export default commandBus;