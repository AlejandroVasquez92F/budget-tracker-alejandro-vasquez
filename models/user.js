class User {
    constructor(username, totalMonthlyIncome, totalMonthlySavings, totalMonthlyExpenses, totalCashAvailable) {
        this.username = username;

        this.income = [];
        this.expense = [];
        this.saving = [];

        this.totalMonthlyIncome = totalMonthlyIncome;
        this.totalMonthlyExpenses = totalMonthlyExpenses;
        this.totalMonthlySavings = totalMonthlySavings;

        this.totalCashAvailable = totalCashAvailable;
    }

    getUsername() {
        return this.username;
    }

    //methods //these need input validation
    addIncome(description, amount, date) {
        const income = new Transaction(description, amount, date);
        this.income.push(income);
        return income;
    }

    addExpense(description, amount, date) {
        const expense = new Transaction(description, amount, date);
        this.expense.push(expense);
        return expense;
    }

    addSaving(description, amount, date) {
        const saving = new Transaction(description, amount, date);
        this.saving.push(saving);
        return saving;
    }

    //calculate income expense savings methods
}