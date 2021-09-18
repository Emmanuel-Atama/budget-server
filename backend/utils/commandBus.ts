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
import { CreateUserHandler } from "../command/user/handler/CreateUserHandler";
import { UserRepository } from "../data/UserRepository";
import { GetUserHandler } from "../command/user/handler/GetUserHandler";

const expenseRepository: ExpenseRepository = new ExpenseRepository(dbClient);
const incomeRepository: IncomeRepository = new IncomeRepository(dbClient);
const userRepository: UserRepository = new UserRepository(dbClient);

const registry: CommandRegistry = new CommandRegistry([
    ['CreateExpense', new CreateExpenseHandler(expenseRepository)],
    ['GetAllExpenses', new GetAllExpensesHandler(expenseRepository)],
    ['GetExpense', new GetExpenseHandler(expenseRepository)],
    ['GetIncome', new GetIncomeHandler(incomeRepository)],
    ['GetAllIncome', new GetAllIncomeHandler(incomeRepository)],
    ['CreateIncome', new CreateIncomeHandler(incomeRepository)],
    ['CreateUser', new CreateUserHandler(userRepository)],
    ['GetUser', new GetUserHandler(userRepository)]
]);

const commandBus: CommandBus = new CommandBus(registry);

export default commandBus;