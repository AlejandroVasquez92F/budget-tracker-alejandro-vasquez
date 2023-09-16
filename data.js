/*
    this is some static data to start off with until i can get persistent data working...
*/

const user = new User("Alejandro Vasquez");

user.addIncome("First Paycheck", 1450, new Date("2023-09-01"));
user.addIncome("Second Paycheck", 1500, new Date("2023-09-22"));
user.addIncome("Freelance Project", 300, new Date("2023-09-25"));
user.addIncome("Sold Old Aquarium", 50, new Date("2023-09-02"));

user.addExpense("Rent", 1200, new Date("2023-09-05"));
user.addExpense("Groceries", 250, new Date("2023-09-08"));
user.addExpense("Utilities", 350, new Date("2023-09-15"));
user.addExpense("Dining Out", 150, new Date("2023-09-25"));
user.addExpense("Snacks", 30, new Date("2023-09-25"));

user.addSaving("Emergency Fund", 100, new Date("2023-09-03"));
user.addSaving("Vacation Fund", 100, new Date("2023-09-12"));
user.addSaving("Home Renovation", 100, new Date("2023-09-28"));

//functions to get the app up and running...
updateTables(user);