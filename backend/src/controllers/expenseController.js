const Expense = require("../models/expenseModel");

/**
 * @desc Fetch all expenses
 * @route GET /api/expenses
 * @access Public
 */

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });

    res.json({ expenses });
  } catch (error) {
    res.status(404).json({ message: "No expenses found" });
  }
};

/**
 * @desc Create an expense
 * @route POST /api/expenses
 * @access Public
 */

const addExpense = async (req, res) => {
  try {
    const expense = new Expense({
      name: req.body.name,
      amount: req.body.amount,
    });

    const createdExpense = await expense.save();

    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(404).json({ message: "Expense creation failed" });
  }
};

/**
 * @desc Edit an expense
 * @route PUT /api/expenses/:id
 * @access Public
 */

const editExpense = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const expenseId = req.params.id;

    const expense = await Expense.findById(expenseId);

    if (expense) {
      expense.name = name || expense.name;
      expense.amount = amount || expense.amount;

      const updatedExpense = await expense.save();
      res.json(updatedExpense);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Expense not found" });
  }
};

/**
 * @desc Delete an expense
 * @route DELETE /api/expenses/:id
 * @access Public
 */

const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findById(id);
    if (expense) {
      await expense.remove();
      res.json({ message: "Expense removed" });
    }
  } catch (error) {
    res.status(404).json({ message: "Expense not found" });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  editExpense,
  deleteExpense,
};
