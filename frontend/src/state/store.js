import create from 'zustand';
import { createExpense, loadExpenses } from './expenses';
import { createIncome, loadIncome } from './income';

export const useStore = create((set, get) => ({
    expenses: [],
    createExpense: createExpense(set),
    loadExpenses: loadExpenses(set),

    income: [],
    createIncome: createIncome(set),
    loadIncome: loadIncome(set),
}));