const express = require("express");
const passport = require("passport");
const router = express.Router();
const slotController = require("../../../controllers/api/v1/slot_controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  slotController.create
);
router.post(
    "/update/:id",
    passport.authenticate("jwt", { session: false }),
    slotController.update
  );
  router.get(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    slotController.delete
  );
  router.get(
    "/get",
    passport.authenticate("jwt", { session: false }),
    slotController.availableSlots
  );
//router.post('/logIn',userController.logIn);

module.exports = router;
