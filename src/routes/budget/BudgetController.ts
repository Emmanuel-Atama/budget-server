import { Response } from "express";
import AuthenticatedRequest from "../../auth/AuthenticatedRequest";
import CreateAccount from "../../command/account/CreateAccount";
import CreateBudget from "../../command/budget/CreateBudget";
import CommandBus from "../../command/CommandBus";
import CreateTransaction from "../../command/transaction/CreateTransaction";
import Account from "../../DAL/account/Account";
import Budget from "../../DAL/budget/Budget";
import Transaction from "../../DAL/transaction/Transaction";
import BudgetInitializer from "../../utils/BudgetInitializer";

export default class BudgetController {
    private commandBus: CommandBus;

    constructor(commandBus: CommandBus) {
        this.commandBus = commandBus;
    }

    async initializeBudget(req: AuthenticatedRequest, res: Response): Promise<void> {
        const user = req.user;

        if (typeof user === 'undefined') {
            res.status(403).json({ error: 'Not authorized.' });
            return;
        }

        const {
            accounts // @Object<{ name: @String, startingBalance: @Number }>[]
        } = req.body;

        const { budget, incomeCategory, createdCategories } = await (new BudgetInitializer(this.commandBus)).init(user.id);

        if (!incomeCategory) {
            res.status(500).json({ error: 'Something went wrong when initializing the budget.' })
            return;
        }

        const createdAccounts: Account[] = [];
        const createdTransactions: Transaction[] = [];

        let i = accounts.length - 1;
        while (i --> -1) {
            const { startingBalance, name } = accounts[i];
            const createdAccount = await this.commandBus.dispatch(new CreateAccount(new Account(0, name, budget.id)));
            createdAccounts.push(createdAccount);
            
            const transactionToCreate = new Transaction(0, createdAccount.id, incomeCategory?.id, 'Starting Balance', '', startingBalance, new Date);
            const transaction = await this.commandBus.dispatch(new CreateTransaction(transactionToCreate));
            createdTransactions.push(transaction);
        }

        res.json({
            budget,
            categories: createdCategories,
            accounts: createdAccounts,
            transactions: createdTransactions,
        });
    }

    async create(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { yearMonth } = req.body;

        try {
            if (!req.user?.id) {
                res.status(403).json({ error: 'Unable to authenticate the token provided for the user.' });
                return;
            }

            const budgetToCreate = new Budget(0, req.user.id, yearMonth);

            await this.commandBus.dispatch(new CreateBudget(budgetToCreate));
        
            res.status(200).json({ message: "Budget created!" });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                error: 'Something went wrong when creating the budget.'
            });
        }
    }
}