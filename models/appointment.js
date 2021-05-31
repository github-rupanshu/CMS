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
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slots",
      required: true,
    },
    // comma seprated 
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
      default:'pending'
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
