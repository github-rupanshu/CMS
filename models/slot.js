const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    maxAppointments: {
      type: Number,
      required: true,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointments"
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model("Slots", slotSchema);

module.exports = Slot;
