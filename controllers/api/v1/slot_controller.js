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
      msg: "slot updated!",
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
      msg: "slot deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports.availableSlots = async (req, res) => {
  try {
    let currDate = new Date(Date.now());
    currDate.setHours(0, 0, 0, 0);

    //const slot = await Slot.find({date: {$gte: today}});//date: {$lte: today}}
    const slot = await Slot.aggregate([{
      $project: {
        createdBy:1,
        date:1,
        startTime:1,
        endTime:1,
        appointments:1,
        maxAppointments:1,
        available:{$subtract:["$maxAppointments", {
          $cond: {
            if: { $isArray: "$appointments" },
            then: { $size: "$appointments" },
            else: 0,
          },
        }]}
      }
  },
  { 
      $match: { 
        date: {$gte: currDate}
      }
  }
      
    ]).exec() ;//date: {$lte: today}}
    
    // const r= await Slot.aggregate([
    //   { "$unwind": "$appointments" },
    //   { "$lookup": {
    //     "from": "$Appointments",
    //     "foreignField": "_id",
    //     "localField": "appointments",
    //     "as": "app"
    //   }},
    //   { "$unwind": "$appointments" },
    //   { "$group": {
    //     "_id": "$_id",
    //     "books": { "$push": "$appointments" }
    //   }}
    // ])
   
    // console.log(r);
    return res.status(200).json({
      data: {
        slot: slot,
      },
      msg: "slot !",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};
