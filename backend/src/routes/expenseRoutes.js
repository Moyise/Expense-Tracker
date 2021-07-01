const express = require("express");
const router = express.Router();
const {
  getExpenses,
  addExpense,
  editExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.route("/").get(getExpenses).post(addExpense);
router.route("/:id").put(editExpense).delete(deleteExpense);

module.exports = router;
