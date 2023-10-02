const Zone = require("../models/ZoneModel");
const Expense = require("../models/ExpenseModel");
const { paginationController } = require("./paginationController");

const getExpenses = async (req, res) => {
  try {
    const { zoneSlug, category } = req.params;
    const page = parseInt(req.query.page);

    const expenses = await Expense.find({
      zoneSlug,
      categoryName: category,
    }).sort({ createdAt: -1 });

    const expensesResult = paginationController(expenses, page);
    res.json(expensesResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const { zoneId, categoryName, empName, description, type, salary } =
      req.body;
    const zone = await Zone.findById(zoneId);

    if (!zone) {
      return res.status(404).json({ error: "Zone not found" });
    }

    const expense = new Expense({
      zoneId: zone._id,
      zoneSlug: zone.name,
      categoryName,
      empName,
      description,
      type,
      salary,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseDetails = await Expense.findById(id);
    if (!expenseDetails) {
      return res.status(400).json({ error: "No details found from this id" });
    }
    const deletedDetails = await Expense.findByIdAndRemove(expenseDetails._id);
    res.status(200).json(deletedDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getExpenses, createExpense, editExpense, deleteExpense };
