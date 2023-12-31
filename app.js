function updateTables(user) {
    //getting table and calculated information
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

    //getting form information
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

//event listener for handleTransactionFormSubmit function
const transactionForm = document.querySelector(".transaction-form");
transactionForm.addEventListener("submit", handleTransactionFormSubmit);

function handleRowClick(event) {
    const clickedRow = event.target.closest("tr");

    //exits the function if a row isn't clicked
    if (!clickedRow) return;

    clickedRow.classList.add("table-secondary");
}

//event listeners handleRowClick function
document.getElementById("income-table").querySelector("tbody").addEventListener("click", handleRowClick);
document.getElementById("expense-table").querySelector("tbody").addEventListener("click", handleRowClick);
document.getElementById("saving-table").querySelector("tbody").addEventListener("click", handleRowClick);

function clearHighlightedRows() {
    const highlightedRows = document.querySelectorAll(".table-secondary");

    highlightedRows.forEach(row => {
        row.classList.remove("table-secondary");
    });
}

//event listener for clearHighlightedRows function
document.getElementById("clear-button").addEventListener("click", clearHighlightedRows);

function deleteHighlightedRows() {
    const highlightedRows = document.querySelectorAll(".table-secondary");

    highlightedRows.forEach(row => {
        const tableId = row.closest("table").id;

        let transactionDescription = row.querySelector("td").textContent;
        let transactionAmount = parseFloat(row.children[1].textContent);
        let transactionDate = new Date(row.children[2].textContent);

        if (tableId === "income-table") {
            user.removeIncome(transactionDescription, transactionAmount, transactionDate);
        } else if (tableId === "expense-table") {
            user.removeExpense(transactionDescription, transactionAmount, transactionDate);
        } else if (tableId === "saving-table") {
            user.removeSaving(transactionDescription, transactionAmount, transactionDate);
        }

        row.remove();
    });

    updateTables(user);
}


//event listener for deleteHighlightedRows function
document.getElementById("delete-button").addEventListener("click", deleteHighlightedRows);
