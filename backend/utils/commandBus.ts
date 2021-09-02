import { CommandRegistry } from "../command/CommandRegistry";
import dbClient from "./dbClient";
import { ExpenseConnection } from "../data/ExpenseConnection";
import { IncomeConnection } from "../data/IncomeConnection";
import { CreateExpenseHandler } from "../command/expense/handler/CreateExpenseHandler";
import { CommandBus } from "../command/CommandBus";
import { GetAllExpensesHandler } from "../command/expense/handler/GetAllExpensesHandler";
import { GetExpenseHandler } from "../command/expense/handler/GetExpenseHandler";
import { GetIncomeHandler } from "../command/income/handler/GetIncomeHandler";
import { GetAllIncomeHandler } from "../command/income/handler/GetAllIncomeHandler";
import { CreateIncomeHandler } from "../command/income/handler/CreateIncomeHandler";

const expenseConnection: ExpenseConnection = new ExpenseConnection(dbClient);
const incomeConnection: IncomeConnection = new IncomeConnection(dbClient);

const registry: CommandRegistry = new CommandRegistry([
    ['CreateExpense', new CreateExpenseHandler(expenseConnection)],
    ['GetAllExpenses', new GetAllExpensesHandler(expenseConnection)],
    ['GetExpense', new GetExpenseHandler(expenseConnection)],
    ['GetIncome', new GetIncomeHandler(incomeConnection)],
    ['GetAllIncome', new GetAllIncomeHandler(incomeConnection)],
    ['CreateIncome', new CreateIncomeHandler(incomeConnection)]
]);

const commandBus: CommandBus = new CommandBus(registry);

export default commandBus;