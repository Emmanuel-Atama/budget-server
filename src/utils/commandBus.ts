import CommandRegistry from "../command/CommandRegistry";
import dbClient from "./dbClient";
import CommandBus from "../command/CommandBus";
import UserRepository from "../DAL/user/UserRepository";
import CreateEntityHandler from "../command/handler/CreateEntityHandler";
import GetEntityByIdHandler from "../command/handler/GetEntityByIdHandler";
import GetManyEntitiesHandler from "../command/handler/GetManyEntitiesHandler";
import GetUserByUsernameHandler from "../command/user/handler/GetUserByUsernameHandler";
import GetAccountsByUserIdHandler from "../command/account/handler/GetAccountsByUserIdHandler";
import AccountRepository from "../DAL/account/AccountRepository";

const userRepository: UserRepository = new UserRepository(dbClient);
const accountRepository: AccountRepository = new AccountRepository(dbClient);

const registry: CommandRegistry = new CommandRegistry([
    ['GetUserById', new GetEntityByIdHandler(userRepository)],
    ['GetUserByUsername', new GetUserByUsernameHandler(userRepository)],
    ['GetAllUsers', new GetManyEntitiesHandler(userRepository)],
    ['CreateUser', new CreateEntityHandler(userRepository)],
    ['CreateAccount', new CreateEntityHandler(accountRepository)],
    ['GetAccountsByUserId', new GetAccountsByUserIdHandler(accountRepository)],
]);

const commandBus: CommandBus = new CommandBus(registry);

export default commandBus;