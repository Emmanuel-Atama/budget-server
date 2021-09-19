import { CommandRegistry } from "../command/CommandRegistry";
import dbClient from "./dbClient";
import { ExpenseRepository } from "../data/ExpenseRepository";
import { IncomeRepository } from "../data/IncomeRepository";
import { CommandBus } from "../command/CommandBus";
import { GetAllExpensesHandler } from "../command/expense/handler/GetAllExpensesHandler";
import { GetExpenseHandler } from "../command/expense/handler/GetExpenseHandler";
import { GetIncomeHandler } from "../command/income/handler/GetIncomeHandler";
import { GetAllIncomeHandler } from "../command/income/handler/GetAllIncomeHandler";
import { UserRepository } from "../data/UserRepository";
import { GetUserHandler } from "../command/user/handler/GetUserHandler";
import { CreateEntityHandler } from "../command/handler/CreateEntityHandler";

const expenseRepository: ExpenseRepository = new ExpenseRepository(dbClient);
const incomeRepository: IncomeRepository = new IncomeRepository(dbClient);
const userRepository: UserRepository = new UserRepository(dbClient);

const registry: CommandRegistry = new CommandRegistry([
    ['CreateExpense', new CreateEntityHandler(expenseRepository)],
    ['GetAllExpenses', new GetAllExpensesHandler(expenseRepository)],
    ['GetExpense', new GetExpenseHandler(expenseRepository)],
    ['GetIncome', new GetIncomeHandler(incomeRepository)],
    ['GetAllIncome', new GetAllIncomeHandler(incomeRepository)],
    ['CreateIncome', new CreateEntityHandler(incomeRepository)],
    ['CreateUser', new CreateEntityHandler(userRepository)],
    ['GetUser', new GetUserHandler(userRepository)]
]);

const commandBus: CommandBus = new CommandBus(registry);

export default commandBus;