const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../models/student");
const Department = require("../models/department");

router.post("/", async (req, res) => {
  try {
    const { registrationNumber, name, departmentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({ message: "Invalid departmentId format" });
    }

    const departmentExists = await Department.findById(departmentId);
    if (!departmentExists) {
      return res.status(404).json({ message: "Department not found" });
    }

    const newStudent = new Student({
      registrationNumber,
      name,
      departmentId: mongoose.Types.ObjectId(departmentId),
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/department/:departmentId", async (req, res) => {
  try {
    const { departmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
      return res.status(400).json({ message: "Invalid departmentId format" });
    }

    const students = await Student.find({ departmentId }).populate(
      "departmentId",
      "name"
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
