import ApiWrapper from '../utils/ApiWrapper';

const apiUrl = process.env.REACT_APP_API_URL;
const apiWrapper = new ApiWrapper(apiUrl);

export const createExpense = set => expense => {
    // TODO use API to create new expense
    set(state => ({ expenses: [...state.expenses, expense] }));
};

export const loadExpenses = set => () => {
    apiWrapper.getAllExpenses().then(data => set({ expenses: data }))
};
