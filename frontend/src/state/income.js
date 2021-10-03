import ApiWrapper from '../utils/ApiWrapper';

const apiUrl = process.env.REACT_APP_API_URL;
const apiWrapper = new ApiWrapper(apiUrl);

export const createIncome = set => income => {
    // TODO use API to create new income
    set(state => ({ income: [...state.income, income] }));
};

export const loadIncome = set => () => {
    apiWrapper.getAllIncome().then(data => set({ income: data }))
};