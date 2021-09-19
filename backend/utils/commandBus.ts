import { CommandRegistry } from "../command/CommandRegistry";
import dbClient from "./dbClient";
import { ExpenseRepository } from "../data/ExpenseRepository";
import { IncomeRepository } from "../data/IncomeRepository";
import { CommandBus } from "../command/CommandBus";
import { UserRepository } from "../data/UserRepository";
import { CreateEntityHandler } from "../command/handler/CreateEntityHandler";
import { GetEntityByIdHandler } from "../command/handler/GetEntityByIdHandler";
import { GetManyEntitiesHandler } from "../command/handler/GetManyEntitiesHandler";

const expenseRepository: ExpenseRepository = new ExpenseRepository(dbClient);
const incomeRepository: IncomeRepository = new IncomeRepository(dbClient);
const userRepository: UserRepository = new UserRepository(dbClient);

const registry: CommandRegistry = new CommandRegistry([
    ['GetExpense', new GetEntityByIdHandler(expenseRepository)],
    ['GetIncome', new GetEntityByIdHandler(incomeRepository)],
    ['GetUser', new GetEntityByIdHandler(userRepository)],
    ['GetAllExpenses', new GetManyEntitiesHandler(expenseRepository)],
    ['GetAllIncome', new GetManyEntitiesHandler(incomeRepository)],
    ['GetAllUsers', new GetManyEntitiesHandler(userRepository)],
    ['CreateIncome', new CreateEntityHandler(incomeRepository)],
    ['CreateUser', new CreateEntityHandler(userRepository)],
    ['CreateExpense', new CreateEntityHandler(expenseRepository)],
]);

const commandBus: CommandBus = new CommandBus(registry);

export default commandBus;