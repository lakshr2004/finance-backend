const Record = require("../models/Record");

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "Amount, type and category are required",
      });
    }

    const record = await Record.create({
      user: req.user._id,
      amount,
      type,
      category,
      date,
      note,
    });

    res.status(201).json({
      message: "Record created successfully",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getRecords = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user._id }).sort({ date: -1 });

    res.status(200).json({
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await record.deleteOne();

    res.status(200).json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user._id });

    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach((record) => {
      if (record.type === "income") {
        totalIncome += record.amount;
      } else if (record.type === "expense") {
        totalExpense += record.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  getDashboard,
};