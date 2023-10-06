const express = require("express");
const { getSalaries, withdraw } = require("../controllers/SalaryController");

const router = express.Router();

router.get("/", getSalaries);
router.patch("/:id/:amount", withdraw);

module.exports = router;
