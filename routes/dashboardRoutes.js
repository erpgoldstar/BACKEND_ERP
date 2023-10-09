const express = require("express");
const {
  getTotalExpensesAndIncomes,
} = require("../controllers/DashboardDetailsController");
const router = express.Router();

router.get("/expensesAndIncomes", getTotalExpensesAndIncomes);

module.exports = router;
