const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  registrationNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  }, 
});

module.exports = mongoose.model("Student", studentSchema);
