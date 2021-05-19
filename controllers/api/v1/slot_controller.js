const Slot = require("../../../models/slot");
const User = require("../../../models/user");

module.exports.create = async (req, res) => {
  try {
    // console.log(req.user);
    //only admin and doctor can create slot

    //------------------TODO check for existing slots

    if (req.user.role === "admin" || req.user.role === "doctor") {
      const slot = await Slot.create({
        createdBy: req.user._id,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        maxAppointments: req.body.maxAppointments,
      });
      if (!slot) {
        throw new Error("cannot create slot please try again");
      }
      return res.status(201).json({
        data: {
          slot: slot,
        },
        msg: "slot created!",
      });
    } else {
      //throw new Error("Unauthorised");
      return res.status(401).send({
        msg: "Unauthorised by role",
      });
    }
  } catch (err) {
    return res.status(401).json({
      msg: err,
    });
  }
};
module.exports.update = async (req, res) => {
  try {
    const { startTime, endTime, maxAppointments } = req.body || {};
    let slot = await Slot.findByIdAndUpdate(
      req.params.id,
      {
        startTime: startTime,
        endTime: endTime,
        maxAppointments: maxAppointments,
      },
      {
        useFindAndModify: true,
      },
      (err, slot) => {
        if (err) {
          throw new Error("error in updating  slot");
        }
      }
    );
    slot.save();
    return res.status(200).json({
      data: {
        slot: slot,
      },
      msg: "slot update!",
    });
  } catch (err) {
    return res.status(401).json({
      msg: err,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id, {
      useFindAndModify: true,
    });
    //slot.save();
    return res.status(200).json({
      data: {
        slot: slot,
      },
      msg: "slot deeted!",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports.availableSlots = async (req, res) => {
  try {
    
    let today = new Date(Date.now());
    today.setHours(0,0,0,0)
    console.log();
    return res.status(200).json({
      data: {
        slot: today,
      },
      msg: "slot !",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};
