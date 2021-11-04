import CommandRegistry from "../command/CommandRegistry";
import dbClient from "./dbClient";
import CommandBus from "../command/CommandBus";
import UserRepository from "../DAL/user/UserRepository";
import CreateEntityHandler from "../command/handler/CreateEntityHandler";
import GetEntityByIdHandler from "../command/handler/GetEntityByIdHandler";
import GetManyEntitiesHandler from "../command/handler/GetManyEntitiesHandler";
import GetUserByUsernameHandler from "../command/user/handler/GetUserByUsernameHandler";
import GetAccountsByUsernameHandler from "../command/account/handler/GetAccountsByUsernameHandler";
import AccountRepository from "../DAL/account/AccountRepository";
import BudgetRepository from "../DAL/budget/BudgetRepository";
import CategoryGroupRepository from "../DAL/categoryGroup/CategoryGroupRepository";
import CategoryRepository from "../DAL/category/CategoryRepository";

const userRepository: UserRepository = new UserRepository(dbClient);
const accountRepository: AccountRepository = new AccountRepository(dbClient);
const budgetRepository: BudgetRepository = new BudgetRepository(dbClient);
const categoryGroupRepository: CategoryGroupRepository = new CategoryGroupRepository(dbClient);
const categoryRepository: CategoryRepository = new CategoryRepository(dbClient);

const registry: CommandRegistry = new CommandRegistry([
    ['GetUserById', new GetEntityByIdHandler(userRepository)],
    ['GetUserByUsername', new GetUserByUsernameHandler(userRepository)],
    ['GetAllUsers', new GetManyEntitiesHandler(userRepository)],
    ['CreateUser', new CreateEntityHandler(userRepository)],
    ['CreateAccount', new CreateEntityHandler(accountRepository)],
    ['GetAccountsByUserId', new GetAccountsByUsernameHandler(accountRepository)],
    ['CreateBudget', new CreateEntityHandler(budgetRepository)],
    ['CreateCategoryGroup', new CreateEntityHandler(categoryGroupRepository)],
    ['CreateCategory', new CreateEntityHandler(categoryRepository)],
]);

const commandBus: CommandBus = new CommandBus(registry);

export default commandBus;