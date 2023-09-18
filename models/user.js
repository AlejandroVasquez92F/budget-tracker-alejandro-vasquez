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

    //add methods
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

    //remove methods
    removeIncome(description, amount, date) {
        this.income = this.income.filter(incomeTransaction => {
            return !(incomeTransaction.description === description &&
                incomeTransaction.amount === amount &&
                incomeTransaction.date.toDateString() === date.toDateString());
        });
    }

    removeExpense(description, amount, date) {
        this.expense = this.expense.filter(expenseTransaction => {
            return !(expenseTransaction.description === description &&
                expenseTransaction.amount === amount &&
                expenseTransaction.date.toDateString() === date.toDateString());
        });
    }

    removeSaving(description, amount, date) {
        this.saving = this.saving.filter(savingTransaction => {
            return !(savingTransaction.description === description &&
                savingTransaction.amount === amount &&
                savingTransaction.date.toDateString() === date.toDateString());
        });
    }
}