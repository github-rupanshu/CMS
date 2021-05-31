const Slot = require("../../../models/slot");
const User = require("../../../models/user");
const Appointment = require("../../../models/appointment");
const mongoose = require("mongoose");
// var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
module.exports.create = async (req, res) => {
  try {
    let { docId, slotId, symptoms, desc } = req.body || {};

    docId = mongoose.Types.ObjectId(docId);
    slotId = mongoose.Types.ObjectId(slotId);
    let slot = await Slot.findById(slotId);
    const appoint = await Appointment.create({
      userId: req.user._id,
      docId,
      slotId,
      symptoms,
      desc,
    });
    slot.appointments.push(appoint._id);
    await slot.save();
    return res.status(201).json({
      data: {
        appointment: appoint,
      },
      msg: "appointment created!",
    });
  } catch (err) {
    return res.status(401).json({
      msg: err,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const appoint = await Appointment.findByIdAndDelete(req.params.id, {
      useFindAndModify: true,
    });
    let slot = await Slot.findByIdAndUpdate(
      appoint.slotId,
      {
        $pull: { appointments: appoint._id },
      },
      {
        useFindAndModify: true,
      },
      (err, doc) => {}
    );
    await slot.save();
    return res.status(200).json({
      data: {
        appointment: appoint,
      },
      msg: "appointment deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { docId, slotId, symptoms, desc, sts } = req.body || {};

    docId = mongoose.Types.ObjectId(docId);
    slotId = mongoose.Types.ObjectId(slotId);

    let appoint = await Appointment.findById(req.params.id);
    if (sts === "confirmed") {
      appoint.update({
        sts: sts,
      });
      return res.status(200).json({
        status: sts,
        msg: "status update successfully !",
      });
    }
    if (appoint.slotId !== slotId) {
      // let oldSlot= await Slot.findById(appoint.slotId);
      let newSlot = await Slot.findById(slotId);
      if (newSlot.maxAppointments <= newSlot.appointments.lenght) {
        throw new Error("Please choose another Slot");
      }
      let oldSlot = await Slot.findByIdAndUpdate(
        appoint.slotId,
        {
          $pull: {
            appointments: appoint._id,
          },
        },
        {
          useFindAndModify: true,
        },
        (err, doc) => {}
      );

      await newSlot.appointments.push(appoint._id);
      await newSlot.save();
      await oldSlot.save();
    }

    await appoint.update(
      {
        dcoId: docId,
        symptoms: symptoms,
        desc: desc,
      },
      (err, app) => {
        if (err) {
          throw new Error("error in updating  appointment");
        }
      }
    );
    await appoint.save();
    return res.status(200).json({
      data: {
        slot: appoint,
      },
      msg: "slot updated!",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports.get = async (req, res) => {
  try {
   
      const appoint = await Appointment.find({
        userId: req.user._id,
      }).sort("-createdAt");
      return res.status(200).json({
        appointments: appoint,
        msg: "User appointments",
      });
    
    
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

