export class ApiWrapper {
    _endpoints = {
        income: '/income',
        expense: '/expense'
    };

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async getAllIncome() {
        const response = await fetch(`${this.apiUrl}${this._endpoints.income}`);

        return await response.json();
    }

    async getIncomeById(id) {
        const response = await fetch(`${this.apiUrl}${this._endpoints.income}/${id}`);

        return await response.json();
    }

    async getAllExpenses() {
        const response = await fetch(`${this.apiUrl}${this._endpoints.expense}`);

        return await response.json();
    }

    async getExpenseById(id) {
        const response = await fetch(`${this.apiUrl}${this._endpoints.expense}/${id}`);

        return await response.json();
    }
}