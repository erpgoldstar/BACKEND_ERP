const Expense = require("../models/ExpenseModel");
const Income = require("../models/IncomeModel");

const getTotalExpensesAndIncomes = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const incomes = await Income.find();

    const getAllSalaries = expenses.map((exp) => exp.salary);
    const totalExpenses = getAllSalaries.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const getAllIncomes = incomes.map((inc) => inc.amount);
    const totalIncomes = getAllIncomes.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    res.status(200).json({ totalExpenses, totalIncomes, expenses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTotalExpensesAndIncomes };
