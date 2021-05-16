const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    sts: {
      type: String,
      required: true,
    },
    remarks: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointments", todoSchema);

module.exports = Appointment;
