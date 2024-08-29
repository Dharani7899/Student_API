const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Department = require("../models/department");


router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
