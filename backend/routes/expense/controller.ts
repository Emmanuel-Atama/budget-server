import { Request, Response } from "express";
import GetAllExpenses from "../../command/expense/GetAllExpenses";
import GetExpense from "../../command/expense/GetExpense";
import commandBus from "../../utils/commandBus";

export const getAll = async (req: Request, res: Response): Promise<void> => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

    const expenses = await commandBus.dispatch(new GetAllExpenses(limit));

    res.json(expenses);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);

    const expense = await commandBus.dispatch(new GetExpense(id))

    if (expense) {
        res.json(expense);
        return;
    }

    res.status(404).json({ error: `No expense found with ID ${id}` });
};
