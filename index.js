#! /usr/bin/env node
import inquirer from "inquirer";
// Bank Account class
class Bankaccount {
    Accountnumber;
    Balance;
    constructor(accountnumber, balance) {
        this.Accountnumber = accountnumber;
        this.Balance = balance;
    }
    //  Debit money
    withdraw(amount) {
        if (this.Balance >= amount) {
            this.Balance -= amount;
            console.log(`withdrawal of $${amount}successful, ramaining balance:$${this.Balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //1$ fee charged if more than 100$ deposited
        }
        this.Balance += amount;
        console.log(`Deposit of $${amount}successfully. remaining balnace:$${this.Balance}`);
    }
    // Check balance
    checkbalance() {
        console.log(`Current balance:$${this.Balance}`);
    }
}
// Customer class
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new Bankaccount(1001, 7000),
    new Bankaccount(1003, 8000),
    new Bankaccount(1004, 9000),
];
// Create customer
const customers = [
    new customer("hunza", "hussain", "female", 28, 3156689998, accounts[0]),
    new customer("areeba", "hussain", "female", 27, 3156677998, accounts[1]),
    new customer("minhaj", "hussain", "male", 29, 3156549998, accounts[2]),
];
// Function to interact with bankaccount
async function service() {
    do {
        const accountnumberinput = await inquirer.prompt({
            name: "accountnumber",
            type: "number",
            message: "Enter your accountnumber:",
        });
        const customer = customers.find((customer) => customer.account.Accountnumber === accountnumberinput.accountnumber);
        if (customer) {
            console.log(`Welcome,${customer.firstName}${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "Withdraw", "CheckBalance", "eExit"],
                },
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositamount.amount);
                    break;
                case "withdraw":
                    const withdrawamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(withdrawamount.amount);
                    break;
                case "CheckBalance":
                    customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\nThank you for using our bank service. Have a great day! ");
                    return;
            }
        }
        else {
            console.log("Invalid account number.Please try again.");
        }
    } while (true);
}
service();
