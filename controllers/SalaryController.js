const Salary = require("../models/SalaryModel");

const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json(salaries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    const { amount, id } = req.params;
    const sal = await Salary.findById(id);
    const updated = await Salary.findByIdAndUpdate(
      id,
      { salary: (sal.salary -= amount) },
      { new: true }
    );
    res.send(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getSalaries, withdraw };
