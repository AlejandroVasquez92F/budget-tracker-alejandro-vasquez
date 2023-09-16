function updateTables(user) {
    //gets form inputs
    const incomeTable = document.getElementById("income-table").querySelector("tbody");
    const expenseTable = document.getElementById("expense-table").querySelector("tbody");
    const savingTable = document.getElementById("saving-table").querySelector("tbody");
    const username = document.getElementById("username");
    const cashAvailable = document.getElementById("cash-available");
    const monthlyIncomeTotal = document.getElementById("monthly-income");
    const monthlyExpenseTotal = document.getElementById("monthly-expense");
    const monthlySavingTotal = document.getElementById("monthly-savings");

    //clears tables and sets headers
    while (incomeTable.firstChild) {
        incomeTable.removeChild(incomeTable.firstChild);
    }
    while (expenseTable.firstChild) {
        expenseTable.removeChild(expenseTable.firstChild);
    }
    while (savingTable.firstChild) {
        savingTable.removeChild(savingTable.firstChild);
    }

    //initialize monthly totals
    let monthlyIncome = 0;
    let monthlyExpense = 0;
    let monthlySaving = 0;

    //update income table and calculate monthly income
    for (const incomeTransaction of user.income) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${incomeTransaction.description}</td><td>${incomeTransaction.amount}</td><td>${incomeTransaction.date.toDateString()}</td>`;
        incomeTable.appendChild(row);
        monthlyIncome += incomeTransaction.amount;
    }

    //update savings table and calculate monthly savings
    for (const savingTransaction of user.saving) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${savingTransaction.description}</td><td>${savingTransaction.amount}</td><td>${savingTransaction.date.toDateString()}</td>`;
        savingTable.appendChild(row);
        monthlySaving += savingTransaction.amount;
    }

    //update expenses table and calculate monthly expenses
    for (const expenseTransaction of user.expense) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${expenseTransaction.description}</td><td>${expenseTransaction.amount}</td><td>${expenseTransaction.date.toDateString()}</td>`;
        expenseTable.appendChild(row);
        monthlyExpense += expenseTransaction.amount;
    }

    //calculates the cash available
    const cashAvailableValue = monthlyIncome - monthlyExpense - monthlySaving;

    //update the displayed values in the information container
    username.textContent = `Username: ${user.getUsername()}`;
    cashAvailable.textContent = `Cash Available: ${cashAvailableValue}`;
    monthlyIncomeTotal.textContent = `Monthly Income: ${monthlyIncome}`;
    monthlyExpenseTotal.textContent = `Monthly Expense: ${monthlyExpense}`;
    monthlySavingTotal.textContent = `Monthly Saving: ${monthlySaving}`;
}

//handles form submissions
function handleTransactionFormSubmit(event) {
    //prevents the default form submission behavior
    event.preventDefault();

    //gets form inputs
    const transactionType = transactionForm.querySelector("select").value;
    const description = transactionForm.querySelector("input[type='text']").value;
    const amount = parseFloat(transactionForm.querySelector("input[type='number']").value);
    const date = new Date(transactionForm.querySelector("input[type='date']").value);

    //we can connect some checks to here to make sure the user only inputs valid data
    /*...*/

    //adds the transaction to the user's data
    if (transactionType === "income") {
        user.addIncome(description, amount, date);
    } else if (transactionType === "expense") {
        user.addExpense(description, amount, date);
    } else if (transactionType === "savings") {
        user.addSaving(description, amount, date);
    }

    //updates tables and resets the form back to the empty state
    updateTables(user);
    transactionForm.reset();
}

//event listener
const transactionForm = document.querySelector(".transaction-form");
transactionForm.addEventListener("submit", handleTransactionFormSubmit);